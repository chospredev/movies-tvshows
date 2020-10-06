import React, { ChangeEvent, FC, Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Route } from 'react-router-dom'

import Search from '../Search/Search'
import { discoverMoviesEndpoint, searchMoviesEndpoint } from '../../utils/api'
import '../../assets/styles/main.scss'

interface IMoviesState {
    popularResults?: [],
    suggestions?: []
    placeholderText?: string,
    query?: string,
    loading?: boolean,
}

type InputElement = ChangeEvent<HTMLInputElement>

const Movies: FC<IMoviesState> = ({ placeholderText }) => {

    const [state, setState] = useState<IMoviesState>({
        popularResults: [],
        suggestions: [],
        query: '',
        loading: false,
    })

    const { popularResults, query, suggestions, loading } = state

    const handleSearchInput = (e: InputElement): void => {
        const query = e.currentTarget.value
        setState((prevState) => ({ ...prevState, query }))
        if (query.length > 0) {
            setTimeout(() => {
                axios(`${searchMoviesEndpoint}` + query)
                    .then(({ data }) => {
                        let results = data.results
                        let suggestions = results.slice(0, 10)
                        if (query.length > 2) {
                            const regex = new RegExp(`^${query}`, 'i')
                            suggestions.sort((prop: any) => prop.release_date).filter((val: any) => regex.test(val))
                            setState((prevState) => ({ ...prevState, query, suggestions, loading: false, popularResults: [] }))
                        } else {
                            fetchMovies()
                            setState((prevState) => ({ ...prevState, suggestions: [] }))
                        }
                    })
                    .catch((err) => console.error(err))
            }, 1000)
        } return null
    }

    const fetchMovies = (): void => {
        axios(`${discoverMoviesEndpoint}`)
            .then(({ data }) => {
                let popularResults = data.results
                setState((prevState) => ({ ...prevState, popularResults }))
            })
    }

    placeholderText = 'Search for any TV Show..'

    const suggestionSelected = (value: string): void => {
        setState((prevState) => ({ ...prevState, query: value, suggestions: [] }))
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
        fetchMovies()
    }, [])

    if (loading) {
        return <p className="loading-indicator">Loading...</p>
    }

    return (
        <Fragment>
            <section className="movies-container">
                <h1>Movies</h1>
                <section className="search-bar">
                    <Search value={query} onChange={handleSearchInput} placeholderText={placeholderText} />
                    <section>
                        {renderSuggestedSearch()}
                    </section>
                </section>
                <h1 className="popular-heading"><span className="popular">Popular</span> Movie Exclusives</h1>
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