import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import '../../assets/styles/main.scss'

interface IProps {
    selected: any
    close: any
}

const ShowPopup: FC<IProps> = ({ selected, close }) => {
    return (
        <>
            <section className="popup">
                <section className="content">
                    <button onClick={close} className="backTo">Back</button>
                    <div className="image-or-trailer">
                        <img src={`http://image.tmdb.org/t/p/w300/${selected.destructuredPosterPath}`} alt={`Movie: ${selected.destructuredName}`} />
                    </div>
                    <h2 className="title">{selected.destructuredTitle}</h2> <h2 className="release-date">{selected.destructuredReleaseDate}</h2>
                    <p className="overview">{selected.destructuredOverview}</p>
                    <p className="rating"><FontAwesomeIcon className="icon" icon={faStar} /> {selected.destructuredVoteAverage}</p>
                </section>
            </section>
        </>
    )
}

export default ShowPopup
