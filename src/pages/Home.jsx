import React, { useState } from 'react';

import getInfoApi from '../services/fetch/api';

function Home() {
  const [data, setData] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  const handleClick = async () => {
    const getData = await getInfoApi(inputSearch || 'cat');
    return setData(getData.response.results);
  };

  console.log(data);

  return (
    <>
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
      {data !== undefined &&
        data.length > 0 &&
        data.map((item) => (
          <img src={item.urls.full} alt={item.urls.alt_description} />
        ))}
    </>
  );
}

export default Home;
