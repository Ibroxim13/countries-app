import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './Main'
import CountryDetails from './CountryDetails'

export default function Pages() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/country/:alpha-code' element={<CountryDetails />} />
            </Routes>
        </>
    )
}
