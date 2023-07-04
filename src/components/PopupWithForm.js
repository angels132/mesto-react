import React from "react";

function PopupWithForm(props) {

  const {id, isOpen, name, children, title, onClose} = props;

  return (
    <div id={id} className={`popup ${isOpen && 'popup_opened'}`}>
      <form name={name} className="popup__form" noValidate>
        <fieldset className="popup__set">
          <p className="popup__title">{title}</p>
          {children}
          <button type="submit" className="popup__button">
            Сохранить
          </button>
        </fieldset>
        <button type="button" onClick={onClose} className="popup__close-button"></button>
      </form>
      <div onClick={onClose} className="popup__overlay"></div>
    </div>
  );
}

export default PopupWithForm;
