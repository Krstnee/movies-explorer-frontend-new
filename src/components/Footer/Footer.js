import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__dev">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__info">
          <p className="footer__year">&#169; 2023</p>
          <ul className="footer__list">
            <li className="footer__item">
              <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link"  rel="noreferrer" href="https://github.com/Krstnee" target="_blank" >Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" rel="noreferrer" href="https://t.me/Krstnee" target="_blank" >Telegram</a>
            </li>
          </ul>
        </div>
      </div>
      </footer>
  );
}

export default Footer;
