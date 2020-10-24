import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

import "./Search.css";

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState("");

  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const query =
      filter.length === 0 ? "" : `?orderBy="title"&equalTo="${filter}"`;
    const firebaseURL = process.env.REACT_APP_FIREBASE_DB_URL;
    sendRequest(firebaseURL + "/ingredients.json" + query, "GET");
  }, [filter, sendRequest]);

  useEffect(() => {
    if (isLoading || error) return;
    const loadedIngredients = [];
    for (const key in data) {
      loadedIngredients.push({
        id: key,
        title: data[key].title,
        amount: data[key].amount
      });
    }
    onLoadIngredients(loadedIngredients);
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className='search'>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            type='text'
            value={filter}
            onChange={event => setFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
