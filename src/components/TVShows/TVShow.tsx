import React, { FC, Fragment, useContext } from 'react'

import { TVShowsContext } from '../../helpers/ContextAPI/TVShowsContext'

interface IProps {
    openPopup: any
}

const TVShow: FC<IProps> = ({ openPopup }) => {

    const { state: { popularResults } } = useContext(TVShowsContext)

    const popularResultsRender = popularResults.slice(0, 10).map((item: any, index: any) => {
        return (
            <Fragment key={item.id}>
                <div onClick={() => openPopup(item.id)} className="card" key={index}>
                    <img className="image" alt="cover" src={`http://image.tmdb.org/t/p/w300/${item.poster_path}`} />
                    <h1 className="title"><a href="https">{item.name}</a></h1>
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

export default TVShow
