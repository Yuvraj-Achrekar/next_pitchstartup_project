import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	callbacks: {
		async signIn({
			user: { name, email, image },
			profile: { sub: id, given_name },
		}) {
			// console.log("user", user);
			// console.log("profile", profile);

			const existingUser = await client
				.withConfig({ useCdn: false })
				.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
					id,
				});

			if (!existingUser) {
				await writeClient.create({
					_type: "author",
					id,
					name,
					username: given_name,
					email,
					image,
					bio: "",
				});
			}

			return true;
		},
		async jwt({ token, account, profile }) {
			if (account && profile) {
				const user = await client
					.withConfig({ useCdn: false })
					.fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
						id: profile?.sub,
					});
				token.id = user?._id;
			}

			return token;
		},
		async session({ session, token }) {
			Object.assign(session, { id: token.id });
			return session;
		},
	},
});
