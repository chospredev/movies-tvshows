import React, { ChangeEvent, FC, Fragment, useContext, useEffect } from 'react'

import { TVShowsContext } from '../../helpers/ContextAPI/TVShowsContext'
import Search from '../Search/Search'
import '../../assets/styles/main.scss'
import TVShow from './TVShow'
import ShowPopup from '../Popup/ShowPopup'

interface IProps {
    placeholderText?: string,
}

const TVShows: FC<IProps> = ({ placeholderText }) => {

    const { state,
        setState,
        fetchTVShows,
        handleSearchInput,
        renderSuggestedSearch,
    } = useContext(TVShowsContext)

    const { query, loading, popularResults, selected } = state

    placeholderText = 'Search for any TV show..'

    useEffect(fetchTVShows, [])

    if (loading) {
        return <p className="loading-indicator">Loading...</p>
    }

    const openPopup = (idx: number) => {
        const filtered = popularResults.filter((results: any) => results.id === idx)
        const filteredTitle = filtered.map(({ name }: any) => name)
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
                    <TVShow openPopup={openPopup} />
                </section>
                {(typeof selected.destructuredTitle != 'undefined') ? <ShowPopup selected={selected} close={closePopup} /> : false}
            </section>
        </Fragment>
    )
}

export default TVShows