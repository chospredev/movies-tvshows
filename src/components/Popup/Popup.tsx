import React, { FC } from 'react'

import '../../assets/styles/main.scss'

interface IProps {
    title: any,
    poster_path: any,
    overview: any,
    release_date: any,
    vote_average: any
}

const Popup: FC<IProps> = ({ title, poster_path, overview, release_date, vote_average }) => {
    return (
        <section className="popup">
            <section className="content">
                <div className="image-or-trailer">
                    <img src={poster_path} alt={`Movie: ${title}`} />
                    {console.log(title, poster_path, overview)}
                </div>
                <h2>{title}</h2> <h2>{release_date}</h2>
                <p className="overview">{overview}</p>
                <p className="rating">{vote_average}</p>
            </section>
        </section>
    )
}

export default Popup
