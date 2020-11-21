import React, { FC, Fragment, useEffect, useContext } from 'react'

import { MovieContext } from '../../helpers/ContextAPI/MovieContext'
import Search from '../Search/Search'
import '../../assets/styles/main.scss'
import Movie from './Movie'
import Popup from '../Popup/Popup'

interface IProps {
    placeholderText?: string,
}

const Movies: FC<IProps> = ({ placeholderText }) => {

    const { state,
        fetchMovies,
        handleSearchInput,
        renderSuggestedSearch,
    } = useContext(MovieContext)

    const { loading, query } = state


    placeholderText = 'Search for any movie...'

    useEffect(fetchMovies, [])

    if (loading) {
        return <p className="loading-indicator">Loading...</p>
    }

    const openPopup = (id: number) => {
        const filtered = state.popularResults.filter((result: any) => id === result.id)
        filtered.map((filters: any) => {
            return (
                <>
                    <Popup
                        title={filters.title}
                        poster_path={filters.poster_path}
                        overview={filters.overview}
                        release_date={filters.release_date}
                        vote_average={filters.vote_average}
                    />
                </>
            )
        })
        console.log(id)
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
        </Fragment>
    )
}

export default Movies