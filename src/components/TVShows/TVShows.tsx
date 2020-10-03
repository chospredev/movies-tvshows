import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import '../../assets/styles/main.scss'
import Search from '../Search/Search'
import { discoverTVShowsEndpoint, searchShowsEndpoint } from '../../utils/api'

interface ITVShowsState {
    loading?: boolean,
    placeholderText?: string,
    searchResults?: [],
    popularResults?: [],
    find?: string,
}

type InputElement = ChangeEvent<HTMLInputElement>
type FormElement = FormEvent<HTMLFormElement>

const Movies: FC<ITVShowsState> = ({ placeholderText }) => {

    const [state, setState] = useState<ITVShowsState>({
        find: '',
        searchResults: [],
        popularResults: [],
    })

    const handleSearchInput = (e: InputElement): void => {
        const { value } = e.target
        setState((prevState => ({ ...prevState, find: value })))
    }

    const fetchSearch = (e: FormElement): void => {
        e.preventDefault()
        axios(`${searchShowsEndpoint}` + state.find)
            .then(({ data }) => {
                let searchResults = data.results
                console.log(searchResults)
                setState((prevState) => ({ ...prevState, searchResults }))
            })
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

    const searchResultsRender = state.searchResults.map((item: any, index: number) => {
        return (
            <div key={index}>
                <h1>{item.name}</h1>
            </div>
        )
    })

    const popularResultsRender = state.popularResults.slice(0, 10).map((item: any, index: any) => {
        return (
            <div key={index}>
                <h1>{item.name}</h1>
            </div>
        )
    })

    useEffect(() => {
        fetchTVShows()
    }, [])

    return (
        <section className="tvshows-container">
            <h1>TV Shows</h1>
            <section className="search-bar">
                <Search onChange={handleSearchInput} submitInput={fetchSearch} placeholderText={placeholderText} />
            </section>
            <section className="search-section">
                {searchResultsRender}
            </section>
            <section className="popular-shows-section">
                {popularResultsRender}
            </section>
        </section>
    )
}

export default Movies