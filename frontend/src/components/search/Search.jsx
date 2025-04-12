import React, { useContext } from "react";
import { Search as SearchIcon, X } from "lucide-react";

import "./search.css";
import { SearchContext } from "../../App";

const Search = () => {
    const { searchValue, setSearchValue } = useContext(SearchContext);

    return (
        <div className="root-1">
            <SearchIcon size={16} strokeWidth={1.5} className="icon" />
            <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className="input"
                placeholder="Пошук страви..."
            />
            {searchValue && (
                <X
                    onClick={() => setSearchValue("")}
                    className="clearIcon"
                    size={16}
                    strokeWidth={1.5}
                />
            )}
        </div>
    );
};

export default Search;