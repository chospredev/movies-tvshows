import React from 'react'
// @ts-ignore
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import TVShows from './TVShows/TVShows'
import Movies from './Movies/Movies'

const App: React.FC = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={TVShows} />
                    <Route path="/movies" component={Movies} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
