import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";
import SavedMovies from "../SavedMovies/SavedMovies";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggIn] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loader, setLoader] = useState(false); 
  const [keywordForSavedMovies, setKeywordForSavedMovies] = useState("");
  const [moviesFetched, setMoviesFetched] = useState(false); 
  const [searchFailed, setSearchFailed] = useState(false); 
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [errorOfLogin, setErrorLog] = useState("");
  const [isLoading, setLoad] = useState(true);
  const [isShortMovies, setIsShortMovies] = useState(false); 
  const [currentUser, setCurUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [keyword, setKeyword] = useState(""); 
  const [errorOfRegister, setErrorReg] = useState("");
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [savedMoviesFetched, setSavedMoviesFetched] = useState(false);
  const [resultOfEdit, setResultOfEdit] = useState("");
  const nav = useNavigate();


  function registerHandle(name, email, password) {
    setLoad(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res.data) {
          loginHandle(email, password);
          setErrorReg("");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err.status}`);
        err.status === 409
         ? setErrorReg("Пользователь с таким email уже существует")
         : setErrorReg("При регистрации пользователя произошла ошибка")
      })
      .finally(() => setLoad(false))
  }


  function checkTok() {
    const token = localStorage.getItem("token");
    if (token) {
      return mainApi.checkTok(token)
        .then((userInfo) => {
          if (userInfo) {
            setLoggIn(true);
            setCurUser(userInfo);
            setLoad(false);
            return true;
          } else {
            localStorage.removeItem("token");
            setLoad(false);
            return false;
          }
        })
        .catch(err => console.log(`Ошибка ${err.status}`));
    } else {
      setLoad(false);
    }
  }



  function loginHandle(email, password) {
    setLoad(true);
    mainApi.authorise(email, password)
      .then((data) => {
        if (data.token) {
          checkTok().then((res) => {
            if (res) {
              nav("/movies");
            }
          });
          setErrorLog("")
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
        if (err.status === 401) {
          setErrorLog("Неправильный логин или пароль");
        } else if (err.status === 400) {
          setErrorLog("Токен не передан или передан не в том формате");
        } else if (err.status === 403) {
          setErrorLog("Переданный токен некорректен");
        }
      })
      .finally(() => setLoad(false))
  }

  function handleSignOut() {
    setLoggIn(false);

    setCurUser({});
    localStorage.clear();

    nav("/");
  }


  function profileUpHandle(name, email) {
    setLoad(true);
    mainApi.updateProfile(name,email)
      .then((userInfo) => {
        setCurUser(userInfo);
        setResultOfEdit("Данные успешно изменены");
        setTimeout(() => {setLoad(false)}, 700);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err.status}`);
        err.status === 409
          ? setResultOfEdit("Пользователь с таким email уже существует")
          : setResultOfEdit("При обновлении произошла ошибка")
      })
      .finally(()=> setTimeout(() => {setResultOfEdit("")}, 2000))
  }
  function shortSavedMovHandle() { 
    setIsShortSavedMovies(!isShortSavedMovies);
  }

  function shortMovHandle() { 
    setIsShortMovies(!isShortMovies);
  }




  function handleSearchSavedMovie(keywordForSavedMovies) {
    setKeywordForSavedMovies(keywordForSavedMovies);
  }

  function handleSaveMovie(movie) {
    mainApi.saveMovie(movie)
      .then(newMovie => setSavedMovies([newMovie, ...savedMovies])) 
      .catch((err) => console.log(`Ошибка: ${err.status}`))
  }

  function handleSearchMovie(keyword) {
    moviesApi
      .getAllMovies()
      .then((movies) => {
        setLoader(true); 
        setAllMovies(movies);
        localStorage.setItem("allMovies", JSON.stringify(movies));
        setKeyword(keyword);
        setMoviesFetched(true); 
      })
      .catch((err) => {
        setSearchFailed(true);
        console.log(`Ошибка: ${err.status}`);
      })
      .finally(() => setTimeout(() => setLoader(false), 800))
  }


  function handleDeleteMovie(id) {
    mainApi.deleteMovie(id)
      .then(() => {
        const newSavedMovies = savedMovies.filter(savedMovie => id !== savedMovie._id);
        setSavedMovies(newSavedMovies); 
      })
      .catch((err) => console.log(`Ошибка: ${err.status}`))
  }

  function handleOpenSavedMovies() { 
    setIsShortSavedMovies(false);
    setKeywordForSavedMovies("");
  }

  useEffect(() => {
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")) || []); 
    setIsShortMovies(localStorage.getItem("checkbox") === "true"); 
    setKeyword(localStorage.getItem("keyword") || "");
    setAllMovies(JSON.parse(localStorage.getItem("allMovies")) || []);
  }, []);

  useEffect(() => {
    checkTok();
    if (loggedIn) {
      mainApi.getAllSavedMovies()
        .then(movies => {
          setSavedMovies(movies);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
    const lowerCaseKeyword = keyword.toLowerCase();
    let filteredMovies = allMovies.filter(
      movie => movie.nameRU.toLowerCase().includes(lowerCaseKeyword)
    );
    if (isShortMovies) {
      filteredMovies = filteredMovies.filter(movie => movie.duration <= 40);
    }
    setFilteredMovies(filteredMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies)); 
    localStorage.setItem("keyword", keyword);
    localStorage.setItem("checkbox", (isShortMovies).toString()); 
  }, [allMovies, keyword, isShortMovies, loggedIn]);

  useEffect(() => {
    if (!loggedIn) return;
    const lowerCaseKeyword = keywordForSavedMovies.toLowerCase();
    let filteredSavedMovies = savedMovies.filter(
      savedMovie => savedMovie.nameRU.toLowerCase().includes(lowerCaseKeyword)
    );
    if (isShortSavedMovies) {
      filteredSavedMovies = filteredSavedMovies.filter(
        movie => movie.duration <= 40
      );
    }
    setFilteredSavedMovies(filteredSavedMovies);
    setSavedMoviesFetched(true);
  }, [savedMovies, keywordForSavedMovies, isShortSavedMovies, loggedIn]);

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        {isLoading ? (
          <Preloader/>
        ) : (
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} openSavedMovies={handleOpenSavedMovies}/>}/>
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    loggedIn={loggedIn}
                    searchMovie={handleSearchMovie}
                    isErrorOfSearch={searchFailed}
                    chooseShortMovies={shortMovHandle}
                    movies={filteredMovies}
                    isShortMovies={isShortMovies}
                    saveMovie={handleSaveMovie}
                    moviesFetched={moviesFetched}
                    deleteMovie={handleDeleteMovie}
                    savedMovies={savedMovies}
                    loader={loader}
                    openSavedMovies={handleOpenSavedMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    loggedIn={loggedIn}
                    savedMovies={savedMovies}
                    isShortMovies={isShortSavedMovies}
                    deleteMovie={handleDeleteMovie}
                    searchSavedMovie={handleSearchSavedMovie}
                    savedMoviesFetched={savedMoviesFetched}
                    openSavedMovies={handleOpenSavedMovies}
                    filteredSavedMovies={filteredSavedMovies}
                    chooseShortMovies={shortSavedMovHandle}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  {currentUser && (
                    <Profile
                      loggedIn={loggedIn}
                      onUpdateUser={profileUpHandle}
                      resultOfEdit={resultOfEdit}
                      onSignOut={handleSignOut}
                      openSavedMovies={handleOpenSavedMovies}
                    />
                    )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  name="Виталий"
                  email="pochta@yandex.ru"
                  onLogin={loginHandle}
                  errorOfLogin={errorOfLogin}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  name="Виталий"
                  email="pochta@yandex.ru"
                  onRegister={registerHandle}
                  errorOfRegister={errorOfRegister}
                />
              }
            />
            <Route path="/*" element={<PageNotFound/>}/>
          </Routes>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;