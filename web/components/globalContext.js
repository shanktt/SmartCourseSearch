import {createContext, createRef, useEffect, useRef, useState} from "react";
import React from 'react';

export const GlobalContext = createContext();



function GlobalContextProvider({children}) {
    const [query, setQuery] = useState('');
    const [filterOptions, setFilterOptions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    return (
        <GlobalContext.Provider value={{
            query,
            setQuery,
            filterOptions,
            setFilterOptions,
            searchResults,
            setSearchResults
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;