import React, { useEffect, useState } from 'react';

import getInfoApi from '../services/fetch/api';

import './Home.css';

function Home() {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [targetId, setTargetId] = useState(0);

  const handleClick = async () => {
    const getData = await getInfoApi(inputSearch || 'cat');
    return setData(getData.response.results);
  };

  useEffect(() => {
    async function getInfo() {
      const getData = await getInfoApi('cat');
      return setData(getData.response.results);
    }
    getInfo();
  }, []);

  const teste = (id) => (id === targetId ? 'active' : '');

  return (
    <section className="container">
      <section className="search__container">
        <label htmlFor="input-search">
          <input
            type="text"
            id="input-search"
            value={inputSearch}
            onChange={({ target }) => setInputSearch(target.value)}
          />
        </label>
        <button type="button" onClick={() => handleClick()}>
          Search
        </button>
      </section>
      <section className="images__container">
        {data !== undefined &&
          data.length > 0 &&
          data.map((item, id) => (
            <div key={item.id} className="panel">
              <img
                className={`panel ${teste(id)}`}
                src={item.urls.full}
                alt={item.alt_description}
              />
              <h3>{item.alt_description}</h3>
            </div>
          ))}
      </section>
    </section>
  );
}

export default Home;
