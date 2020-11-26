import React, { ChangeEvent, createContext, useContext, FC, useEffect, useRef } from 'react';
import axios from 'axios';

import { discoverMoviesEndpoint, searchMoviesEndpoint } from '../../utils/api'
import { StateControllerContext } from './StateControllerContext';

type InputElement = ChangeEvent<HTMLInputElement>

export const MovieContext = createContext(null)

export const MovieContextProvider: FC = ({ children }) => {

    const { state, setState } = useContext(StateControllerContext)

    const { suggestions, query } = state

    const handleSearchInput = (e: InputElement): void => {
        const query = e.target.value // defining query to be able to write input into search bar through our state
        setState((prevState: any) => ({ ...prevState, query })) // this is making sure that onChange will fire
        if (query.length > 2) { // we are checking up if our search term length is greater than 2 and if yes
            triggerQuery(query)
        } return
    }

    function triggerQuery(query: string) {
        setTimeout(() => {
            axios(`${searchMoviesEndpoint}` + query) // we are firing a request to our themoviedb server.
                .then(({ data }) => {
                    let results = data.results // here we are fetching results to a variable
                    console.log(results)
                    let suggestions = results.slice(0, 10) // we use slice() function to cut down only 10 query results.
                    if (query.length > 2) { // now, if query length is greater than 3 we are displaying results beneath the search bar. We have put 2 as a condition because it counts from zero.
                        const regex = new RegExp(`^${query}`, 'i') // here we are checking our regular expression to be able to filter search
                        suggestions.sort((prop: any) => prop.first_air_date).filter((val: any) => regex.test(val)) // this function is self-explanatory - it sorts out query by release date
                        setState((prevState: any) => ({ ...prevState, query, suggestions, loading: false, popularResults: [] })) // here we are populating our state with results.
                        console.log('%c Suggestion nr. 1: ', 'color: red', state.suggestions)
                    } else {
                        fetchMovies() // if we don't satisfy query terms, we are displaying a list of top 10 movies.
                        setState((prevState: any) => ({ ...prevState, suggestions: [] })) // reverting query back to empty array
                    }
                })
                .catch((err) => {
                    if (err.response) { // here I'm checking if there's an error while getting a response from server.
                        console.log('Oops, it seems there\'s a server error. ', err) // if there is we are logging and alerting error to user.
                        console.trace(err)
                        window.alert(`Oops, ${err}`)
                    }
                    if (err.request) { // here is the almost the same situation, main difference is it that in here, we are checking if there is an error while requesting data from server.
                        console.log('Oops, it seems there\'s a network error.', err)
                        console.trace(err)
                        window.alert(`Oops, ${err}`)
                    }
                })
        }, 1000)
    }


    useEffect(() => {
        if (state.query) {
            setTimeout(() => {
                triggerQuery(query)
            }, 3000)
        }
    }, [state.query]) // listening to query change, if there is one - re-render suggestions.
    // NOTE: I have found out that this is bugged, but it works kind of.
    // We can select item from dropdown suggestions and display it properly.
    // Only thing to fix is re-rendering every time.


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