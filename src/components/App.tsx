import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { MovieContextProvider } from '../helpers/ContextAPI/MovieContext'
import { TVShowsContextProvider } from '../helpers/ContextAPI/TVShowsContext'
import Navbar from './Navbar/Navbar'
import TVShows from './TVShows/TVShows'
import Movies from './Movies/Movies'
import '../assets/styles/main.scss'
import { StateControllerProvider } from '../helpers/ContextAPI/StateControllerContext'

const App: FC = () => {
    return (
        <div className="wrapper">
            <Router>
                <Navbar />
                <Switch>
                    <StateControllerProvider>
                        <TVShowsContextProvider>
                            <Route exact path="/" component={TVShows} />
                            <MovieContextProvider>
                                <Route path="/movies" component={Movies} />
                            </MovieContextProvider>
                        </TVShowsContextProvider>
                    </StateControllerProvider>
                </Switch>
            </Router>
        </div>
    )
}

export default App
