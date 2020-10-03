import React from 'react'

import '../../assets/styles/main.scss'

interface Props {
    placeholderText: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    submitInput?: (e: React.FormEvent<HTMLFormElement>) => void
}

const Search: React.FC<Props> = ({ placeholderText, onChange, submitInput }) => {

    return (
        <form onSubmit={submitInput}>
            <input onChange={onChange} className="search" type="text" placeholder={placeholderText} />
        </form>
    )
}

export default Search
