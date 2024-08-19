import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search products..."
            className="px-4 py-2 border border-gray-300 rounded-md"
        />
    );
};

export default Search;
