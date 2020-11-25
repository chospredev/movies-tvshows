import React, { FC, createContext, useState } from 'react'

export const StateControllerContext = createContext(null)

interface IState {
    popularResults: [],
    suggestions: [],
    selected: {},
    query: string
    loading: boolean
}

export const StateControllerProvider: FC = ({ children }) => {

    const [state, setState] = useState<IState>({
        popularResults: [],
        suggestions: [],
        selected: {},
        query: '',
        loading: false
    })

    return (
        <StateControllerContext.Provider value={{ state, setState }}>
            {children}
        </StateControllerContext.Provider>
    )
}
