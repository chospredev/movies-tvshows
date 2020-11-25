import React, { ChangeEvent, createContext, useContext, FC } from 'react';
import axios from 'axios';

import { discoverMoviesEndpoint, searchMoviesEndpoint } from '../../utils/api'
import { StateControllerContext } from './StateControllerContext';

type InputElement = ChangeEvent<HTMLInputElement>

export const MovieContext = createContext(null)

export const MovieContextProvider: FC = ({ children }) => {

    const { state, setState } = useContext(StateControllerContext)

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
                        } else {
                            fetchMovies()
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
                setState((prevState: any) => ({ ...prevState, popularResults }))
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

    const suggestionSelected = (value: string, idx: number): void => {
        const FILTERED_SUGGESTIONS = state.suggestions.filter((results: any) => results.id === idx)
        const ORIGINAL_TITLE = FILTERED_SUGGESTIONS.map(({ title }: any) => title)
        const POSTER_PATH = FILTERED_SUGGESTIONS.map(({ poster_path }: any) => poster_path)
        const SHOW_OVERVIEW = FILTERED_SUGGESTIONS.map(({ overview }: any) => overview)
        const RELEASE_DATE = FILTERED_SUGGESTIONS.map(({ release_date }: any) => release_date)
        const VOTE_AVERAGE = FILTERED_SUGGESTIONS.map(({ vote_average }: any) => vote_average)
        const destructuredTitle = ORIGINAL_TITLE[0]
        const destructuredPosterPath = POSTER_PATH[0]
        const destructuredOverview = SHOW_OVERVIEW[0]
        const destructuredReleaseDate = RELEASE_DATE[0]
        const destructuredVoteAverage = VOTE_AVERAGE[0]
        setState((prevState: any) => ({ ...prevState, query: value, suggestions: [], selected: { destructuredTitle, destructuredPosterPath, destructuredOverview, destructuredReleaseDate, destructuredVoteAverage } }))
    }

    const renderSuggestedSearch = () => {
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {suggestions.map((item: any, idx: number) => (
                        <li className="suggestions" onClick={() => suggestionSelected(item.title, item.id)} key={idx}>{item.title}</li>
                    ))}
                </ul>
            )
        }
    }

    return (
        <>
            <MovieContext.Provider value={{ state, setState, fetchMovies, handleSearchInput, suggestionSelected, renderSuggestedSearch }}>
                {children}
            </MovieContext.Provider>
        </>
    );
}