import React from 'react'

import '../../assets/styles/main.scss'

interface IProps {
    placeholderText: string
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<IProps> = ({ placeholderText, onChange, value }) => {

    return (
        <input value={value} onChange={onChange} className="search" type="text" placeholder={placeholderText} />
    )
}

export default Search
