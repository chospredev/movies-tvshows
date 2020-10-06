import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import TVShows from './TVShows/TVShows'
import Movies from './Movies/Movies'
import MovieCard from './DetailedViewCard/MovieCard'
import '../assets/styles/main.scss'

const App: FC = () => {
    return (
        <div className="wrapper">
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={TVShows} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/movie-details" component={MovieCard} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
