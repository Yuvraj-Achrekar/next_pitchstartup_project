import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
	return (
		<Form action="/" className="search-form">
			<input
				className="search-input"
				defaultValue={query}
				name="query"
				placeholder="Search Startups"
			/>

			<div className="flex gap-2">
				{query && <SearchFormReset />}

				<button className="search-btn text-white">S</button>
			</div>
		</Form>
	);
};

export default SearchForm;
