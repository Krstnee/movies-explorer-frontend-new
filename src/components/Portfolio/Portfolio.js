import React from "react";
import "./Portfolio.css";
import strel from "../../images/strelka.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__dev">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__links">
            <a className="portfolio__link" href="https://github.com/Krstnee/how-to-learn" target="_blank" rel="noreferrer">
              <p className="portfolio__text">Статичный сайт</p>
              <img className="portfolio__str" alt="Изображение стрелки" src={ strel }/>
            </a>
          </li>
          <li className="portfolio__links">
            <a className="portfolio__link" rel="noreferrer" href="https://github.com/Krstnee/russian-travel" target="_blank" >
              <p className="portfolio__text">Адаптивный сайт</p>
              <img className="portfolio__str" alt="Изображение стрелки" src={ strel }/>
            </a>
          </li>
          <li className="portfolio__links">
            <a className="portfolio__link" href="https://github.com/Krstnee/react-mesto-api-full" rel="noreferrer" target="_blank" >
              <p className="portfolio__text">Одностраничное приложение</p>
              <img className="portfolio__str" alt="Изображение стрелки" src={ strel }/>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;