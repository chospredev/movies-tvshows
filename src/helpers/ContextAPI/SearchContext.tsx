import React, { createContext, FC, useState } from 'react'

export const SearchContext = createContext(null)

export const SearchContextProvider: FC = ({ children }) => {

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    )
}