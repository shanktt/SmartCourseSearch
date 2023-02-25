import {createContext, createRef, useEffect, useRef, useState} from "react";
import React from 'react';

export const GlobalContext = createContext();


function GlobalContextProvider({children}) {
    const [query, setQuery] = useState('');

    return (
        <GlobalContext.Provider value={{
            query,
            setQuery
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;