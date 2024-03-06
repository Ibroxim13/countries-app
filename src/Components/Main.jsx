import { Layout, Input, Card, Typography, List } from 'antd'
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { UseMainContext } from '../Context/Context';
import { Link } from 'react-router-dom';

export default function Main() {
  const [countries, setCountries, selected, setSelected, filteredCountries, , regionCountries, setRegionCountries] = UseMainContext()

  const handleFilter = event => {
    const item = event.target.value;

    const filteredCountr = item === "All" ? filteredCountries : filteredCountries.filter((country) =>
      country.region.toLowerCase() === item.toLowerCase()
    );

    setRegionCountries(filteredCountr)
    setCountries(filteredCountr);
    setSelected(item)
  };

  const handleSearch = event => {
    const item = event.target.value;
    let filteredCountr;
    if (selected.length > 0) {
      if (selected === "All") {
        filteredCountr = filteredCountries.filter((country) =>
          country.name.toLowerCase().includes(item.toLowerCase())
        );
      } else {
        filteredCountr = regionCountries.filter((country) =>
          country.name.toLowerCase().includes(item.toLowerCase())
        );
      }
    } else {
      filteredCountr = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(item.toLowerCase())
      );
    }

    setCountries(filteredCountr);
  }

  return (
    <Layout.Content className='content'>
      <div className="container">
        <main>
          <div className="search-box">
            <Input onChange={handleSearch} size="large" placeholder="Search for a country..." prefix={<IoIosSearch />} />
          </div>
          <div className="filter-box">
            <select value={selected} onChange={handleFilter}>
              <option disabled={true} value={''}>Filter by Region</option>
              <option>All</option>
              <option>Africa</option>
              <option>Americas</option>
              <option>Asia</option>
              <option>Europe</option>
              <option>Oceania</option>
            </select>
          </div>
        </main>
        <section className='cards'>
          {
            countries?.map(country =>
              <Link key={country.name} to={`/country/:${country.alpha3Code}`}>
                <Card className='card'>
                  <img src={country.flag} alt={country.name.toLowerCase()} />
                  <div className="card-body">
                    <Typography.Title level={4}>{country.name}</Typography.Title>
                    <List>
                      <Typography.Text>
                        <span>Population:</span> <span>{country.population.toLocaleString('en-US')}</span>
                      </Typography.Text>
                      <Typography.Text>
                        <span>Region:</span> <span>{country.region}</span>
                      </Typography.Text>
                      <Typography.Text>
                        <span>Capital:</span> <span>{country.capital ? country.capital : "no capital"}</span>
                      </Typography.Text>
                    </List>
                  </div>
                </Card>
              </Link>
            )
          }
        </section>
      </div>
    </Layout.Content>
  )
}
