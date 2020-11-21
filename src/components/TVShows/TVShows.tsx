import React, { FC, Fragment, useContext, useEffect } from 'react'

import { TVShowsContext } from '../../helpers/ContextAPI/TVShowsContext'
import Search from '../Search/Search'
import '../../assets/styles/main.scss'

interface IProps {
    placeholderText?: string,
}

const Movies: FC<IProps> = ({ placeholderText }) => {

    const { state,
        fetchTVShows,
        handleSearchInput,
        renderSuggestedSearch,
        popularResultsRender } = useContext(TVShowsContext)

    const { query, loading } = state

    placeholderText = 'Search for any TV show..'

    useEffect(fetchTVShows, [])

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