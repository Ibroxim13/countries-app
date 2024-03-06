import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export const UseMainContext = () => useContext(Context)

const ContextProvider = ({ children }) => {
    const [countries, setCountries] = useState([])
    const [selected, setSelected] = useState('')
    const [filteredCountries, setFiltredCountries] = useState([])
    const [regionCountries, setRegionCountries] = useState([])

    useEffect(() => {
        axios("/data/data.json")
            .then(res => {
                setFiltredCountries(res.data)
                setCountries(res.data)
            })
    }, [])

    return (
        <Context.Provider value={[countries, setCountries, selected, setSelected, filteredCountries, setFiltredCountries, regionCountries, setRegionCountries]}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;