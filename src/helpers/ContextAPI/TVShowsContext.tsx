import React, { ChangeEvent, useState, createContext, useContext, FC } from 'react';
import axios from 'axios';

import { discoverTVShowsEndpoint, searchShowsEndpoint } from '../../utils/api'
import { SearchContext } from './SearchContext';

type InputElement = ChangeEvent<HTMLInputElement>

interface IState {
    popularResults: [],
    suggestions: [],
    selected: {},
    query: string,
    loading: boolean
}

export const TVShowsContext = createContext(null)

export const TVShowsContextProvider: FC = ({ children }) => {

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
        const query = e.target.value // defining query to be able to write into search bar through our state
        setState((prevState: any) => ({ ...prevState, query })) // this is making sure that onChange will fire
        if (query.length > 0) { // we are checking up if our search term length is greater than 0 and if yes
            setTimeout(() => { // triggering search after 1000 milliseconds / 1 second
                axios(`${searchShowsEndpoint}` + query) // we then, are firing a request to our themoviedb server.
                    .then(({ data }) => {
                        let results = data.results // here we are fetching results to a variable
                        console.log(results)
                        let suggestions = results.slice(0, 10) // we use slice() function to cut down only 10 query results.
                        if (query.length > 2) { // now, if query length is greater than 2 we are displaying results beneath the search bar.
                            const regex = new RegExp(`^${query}`, 'i') // here we are checking our regular expression to be able to filter search
                            suggestions.sort((prop: any) => prop.release_date).filter((val: any) => regex.test(val)) // this function is self-explanatory - it sorts out query by release_date
                            setState((prevState: any) => ({ ...prevState, suggestions, query, loading: false, popularResults: [] })) // here we are populating our state with results.
                            setSearchTerm((prevQuery: any) => ({ ...prevQuery, searchTerm: query })) // here I need a fix, I need to store searchTerm state across 2 searchbars of movie and tvshow components 
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

    const suggestionSelected = (value: string) => {
        setState((prevState: any) => ({ ...prevState, query: value, suggestions: [] })) // if we select an item from dropdown, we are populating our query with value.
    }

    const renderSuggestedSearch = () => {
        if (suggestions.length !== 0) { // checking if query - suggestions length is not equal to 0, if not we are displaying a dropdown list.
            return (
                <ul>
                    {suggestions.map((item: any, idx: number) => (
                        <li className="suggestions" onClick={() => suggestionSelected(item.name)} key={idx}>{item.name}</li>
                    ))}
                </ul>
            )
        } else {
            return null
        }
    }

    return (
        <TVShowsContext.Provider value={{ state, setState, fetchTVShows, handleSearchInput, suggestionSelected, renderSuggestedSearch }}>
            {children}
        </TVShowsContext.Provider>
    );
}