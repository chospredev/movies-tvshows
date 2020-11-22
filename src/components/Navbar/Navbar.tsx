import React from 'react'
// @ts-ignore
import { Link } from 'react-router-dom'

import '../../assets/styles/main.scss'

const Navbar: React.FC = () => {

    return (
        <section className="nav-container">
            <h1 className="heading">
                <Link className="nav-link" to="/">Movies | TV Shows</Link>
            </h1>
            <ul>
                <li><Link className="nav-link" to="/">TV Shows</Link></li>
                <li><Link className="nav-link" to="/movies">Movies</Link></li>
            </ul>
        </section>
    )
}

export default Navbar