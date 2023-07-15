import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isDataLoad }) {

    const avatarRef = React.useRef(); //* записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar(
            avatarRef.current.value,
        );
    }

    return (
        <PopupWithForm
            name="updateAvatar"
            id="update"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={isDataLoad ? 'Обновляем...' : 'Обновить'}
        >
            <label className="popup__form-field">
                <input
                    ref={avatarRef}
                    name="avatar"
                    className="popup__input"
                    id="popup__avatarLink-input"
                    required
                    placeholder="Ссылка на изображение"
                    type="url"
                />
                <span
                    id="popup__avatarLink-input-error"
                    className="popup__input-error"
                ></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;