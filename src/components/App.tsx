import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { MovieContextProvider } from '../helpers/ContextAPI/MovieContext'
import { TVShowsContextProvider } from '../helpers/ContextAPI/TVShowsContext'
import { SearchContextProvider } from '../helpers/ContextAPI/SearchContext'
import Navbar from './Navbar/Navbar'
import TVShows from './TVShows/TVShows'
import Movies from './Movies/Movies'
import '../assets/styles/main.scss'

const App: FC = () => {

    return (
        <div className="wrapper">
            <Router>
                <Navbar />
                <Switch>
                    <SearchContextProvider>
                        <TVShowsContextProvider>
                            <Route exact path="/" component={TVShows} />
                            <MovieContextProvider>
                                <Route path="/movies" component={Movies} />
                            </MovieContextProvider>
                        </TVShowsContextProvider>
                    </SearchContextProvider>
                </Switch>
            </Router>
        </div>
    )
}

export default App
