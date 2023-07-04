import React from "react";

function Card(props) {
  const { card, likeCounter, onCardClick, onCardDelete } = props;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="elements__list-item">
      <img
        src={card.link}
        className="elements__picture"
        title="Посмотреть фотографию"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="elements__container">
        <h2 className="elements__text">{card.name}</h2>
        <button
          type="button"
          title="Удалить карточку"
          className="elements__delete-button"
          onClick={onCardDelete}
        ></button>
        <div className="elements__like-container">
          <button type="button" className="elements__like-button"></button>
          <span className="elements__like-counter">{likeCounter}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
