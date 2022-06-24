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

  useEffect(() => {
    const panels = document.querySelectorAll('.panel');
    function removeActiveClasses() {
      panels.forEach((panel) => {
        panel.classList.remove('active');
      });
    }
    panels.forEach((panel) => {
      panel.addEventListener('click', () => {
        removeActiveClasses();
        panel.classList.add('active');
      });
    });
  }, [data]);

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
          data.slice(0, 5).map((item, id) => (
            <div
              className={`panel ${teste(id)}`}
              style={{ backgroundImage: `url(${item.urls.full})` }}
            >
              <h3>{item.alt_description}</h3>
            </div>
          ))}
      </section>
    </section>
  );
}

export default Home;
