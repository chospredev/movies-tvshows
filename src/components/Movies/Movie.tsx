import React, { FC, Fragment, useContext } from 'react'

import { MovieContext } from '../../helpers/ContextAPI/MovieContext'

interface IProps {
    openPopup: any
}

const Movie: FC<IProps> = ({ openPopup }) => {

    const { state: { popularResults } } = useContext(MovieContext)

    const popularResultsRender = popularResults.slice(0, 10).map((item: any, index: any) => {
        return (
            <Fragment key={item.id}>
                <div className="card" key={index}>
                    <img onClick={() => openPopup(item.id)} className="image" alt="cover" src={`http://image.tmdb.org/t/p/w300/${item.poster_path}`} />
                    <h1 className="title"><a href={`#movie/${item.title}/${item.id}`}>{item.title}</a></h1>
                    <p className="overview">{item.overview}</p>
                </div>
            </Fragment>
        )
    })

    return (
        <>
            {popularResultsRender}
        </>
    )
}

export default Movie
