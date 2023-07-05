import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__dev">
        <h2 className="about-project__header">О проекте</h2>
        <ul className="about-project__list">
          <li className="about-project__list-item">
            <h3 className="about-project__list-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__list-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className="about-project__list-item">
            <h3 className="about-project__list-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__list-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__dev-table">
          <div className="about-project__dev-back">
            <p className="about-project__dev-table-title about-project__dev-title_back">1 неделя</p>
            <p className="about-project__dev-desc">Back-end</p>
          </div>
          <div className="about-project__dev-front">
            <p className="about-project__dev-table-title about-project__dev-title_front">4 недели</p>
            <p className="about-project__dev-desc">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;