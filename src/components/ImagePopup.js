import React from "react";

function ImagePopup(props) {

  const {card, onClose} = props;

  return (
    <div className={`popup ${card.isOpen && 'popup_opened'}`}>
      <div className="popup__fullScreen">
        <div className="popup__image-desription">
          <img
            className="popup__image"
            src={`${card.element.link}`} 
            alt={card.element.name}
          />
          <p className="popup__image-subtitle">{card.element.name}</p>
          <button type="button" onClick={onClose} className="popup__close-button"></button>
        </div>
      </div>
      <div onClick={onClose} className="popup__overlay"></div>
    </div>
  );
}

export default ImagePopup;
