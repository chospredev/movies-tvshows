import React, { createContext, FC, useState } from 'react'

interface IMoviesState {
    find: string,
    popularResults: [],
    searchResults: []
}

export const MovieContext = createContext([])

export const MovieProvider: FC = ({ children }): JSX.Element => {

    const [state, setState] = useState<IMoviesState>({
        find: '',
        popularResults: [],
        searchResults: []
    })

    return (
        <MovieContext.Provider value={{ state }}>
            {children}
        </MovieContext.Provider>
    )
}