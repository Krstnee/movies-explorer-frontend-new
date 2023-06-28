import React from "react";
import "./MoviesCard.css";


function MoviesCard(pr) {
  const minutes = Math.trunc(pr.duration - hours * 60);
  const hours = Math.trunc(pr.duration/60);

  return (
    <li className="movies-card">
      <a className="movies-card__link" rel="noreferrer" href={pr.movie.trailerLink} target="_blank">
        <img className="movies-card__image" 
        alt={pr.title} 
        src={pr.image}/>
      </a>
      <button
          className={pr.button}
          aria-label="удаление фильма"
          onClick={pr.clickOnTheButton}
          type="button"

          />
      <div className="movies-card__desc">
        <h3 className="movies-card__title">{pr.title}</h3>
        <p className="movies-card__duration">{hours} ч {minutes} мин</p>
      </div>
    </li>
  );
}

export default MoviesCard;