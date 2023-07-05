import React from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  return (
    <>
      <Header 
      theme={"header_theme_dark"} 
      loggedIn={props.loggedIn} 
      openSavedMovies={props.openSavedMovies}/>
      <main className="movies">
        <SearchForm
          onSubmit={props.searchMovie}
          isShortMovies={props.isShortMovies}
          chooseShortMovies={props.chooseShortMovies}
        />
        {props.loader ? (
          <Preloader/>
        ) : (
          <MoviesCardList
            movies={props.movies}
            saveMovie={props.saveMovie}
            moviesFetched={props.moviesFetched}
            deleteMovie={props.deleteMovie}
            searchFailed={props.searchFailed}
            savedMovies={props.savedMovies}
          />
        )}
      </main>
      <Footer/>
    </>
  );
}

export default Movies;