import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'

import Search from '../Search/Search'
import { discoverTVShowsEndpoint, searchShowsEndpoint } from '../../utils/api'
import '../../assets/styles/main.scss'

interface ITVShowsState {
    popularResults?: [],
    suggestions?: []
    placeholderText?: string,
    query?: string,
    loading?: boolean,
}

type InputElement = ChangeEvent<HTMLInputElement>

const Movies: FC<ITVShowsState> = ({ placeholderText }) => {

    const history = createBrowserHistory()

    const [state, setState] = useState<ITVShowsState>({
        popularResults: [],
        suggestions: [],
        query: '',
        loading: false,
    })

    const { popularResults, suggestions, query, loading } = state

    const handleSearchInput = (e: InputElement): void => {
        const query = e.target.value
        setState((prevState) => ({ ...prevState, query }))
        if (query.length > 0) {
            setTimeout(() => {
                axios(`${searchShowsEndpoint}` + query)
                    .then(({ data }) => {
                        let results = data.results
                        console.log(results)
                        let suggestions = results.slice(0, 10)
                        if (query.length > 2) {
                            const regex = new RegExp(`^${query}`, 'i')
                            suggestions.sort((prop: any) => prop.release_date).filter((val: any) => regex.test(val))
                            setState((prevState) => ({ ...prevState, suggestions, query, loading: false, popularResults: [] }))
                        } else {
                            fetchTVShows()
                            setState((prevState) => ({ ...prevState, suggestions: [] }))
                        }
                    })
                    .catch((err) => console.error(err))
            }, 1000)
        } return null
    }

    const fetchTVShows = (): void => {
        axios(`${discoverTVShowsEndpoint}`)
            .then(({ data }) => {
                let popularResults = data.results
                console.log(popularResults)
                setState((prevState) => ({ ...prevState, popularResults }))
            })
    }

    placeholderText = 'Search for any TV Show..'

    const suggestionSelected = (value: string) => {
        setState((prevState) => ({ ...prevState, query: value, suggestions: [] }))
    }

    const renderSuggestedSearch = () => {
        if (suggestions.length !== 0) {
            return (
                <ul>
                    {suggestions.map((item: any, idx: number) => (
                        <Link to="/movie-details"><li className="suggestions" onClick={() => suggestionSelected(item.name)} key={idx}>{item.name}</li></Link>
                    ))}
                </ul>
            )
        } else {
            return null
        }
    }

    const popularResultsRender = popularResults.slice(0, 10).map((item: any, index: any) => {
        return (
            <div className="card" key={index}>
                <img className="image" alt="cover" src={`http://image.tmdb.org/t/p/w300/${item.poster_path}`} />
                <h1 className="title"><a href="https">{item.name}</a></h1>
                <p className="overview">{item.overview}</p>
            </div>
        )
    })

    useEffect(() => {
        fetchTVShows()
    }, [])

    if (loading) {
        return <p className="loading-indicator">Loading...</p>
    }

    return (
        <Fragment>
            <section className="tvshows-container">
                <h1>TV Shows</h1>
                <section className="search-bar">
                    <Search value={query} onChange={handleSearchInput} placeholderText={placeholderText} />
                    <section>
                        {renderSuggestedSearch()}
                    </section>
                </section>
                <h1 className="popular-heading"><span className="popular">Popular</span> TV Show Exclusives</h1>
            </section>
            <section className="cards-wrapper">
                <section className="cards">
                    {popularResultsRender}
                </section>
            </section>
        </Fragment>
    )
}

export default Movies