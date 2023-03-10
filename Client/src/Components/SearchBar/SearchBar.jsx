import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useRef } from 'react'
import { setFilter } from '../../Slice/newFilter/newFilterSlice'


const SearchBar = () => {

    const filter = useSelector(state => state.newFilter)
    const [input, setInput] = useState(filter.name ? filter.name : '')
    const [showSearchClear, setShowSearchClear] = useState(filter.name ? true : false)
    const [searchActive, setSearchActive] = useState(false)
    const inputRef = useRef()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        setShowSearchClear(true)
        inputRef.current.blur()
        if(e.type === 'submit' && input.length > 0) {
            dispatch(setFilter({name: input}))
            setSearchActive(true)
            setShowSearchClear(true)
        } else {
            dispatch(setFilter({name: null}))
            setSearchActive(false)
            setShowSearchClear(false)
            setInput('')
        }
    }

    return (
        <form className={styles.searchBar} onSubmit={handleClick}>
            {   !showSearchClear
                    &&  <>
                        <button hidden type='submit'></button>
                        <button className={styles.searchButton} type="submit">
                            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} fixedWidth />
                        </button></>
            }
            <input
                className={styles.searchInput}
                ref={inputRef}
                type="text"
                name="name" 
                placeholder='Search...'
                autoComplete='none'
                value={input}
                // disabled={dogs.length === 0}
                onChange={e => setInput(e.target.value)}
                onFocus={() => setShowSearchClear(false)}
                onBlur={() => {searchActive && setShowSearchClear(true)}}
            />
            {   showSearchClear
                    &&  <>
                            <button id="clearButton" className={styles.searchButton} type="reset" onClick={handleClick}>
                                <FontAwesomeIcon className={styles.searchIcon} icon={faXmark} fixedWidth />
                            </button>
                            <button hidden type='submit'></button>
                        </>

            }
        </form>
    )
}

export default SearchBar