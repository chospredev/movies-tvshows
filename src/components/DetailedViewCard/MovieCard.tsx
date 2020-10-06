import React, { FC } from 'react'

type IProps = {
    cover?: string,
    trailer?: string,
    title?: string,
    overview?: string,
    release_date?: Date,
}

const MovieCard: FC<IProps> = ({ cover, trailer, title, overview, release_date }): JSX.Element => {
    return (
        <section className="card-details">
            <main>
                <img src={cover} alt="" />
                <h1>{title}</h1>
                <p>{overview}</p>
                <h3>{release_date}</h3>
            </main>
        </section>
    )
}

export default MovieCard
