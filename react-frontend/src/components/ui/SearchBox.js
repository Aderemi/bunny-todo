import React from 'react';

export default function SearchBox(props) {
    const {query, model, setSearchQuery} = props;

    return (
        <input
            type="text" autoFocus
            className="form-control search"
            value={query}
            onChange={e => setSearchQuery(model, e.target.value)}
            placeholder="Search"
        />
    );
}
