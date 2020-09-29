import React, { useState } from 'react'

import '../../assets/styles/main.scss'
import Search from '../Search/Search'

const Movies: React.FC = () => {

    const [placeholderText] = useState('Search for any movie...')

    return (
        <section className="movies-container">
            <h1>Movies</h1>
            <section className="search-bar">
                <Search placeholderText={placeholderText} />
            </section>
        </section>
    )
}

export default Movies