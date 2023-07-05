import React, { useRef, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register(props) {
  const formRef = useRef();
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [passError, setPassError] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);


  function changeNameHandle(evt) {
    setName(evt.target.value);
    if (evt.target.validity.valid) {
      setNameError("");
    } else {
      setNameError("Минимум - 2 символа, максимум - 40");
    }
    validForm();
  }

  function validForm() {
    const formTag = formRef.current;
    if (formTag.checkValidity()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  function changeEmailHandle(evt) {
    setEmail(evt.target.value);
    if (evt.target.validity.valid) {
      setEmailError("");
    } else {
      setEmailError("Введён некорректный e-mail");
    }
    validForm();
  }

  function handleChangePass(evt) {
    setPass(evt.target.value);
    if (evt.target.validity.valid) {
      setPassError("");
    } else {
      setPassError("Минимум - 8 символов, максимум - 30");
    }
    validForm();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(name, email, pass);
    setName("")
    setEmail("");
    setPass("");
  }

  return (
    <main className="register">
      <div className="register__dev">
        <form className="register__form" noValidate onSubmit={ handleSubmit } ref={ formRef }>
          <Link className="register__btn register__btn_logo" to="/">
            <img alt="Логотип" src={ logo } className="register__logo"/>
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
          <fieldset className="register__info">
            <div className="register__input-dev">
              <label className="register__label">Имя</label>
              <input
                className="register__input register__input_name-user"
                type="text"
                id="nameUser-input"
                required
                minLength="2"
                maxLength="40"
                name="nameUser"
                value={name || ""}
                onChange={changeNameHandle}
              />
              <span className="register__input-error nameUser-input-error">{ nameError }</span>
            </div>
            <div className="register__input-dev">
              <label className="register__label">E-mail</label>
              <input
                className="register__input register__input_email-user"
                type="email" id="emailUser-input"
                required
                minLength="2"
                maxLength="40"
                name="emailUser"
                value={email || ""}
                onChange={changeEmailHandle}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
              />
              <span className="register__input-error emailUser-input-error">{ emailError }</span>
            </div>
            <div className="register__input-dev">
              <label className="register__label">Пароль</label>
              <input
                className="register__input register__input_password-user"
                type="password"
                id="passwordUser-input"
                required
                minLength="8"
                maxLength="40"
                name="passwordUser"
                value={pass || ""}
                onChange={handleChangePass}
              />
              <span className="register__input-error passwordUser-input-error">{ passError }</span>
            </div>
          </fieldset>
          <div className="register__btn-error">
            <p className="register__error-text">{props.errorOfRegister}</p>
          </div>
          <button
            className="register__btn register__btn_signup"
            type="submit"
            aria-label="Зарегистрироваться"
            disabled={ isDisabled }>
            Зарегистрироваться
          </button>
          <h3 className="register__text-register">Уже зарегистрированы?
            <Link className="register__btn register__btn_text-register" to="/signin">Войти</Link>
          </h3>
        </form>
      </div>
    </main>
  );
}

export default Register;