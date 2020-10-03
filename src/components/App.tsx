import React from 'react'
// @ts-ignore
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import TVShows from './TVShows/TVShows'
import Movies from './Movies/Movies'
import { MovieProvider } from './GlobalContext'
import '../assets/styles/main.scss'

const App: React.FC = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={TVShows} />
                    <MovieProvider>
                        <Route path="/movies" component={Movies} />
                    </MovieProvider>
                </Switch>
            </Router>
        </div>
    )
}

export default App
