import React from "react";
import "./AboutMe.css";
import photo from "../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__dev">
        <h2 className="about-me__job">Студент</h2>
        <div className="about-me__info_dev">
          <div className="about-me__info">
            <h3 className="about-me__name">Кристина</h3>
            <p className="about-me__desc">Фронтенд-разработчик, 20 лет</p>
            <p className="about-me__about">Я живу в г. Москве, учусь в Финансовом университете при правительстве РФ, на направлении прикладной информатики.
            Я всегда была увлечена программированием, и поэтому поступила в Яндекс.Практикум. После окончания обучения планирую
            дальше развиваться в профессии веб-разработчика.</p>
            <ul className="about-me__list">
              <li className="about-me__item">
                <a rel="noreferrer" className="about-me__link" href="https://github.com/Krstnee">Github</a>
              </li>
              <li className="about-me__item">
                <a className="about-me__link" rel="noreferrer" href="https://t.me/Krstnee">Telegram</a>
              </li>
            </ul>
          </div>
          <img className="about-me__img" alt="Фотография студента" src={ photo }/>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;