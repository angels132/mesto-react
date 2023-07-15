import React from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isDataLoad }) {
    const [profileName, setProfileName] = React.useState('');
    const [profileDescription, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    const { name, about } = currentUser;

    function handleChangeName(e) {
        setProfileName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        //* Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: profileName,
            about: profileDescription,
        });
    }

    React.useEffect(() => {
        setProfileName(name);
        setDescription(about);
    }, [currentUser, about, name]);

    return (
        <PopupWithForm
            name="profile"
            id="editProfile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={isDataLoad ? 'Сохраняем...' : 'Сохранить профиль'}
        >
            <label className="popup__form-field">
                <input
                    value={profileName || ''} onChange={handleChangeName}
                    name="name"
                    placeholder="Имя"
                    required
                    maxLength="40"
                    className="popup__input"
                    id="popup__name-input"
                    type="text"
                />
                <span
                    id="popup__name-input-error"
                    className="popup__input-error"
                ></span>
            </label>
            <label className="popup__form-field">
                <input
                    value={profileDescription || ''} onChange={handleChangeDescription}
                    name="job"
                    placeholder="Профессия"
                    required
                    maxLength="200"
                    className="popup__input"
                    id="popup__job-input"
                    type="text"
                />
                <span
                    id="popup__job-input-error"
                    className="popup__input-error"
                ></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;