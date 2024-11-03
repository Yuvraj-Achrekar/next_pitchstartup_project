import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	const query = (await searchParams).query;

	const posts = [
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 1, name: "yooo" },
			_id: 1,
			description: "This is a description",
			image:
				"https://www.rolandberger.com/img/Tiles/Tile-Content/Roland_Berger-24_2195_Humanoid_robots-ST.jpg",
			category: "Robots",
			title: "We Robots",
		},
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 2, name: "yooo" },
			_id: 2,
			description: "This is a description",
			image:
				"https://www.rolandberger.com/img/Tiles/Tile-Content/Roland_Berger-24_2195_Humanoid_robots-ST.jpg",
			category: "Robots",
			title: "We Robots",
		},
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 3, name: "yooo" },
			_id: 3,
			description: "This is a description",
			image:
				"https://www.rolandberger.com/img/Tiles/Tile-Content/Roland_Berger-24_2195_Humanoid_robots-ST.jpg",
			category: "Robots",
			title: "We Robots",
		},
	];

	return (
		<>
			<section className="pink_container">
				<h2 className="heading">
					Pitch your startup, <br /> connect with entrepreneurs
				</h2>
				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions.
				</p>
				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search Results for "${query}"` : "All Startups"}
				</p>
				<ul className="mt-7 card_grid">
					{posts?.length > 0 ? (
						posts.map((post: StartupCardType) => (
							<StartupCard key={post?._id} post={post} />
						))
					) : (
						<p>No startups found</p>
					)}
				</ul>
			</section>
		</>
	);
}
