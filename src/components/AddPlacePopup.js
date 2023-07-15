import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard, isDataLoad }) {

    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');


    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        //* Передаём значения управляемых компонентов во внешний обработчик
        onAddCard({
            name: placeName,
            link: placeLink,
        });
    }

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="newCard"
            id="addCard"
            title="Новое место"
            submitText={isDataLoad ? 'Добавляем...' : 'Добавить карточку'}
        >
            <label className="popup__form-field">
                <input
                    value={placeName} onChange={handleChangePlaceName}
                    name="placeName"
                    className="popup__input"
                    id="popup__placeName-input"
                    required
                    minLength="1"
                    maxLength="30"
                    placeholder="Название карточки"
                    type="text"
                />
                <span
                    id="popup__placeName-input-error"
                    className="popup__input-error"
                ></span>
            </label>
            <label className="popup__form-field">
                <input
                    value={placeLink} onChange={handleChangePlaceLink}
                    name="placeLink"
                    className="popup__input"
                    id="popup__placeLink-input"
                    required
                    placeholder="Ссылка на картинку"
                    type="url"
                />
                <span
                    id="popup__placeLink-input-error"
                    className="popup__input-error"
                ></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;