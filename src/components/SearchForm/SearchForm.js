import React, {useState, useEffect} from "react";
import "./SearchForm.css";
import Checkbox from "../Checkbox/Checkbox";

function SearchForm(props) {
  const [keyword, setKeyword] = useState("");
  const [errText, setErrText] = useState("");
  const pathName = window.location.pathname;

  useEffect(() => {
    if (pathName === "/movies") {
      setKeyword(localStorage.getItem("keyword"));
    }
  }, [])

  function handleChange(evt) {
    setKeyword(evt.target.value);
    const isValid = evt.target.closest("form").checkValidity();
    if (isValid) {
      setErrText("");
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const isValid = evt.target.closest("form").checkValidity();
    if (!isValid) {
      setErrText("Нужно ввести ключевое слово");
      return;
    }
    props.onSubmit(keyword);
  }

  return (
    <section className="search-form">
      <div className="search-form__dev">
        <form className="search-form__form" onSubmit={ handleSubmit } noValidate>
         
            <input
              className="search-form__input"
              type="text"
              minLength="1"
              maxLength="30"
              placeholder="Фильм"
              value={keyword || ""}
              onChange={ handleChange }
              required
              name="keyword"
            />
            <button className="search-form__btn" type="submit" aria-label="Найти фильм"/>
        </form>
        <span className="search-form__input-err keyword-input-err">{ errText }</span>
        <Checkbox chooseShortMovies={props.chooseShortMovies} isShortMovies={props.isShortMovies}/>
      </div>
    </section>
  );
}

export default SearchForm;