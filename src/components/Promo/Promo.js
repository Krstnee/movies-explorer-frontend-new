import React from "react";
import "./Promo.css";
import abc from "../../images/big_logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__dev">
        <div className="promo__info">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        </div>
        <img alt="Логотип планеты" src={ abc } className="promo__image"/>
      </div>
    </section>
  );
}

export default Promo;