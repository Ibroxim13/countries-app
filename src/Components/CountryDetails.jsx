import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BsArrowLeft } from "react-icons/bs";
import { UseMainContext } from '../Context/Context'
import { Link } from 'react-router-dom';
import { Typography, List } from 'antd';

export default function CountryDetails() {
  const location = useLocation();
  const navigator = useNavigate()
  const [country, setCountry] = useState(JSON.parse(localStorage.getItem("country")) ? JSON.parse(localStorage.getItem("country")) : {})
  const [countries, setCountries, , setSelected, filteredCountries] = UseMainContext()
  const [dep, setDep] = useState(false)

  useEffect(() => {
    countries?.filter(countr => {
      if (countr.alpha3Code === location.pathname.slice(10)) {
        setCountry(countr)
        localStorage.setItem("country", JSON.stringify(countr))
      }
    })
  }, [dep])

  const navigateToCountry = (name) => {
    countries.forEach(item => {
      if (item.alpha3Code == name) {
        navigator(`/country/:${item.alpha3Code}`)
        setDep(!dep)
      }
    })
  }


  return (
    <section className='content'>
      <div className="container">
        <div className="to-home-button">
          <Link onClick={() => { setSelected(''); setCountries(filteredCountries); localStorage.removeItem("country") }} to={"/"}><button><BsArrowLeft /> Back</button></Link>
        </div>
        <div className="country-row">
          <div className="country-col"><img src={country?.flag} alt="" /></div>
          <div className="country-col">
            <Typography.Title level={2}>{country?.name}</Typography.Title>
            <div className='country-lists'>
              <List className='country-list'>
                <Typography.Text>
                  <span>Native Name:</span> <span>{country?.nativeName}</span>
                </Typography.Text>
                <Typography.Text>
                  <span>Population:</span> <span>{country?.population?.toLocaleString('en-US')}</span>
                </Typography.Text>
                <Typography.Text>
                  <span>Region:</span> <span>{country?.region}</span>
                </Typography.Text>
                <Typography.Text>
                  <span>Sub Region:</span> <span>{country?.subregion}</span>
                </Typography.Text>
                <Typography.Text>
                  <span>Capital:</span> <span>{country?.capital?.length > 1 ? country?.capital : "No capital"}</span>
                </Typography.Text>
              </List>
              <List className='country-list'>
                <Typography.Text>
                  <span>Top Level Domain:</span> <span>{country?.topLevelDomain}</span>
                </Typography.Text>
                <Typography.Text>
                  <span>Currencies:</span> <span>{country?.currencies?.map(item => <span key={item.name}>{item.name}{country?.currencies[country?.currencies.length - 1].name == item.name ? "" : ","} </span>)}</span>
                </Typography.Text>
                <Typography.Text>
                  <span>Languages:</span> <span>{country?.languages?.map(item => <span key={item.name}>{item.name}{country?.languages[country?.languages.length - 1].name == item.name ? "" : ","} </span>)}</span>
                </Typography.Text>
              </List>
            </div>
            <div className="border-countries">
              <p>Border Countries:</p> <div>{country?.borders?.length > 0 ? country?.borders?.map(item => <span onClick={() => navigateToCountry(item)} className='border-country' key={item}>{item}</span>) : <span className='border-country'>No border countries</span>}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
