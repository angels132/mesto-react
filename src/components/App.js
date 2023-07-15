import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from "./ConfirmDeletePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isCardDelete, setIsCardDelete] = React.useState(false);
  const [isDataLoad, setIsDataLoad] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {},
  });
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({
    element: {}
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => { setCurrentUser(res); })
      .catch(err => { console.log(err); })
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch(err => { console.log(err) });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleDeleteButtonClick(card) {
    setIsCardDelete(!isCardDelete);
    setSelectedCardDelete(card);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsCardDelete(false)
    setSelectedCard({ ...selectedCard, isOpen: false });
    setSelectedCardDelete({})
    setIsDataLoad(false)
  }

  function handleCardLike(card) {
    //* Снова проверяем, есть ли уже лайк на данной карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //* Отправляем запрос в API и получаем обновлённые данные карточки

    api.changeCardLike(card._id, isLiked).then((newCard) => {
      //* Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      //* Обновляем стейт
      setCards(newCards);
    })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser(newUserData) {
    setIsDataLoad(true);
    api.editProfile(newUserData)
      .then(res => { setCurrentUser(res); closeAllPopups() })
      .catch(err => { console.log(err) })
      .finally(() => { setIsDataLoad(false) });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsDataLoad(true);
    api.editAvatar(newAvatar)
      .then(res => { setCurrentUser(res); closeAllPopups() })
      .catch(err => { console.log(err) })
      .finally(() => { setIsDataLoad(false) });
  }

  function handleAddPlaceSubmit(newCard) {
    setIsDataLoad(true);
    api.addNewCard(newCard).then((res) => {
      setCards([res, ...cards]); closeAllPopups()
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { setIsDataLoad(false) });
  }

  function handleCardDelete(card) {
    setIsDataLoad(true);
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(newCard => newCard._id !== card._id)
      //* Обновляем стейт
      setCards(newCards);
      closeAllPopups()
    })
      .catch(err => {
        console.log(err);
      })
      .finally(() => { setIsDataLoad(false) });
  }

  return (
    <div className="App">
      <div className="page">
        <div className="page__container">
          <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteButtonClick}
              onCardLike={handleCardLike}
              cards={cards}
            />
            <EditProfilePopup isDataLoad={isDataLoad} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <AddPlacePopup isDataLoad={isDataLoad} onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <EditAvatarPopup isDataLoad={isDataLoad} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <ConfirmDeletePopup card={selectedCardDelete} isDataLoad={isDataLoad} onDeleteCard={handleCardDelete} isOpen={isCardDelete} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <Footer />
          </CurrentUserContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
