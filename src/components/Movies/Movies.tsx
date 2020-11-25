import React, { FC, Fragment, useEffect, useContext } from 'react'

import { MovieContext } from '../../helpers/ContextAPI/MovieContext'
import Search from '../Search/Search'
import '../../assets/styles/main.scss'
import Movie from './Movie'
import MoviePopup from '../Popup/MoviePopup'

interface IProps {
    placeholderText?: string,
    actualTerm: any
}

const Movies: FC<IProps> = ({ placeholderText }) => {

    const { state,
        setState,
        fetchMovies,
        handleSearchInput,
        renderSuggestedSearch,
    } = useContext(MovieContext)

    const { loading, query, popularResults, selected } = state


    placeholderText = 'Search for any movie...'

    useEffect(fetchMovies, [])

    if (loading) {
        return <p className="loading-indicator">Loading...</p>
    }

    const openPopup = (idx: number) => {
        const filtered = popularResults.filter((results: any) => results.id === idx)
        const filteredTitle = filtered.map(({ title }: any) => title)
        const filteredPosterPath = filtered.map(({ poster_path }: any) => poster_path)
        const filteredOverview = filtered.map(({ overview }: any) => overview)
        const filteredReleaseDate = filtered.map(({ release_date }: any) => release_date)
        const filteredVoteAverage = filtered.map(({ vote_average }: any) => vote_average)
        const destructuredTitle = filteredTitle[0]
        const destructuredPosterPath = filteredPosterPath[0]
        const destructuredOverview = filteredOverview[0]
        const destructuredReleaseDate = filteredReleaseDate[0]
        const destructuredVoteAverage = filteredVoteAverage[0]
        setState((prev: any) => ({ ...prev, selected: { destructuredTitle, destructuredPosterPath, destructuredOverview, destructuredReleaseDate, destructuredVoteAverage } }))
    }

    const closePopup = () => {
        setState((prev: any) => ({ ...prev, selected: {} }))
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
                    <Movie openPopup={openPopup} />
                </section>
            </section>
            { (typeof selected.destructuredTitle != 'undefined') ? <MoviePopup selected={selected} close={closePopup} /> : false}
        </Fragment>
    )
}

export default Movies