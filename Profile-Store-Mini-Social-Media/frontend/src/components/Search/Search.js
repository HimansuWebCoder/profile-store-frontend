import "./Search.css";
function Search() {
	return (
		<input
			className="w-full h-10 max-w-[250px] border-none rounded-full outline-none block bg-no-repeat box-border text-xl pl-[40px] placeholder:text-black placeholder:italic  sm:w-[30%] sm:text-sm"
			placeholder="Search here"
			type="text"
			style={{
				backgroundImage: "url(/assets/images/search.png)",
				backgroundPosition: "10px center",
				backgroundSize: "20px 20px",
				backgroundRepeat: "no-repeat",
			}}
		/>
	);
}

export default Search;
