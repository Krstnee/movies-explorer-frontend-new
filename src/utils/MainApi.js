import { MY_URL } from "./constans";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}


export function authorise(email, password) {
  return fetch(`${MY_URL}/signin`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password})
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
}

export function checkTok(token) {
  return fetch(`${MY_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(checkResponse)
}

export function register(name, email, password) {
  return fetch(`${MY_URL}/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name, email, password})
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
}

export function updateProfile(name, email) {
  const token = localStorage.getItem("token");
  return fetch(`${MY_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({name, email})
  })
    .then(checkResponse)
}

export function deleteMovie(id) {
  const token = localStorage.getItem("token");
  return fetch(`${MY_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(checkResponse)
    .then((res) => {
      return res;
    })
}

export function saveMovie(movie) {
  const token = localStorage.getItem("token");
  return fetch(`${MY_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      country: movie.country ?? 'country',
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink ?? `https://www.youtube.com/results?search_query=трейлер+${movie.nameRU}`,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
    })
  })
    .then(checkResponse)
}

export function getAllSavedMovies() {
  const token = localStorage.getItem("token");
  return fetch(`${MY_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(checkResponse);
}