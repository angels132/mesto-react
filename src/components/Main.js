import React from "react";
import api from "../utils/api";
import Card from "./Card";

function Main(props) {
  const [userAvatar, setUserAvatar] = React.useState('#');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  const {onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete} = props;

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit">
          <img
            className="profile__avatar"
            title="Аватар профиля"
            src={userAvatar}
            alt="Аватар"
          />
          <button
            title="Загрузить новый аватар"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 id="profile__name" className="profile__name">
            {userName}
          </h1>
          <p id="profile__job" className="profile__job">
            {userDescription}
          </p>
          <button
            type="button"
            title="Редактировать профиль"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          title="Добавить новую фотографию"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              likeCounter={card.likes.length}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
