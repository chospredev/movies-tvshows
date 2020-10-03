import React, { ChangeEvent, FC, FormEvent, useEffect, useState, useContext } from 'react'
import axios from 'axios'

import '../../assets/styles/main.scss'
import Search from '../Search/Search'
import { discoverMoviesEndpoint, searchMoviesEndpoint } from '../../utils/api'
import { MovieContext } from '../GlobalContext'

interface IMoviesState {
    placeholderText?: string,
    searchResults?: [],
    popularResults?: [],
    find?: string
}

type InputElement = ChangeEvent<HTMLInputElement>
type FormElement = FormEvent<HTMLFormElement>

const Movies: FC<IMoviesState> = ({ placeholderText }): JSX.Element => {

    // const [state, setState] = useState<IMoviesState>({
    //     popularResults: [],
    //     searchResults: [],
    //     find: ''
    // })

    const [state, setState] = useContext(MovieContext)

    const handleSearchInput = (e: InputElement): void => {
        const { value } = e.target
        setState(prevState => ({ ...prevState, find: value }))
    }

    const fetchSearch = (e: FormElement): void => {
        e.preventDefault()
        axios(searchMoviesEndpoint + state.find)
            .then(({ data }) => {
                let searchResults = data.results;
                setState((prevState) => ({ ...prevState, searchResults }))
            })
    }

    const fetchMovies = (): void => {
        axios(discoverMoviesEndpoint)
            .then(({ data }) => {
                let popularResults = data.results
                setState((prevState) => ({ ...prevState, popularResults }))
            })
    }

    useEffect(() => {
        fetchMovies()
    }, [])


    placeholderText = 'Search for any movie..'

    const searchResultsRender = state.searchResults.map((item: any, index: number) => {
        return (
            <div key={index}>
                <h1>{item.title}</h1>
            </div>
        )
    })

    const popularResultsRender = state.popularResults.slice(0, 10).map((item: any, index: any) => {
        return (
            <div key={index}>
                <h1>{item.title}</h1>
            </div>
        )
    })

    return (
        <section className="movies-container">
            <h1>Movies</h1>
            <section className="search-bar">
                <Search onChange={handleSearchInput} submitInput={fetchSearch} placeholderText={placeholderText} />
            </section>
            <section>
                {searchResultsRender}
                {popularResultsRender}
            </section>
        </section>
    )
}

export default Movies