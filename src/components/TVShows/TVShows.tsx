import React, { useState } from 'react'

import '../../assets/styles/main.scss'
import Search from '../Search/Search'

const Movies: React.FC = () => {

    const [placeholderText] = useState('Search for any TV show...')

    return (
        <section className="tvshows-container">
            <h1>TV Shows</h1>
            <section className="search-bar">
                <Search placeholderText={placeholderText} />
            </section>
        </section>
    )
}

export default Movies