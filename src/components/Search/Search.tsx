import React from 'react'

import '../../assets/styles/main.scss'

interface Props {
    placeholderText: string
}

const Search: React.FC<Props> = ({  placeholderText }) => {
    return (
        <input className="search" type="text" placeholder={placeholderText} />
    )
}

export default Search
