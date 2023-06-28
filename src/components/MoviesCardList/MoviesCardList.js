import React, {useEffect, useState} from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const pathName = window.location.pathname;
  const [cardsPerRow, setCardsPerRow] = useState(0);
  const [displMov, setDisplMov] = useState(0);
  const cardLikeButtonClassName = "movies-card__button movies-card__button_like";
  const cardDeleteButtonClassName = "movies-card__button movies-card__button_delete";
  const cardDislikeButtonClassName = "movies-card__button movies-card__button_dislike";


  const createMoviesCards = (movie, isLiked) => <MoviesCard
    key={movie.id}
    title={movie.nameRU}
    duration={movie.duration}
    image={`https://api.nomoreparties.co${movie.image.url}`}
    button={isLiked? cardLikeButtonClassName : cardDislikeButtonClassName}
    saveMovie={props.saveMovie}
    clickOnTheButton={() => handleLikeClick(isLiked, movie)}
    movie={movie}
  />

  const cardOfSavedMovCreate = (movie) => <MoviesCard
    key={movie._id}
    title={movie.nameRU}
    duration={movie.duration}
    image={movie.image}
    clickOnTheButton={() => props.deleteMovie(movie._id)}
    movie={movie}
    button={cardDeleteButtonClassName}
  />

  function changingMovDis() {
    setDisplMov(displMov + cardsPerRow);
  }

  function calcMov() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
      setCardsPerRow(3);
      setDisplMov(12);
    } else if (windowWidth >= 723) {
      setCardsPerRow(2);
      setDisplMov(8);
    } else {
      setCardsPerRow(1);
      setDisplMov(5);
    }
  }

  function handleLikeClick(isLiked, movie) {
    if (!isLiked) {
      props.saveMovie(movie);
    } else {
      const savedMovie = props.savedMovies.find(savedMovie => savedMovie.movieId === movie.id);
      props.deleteMovie(savedMovie._id);
    }
  }

  useEffect(() => {
    calcMov();
    window.addEventListener("resize", calcMov);
  }, []);

  return (
    <section className="movies-card-list">
      <div className="movies-card-list__dev">
        {pathName === "/saved-movies" ? (
            <>
              {props.savedMoviesFetched && props.filteredSavedMovies.length === 0 && <h2 className="movies-card-list__mes">Ничего не найдено</h2>}
              <ul className="movies-card-list__list">
                {props.filteredSavedMovies.map(cardOfSavedMovCreate)}
              </ul>
            </> ) : (
          <>
            {props.moviesFetched && props.movies.length === 0 && <h2 className="movies-card-list__mes">Ничего не найдено</h2>}
            {props.searchFailed &&
              <h2 className="movies-card-list__mes">
                Во время запроса произошла ошибка.
              </h2>}
            <ul className="movies-card-list__list">
              {props.movies.slice(0, displMov).map((movie) => {
                const isLiked = props.savedMovies.some((savedMovie) => savedMovie.movieId === movie.id); 
                return createMoviesCards(movie, isLiked);
              })}
            </ul>
            {props.movies.length > displMov && <button
              className="movies-card-list__button"
              type="button"
              aria-label="Кнопка Ещё"
              onClick={changingMovDis}>Ещё</button>}
          </>
        )}
      </div>
    </section>
  );
}

export default MoviesCardList;