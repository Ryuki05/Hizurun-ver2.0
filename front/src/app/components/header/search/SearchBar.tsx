import SearchButton from "./SearchButton";

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
    onSearch: () => void;
}

const SearchBar = ({ search, setSearch, onSearch }: SearchBarProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className="my-4 w-fit ">
            <div className="flex ">
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="商品を検索"
                    className="text-hizurun-gr"
                />
                <SearchButton />
            </div>
        </form>
    );
};

export default SearchBar;
