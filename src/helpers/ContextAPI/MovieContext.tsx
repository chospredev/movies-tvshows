import React, { ChangeEvent, useState, createContext, useContext, FC } from 'react';
import axios from 'axios';

import { discoverMoviesEndpoint, searchMoviesEndpoint } from '../../utils/api'
import { SearchContext } from './SearchContext';

type InputElement = ChangeEvent<HTMLInputElement>

interface IState {
    popularResults: [],
    suggestions: [],
    selected: {},
    query: string
    loading: boolean
}

export const MovieContext = createContext(null)

export const MovieContextProvider: FC = ({ children }) => {

    const { searchTerm, setSearchTerm } = useContext(SearchContext)

    const [state, setState] = useState<IState>({
        popularResults: [],
        suggestions: [],
        selected: {},
        query: searchTerm,
        loading: false,
    })

    const { suggestions } = state

    const handleSearchInput = (e: InputElement): void => {
        const query = e.currentTarget.value
        setState((prevState: any) => ({ ...prevState, query }))
        if (query.length > 0) {
            setTimeout(() => {
                axios(`${searchMoviesEndpoint}` + query)
                    .then(({ data }) => {
                        let results = data.results
                        let suggestions = results.slice(0, 10)
                        if (query.length > 2) {
                            const regex = new RegExp(`^${query}`, 'i')
                            suggestions.sort((prop: any) => prop.release_date).filter((val: any) => regex.test(val))
                            setState((prevState: any) => ({ ...prevState, query, suggestions, loading: false, popularResults: [] }))
                            setSearchTerm((prevQuery: any) => ({ ...prevQuery, query }))
                        } else {
                            fetchMovies()
                            setState((prevState: any) => ({ ...prevState, suggestions: [] }))
                            setState((prevState: any) => ({ ...prevState, suggestions: [] }))
                        }
                    })
                    .catch((err) => {
                        if (err.response) {
                            console.log('Oops, it seems there\'s a server error. ', err)
                            console.trace(err)
                            window.alert(`Oops, ${err}`)
                        }
                        if (err.request) {
                            console.log('Oops, it seems there\'s a network error.', err)
                            console.trace(err)
                            window.alert(`Oops, ${err}`)
                        }
                    })
            }, 1000)
        } return null
    }

    const fetchMovies = (): void => {
        axios(`${discoverMoviesEndpoint}`)
            .then(({ data }) => {
                let popularResults = data.results
                console.log("%c Results", 'color: blue', data.results)
                setState((prevState) => ({ ...prevState, popularResults }))
            })
            .catch((err) => {
                if (err.response) {
                    const error = new Error('Oops, there has been some internal server error.')
                    alert(error)
                }
                if (err.request) {
                    const error = new Error('Oops, there has been some network error.')
                    alert(error)
                } else {
                    window.alert(`Oops, ${err.message}`)
                }
            })
    }

    const suggestionSelected = (value: string): void => {
        setState((prevState: any) => ({ ...prevState, query: value, suggestions: [] }))
    }

    const renderSuggestedSearch = () => {
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {suggestions.map((item: any, idx: number) => (
                        <li className="suggestions" onClick={() => suggestionSelected(item.title)} key={idx}>{item.title}</li>
                    ))}
                </ul>
            )
        }
    }

    return (
        <MovieContext.Provider value={{ state, setState, fetchMovies, handleSearchInput, suggestionSelected, renderSuggestedSearch }}>
            {children}
        </MovieContext.Provider>
    );
}