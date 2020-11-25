import React, { ChangeEvent, createContext, FC, useContext, useEffect } from 'react';
import axios from 'axios';

import { discoverTVShowsEndpoint, searchShowsEndpoint } from '../../utils/api'
import { StateControllerContext } from './StateControllerContext';

type InputElement = ChangeEvent<HTMLInputElement>

export const TVShowsContext = createContext(null)

export const TVShowsContextProvider: FC = ({ children }) => {

    const { state, setState } = useContext(StateControllerContext)

    const { suggestions } = state


    const handleSearchInput = (e: InputElement): void => {
        const query = e.target.value // defining query to be able to write into search bar through our state
        setState((prevState: any) => ({ ...prevState, query })) // this is making sure that onChange will fire
        if (query.length > 0 && query !== '') { // we are checking up if our search term length is greater than 0 and if yes
            setTimeout(() => { // triggering search after 1000 milliseconds / 1 second
                axios(`${searchShowsEndpoint}` + query) // we then, are firing a request to our themoviedb server.
                    .then(({ data }) => {
                        let results = data.results // here we are fetching results to a variable
                        console.log(results)
                        let suggestions = results.slice(0, 10) // we use slice() function to cut down only 10 query results.
                        if (query.length > 2) { // now, if query length is greater than 2 we are displaying results beneath the search bar.
                            const regex = new RegExp(`^${query}`, 'i') // here we are checking our regular expression to be able to filter search
                            suggestions.sort((prop: any) => prop.first_air_date).filter((val: any) => regex.test(val)) // this function is self-explanatory - it sorts out query by release date
                            setState((prevState: any) => ({ ...prevState, suggestions, loading: false, popularResults: [] })) // here we are populating our state with results.
                            console.log('%c Suggestion nr. 1: ', 'color: red', state.suggestions)
                        } else {
                            fetchTVShows() // if we don't satisfy query terms, we are displaying a list of top 10 movies.
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
            }, 1000) // 1000 milliseconds = 1 second
        } return null
    }

    const fetchTVShows = (): void => {
        axios(`${discoverTVShowsEndpoint}`) // firing request to our server
            .then(({ data }) => {
                let popularResults = data.results // defining variable and populating it with results
                console.log(popularResults)
                setState((prevState: any) => ({ ...prevState, popularResults })) // populating our states' popular results with our fetched results.
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
    }

    const suggestionSelected = (value: string, idx: number) => {
        const FILTERED_SUGGESTIONS = state.suggestions.filter((results: any) => results.id === idx)
        const ORIGINAL_NAME = FILTERED_SUGGESTIONS.map(({ name }: any) => name)
        const POSTER_PATH = FILTERED_SUGGESTIONS.map(({ poster_path }: any) => poster_path)
        const SHOW_OVERVIEW = FILTERED_SUGGESTIONS.map(({ overview }: any) => overview)
        const RELEASE_DATE = FILTERED_SUGGESTIONS.map(({ release_date }: any) => release_date)
        const VOTE_AVERAGE = FILTERED_SUGGESTIONS.map(({ vote_average }: any) => vote_average)
        const destructuredTitle = ORIGINAL_NAME[0]
        const destructuredPosterPath = POSTER_PATH[0]
        const destructuredOverview = SHOW_OVERVIEW[0]
        const destructuredReleaseDate = RELEASE_DATE[0]
        const destructuredVoteAverage = VOTE_AVERAGE[0]
        setState((prevState: any) => ({ ...prevState, query: value, suggestions: [], selected: { destructuredTitle, destructuredPosterPath, destructuredOverview, destructuredReleaseDate, destructuredVoteAverage } })) // if we select an item from dropdown, we are populating our query with value.
    }

    const renderSuggestedSearch = () => {
        if (suggestions.length !== 0) { // checking if query - suggestions length is not equal to 0, if not we are displaying a dropdown list.
            return (
                <ul>
                    {suggestions.map((item: any, idx: number) => (
                        <li className="suggestions" onClick={() => suggestionSelected(item.name, item.id)} key={idx}>{item.name}</li>
                    ))}
                </ul>
            )
        } else {
            return null
        }
    }

    return (
        <>
            <TVShowsContext.Provider value={{ state, setState, fetchTVShows, handleSearchInput, suggestionSelected, renderSuggestedSearch }}>
                {children}
            </TVShowsContext.Provider>
        </>
    );
}