import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
	PLAYLIST_BY_SLUG_QUERY,
	STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const md = markdownit();
export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	// const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

	const [post, { select: editorPosts }] = await Promise.all([
		client.fetch(STARTUP_BY_ID_QUERY, { id }),
		client.fetch(PLAYLIST_BY_SLUG_QUERY, {
			slug: "editors-picks",
		}),
	]);

	if (!post) return notFound();

	const parsedContent = md.render(post?.pitch || "");

	if (!post) return notFound();
	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formatDate(post?._createdAt)}</p>
				<div className="heading">{post.title}</div>
				<p className="sub-heading !max-w-5xl">{post?.description}</p>
			</section>
			<section className="section_container">
				<img
					src={post?.image}
					alt="Thumbnail-Image"
					className="w-full h-auto rounded-xl"
				/>
				<div className="space-y-5 mt-5 max-w-4xl mx-auto">
					<div className="flex-between">
						<Link
							href={`/user/${post.author?._id}`}
							className="flex items-center gap-2 mb-3">
							<Image
								src={post.author?.image || "https://placehold.co/48x48"}
								height={64}
								width={64}
								alt="avatar"
								className="rounded-full"
							/>
							<div>
								<p className="text-20-medium">{post.author?.name}</p>
								<p className="text-16-medium !text-black-300">
									@{post.author?.username}
								</p>
							</div>
						</Link>
						<p className="category-tag">{post?.category}</p>
					</div>
					<h3 className="text-30-bold">Pitch Details</h3>
					{parsedContent ? (
						<article
							className="prose max-w-5xl font-work-sans break-all"
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className="no-results">No Details Provided</p>
					)}
				</div>
				<hr className="divider" />
				{editorPosts?.length > 0 && (
					<div className="max-w-4xl mx-auto">
						<p className="text-30-semibold">Editor Picks</p>

						<ul className="mt-7 card_grid-sm">
							{editorPosts.map((post: StartupCardType, i: number) => (
								<StartupCard key={i} post={post} />
							))}
						</ul>
					</div>
				)}
				<Suspense fallback={<Skeleton className="view-skeleton" />}>
					<View id={id} />
				</Suspense>
			</section>
		</>
	);
};

export default page;
