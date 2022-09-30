import React, { useContext } from 'react';
import { useState, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import validator from 'validator';
import { showAlert } from '../../utils/alert';

const AccountSettings = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [currentPhoto, setCurrentPhoto] = useState(user?.photo);
  const [photoNameUpload, setPhotoNameUpload] = useState('');
  const photoFileRef = useRef(null);
  const prevPhoto = useRef(null);

  const handleFormAccountSettings = async (e) => {
    e.preventDefault();

    const photoFile = photoFileRef.current.files[0];

    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('prevPhoto', prevPhoto.current.value);
    form.append('photo', photoFile);

    if (user?.name === name && user?.email === email && !photoFile) {
      showAlert('success', 'No Data changes');
    } else if (!validator.isEmail(email) || !email) {
      showAlert('error', 'Invalid Email Address');
    } else {
      try {
        const res = await axios({
          method: 'PATCH',
          url: `/api/v1/users/updateMe`,
          data: form,
        });
        console.log(res.data.data.user);
        setUser(res.data.data.user);
        setCurrentPhoto(res.data.data.user.photo);
        setPhotoNameUpload('');
        if (photoFile) {
          prevPhoto.current.value = '';
        }
        if (res.status === 200) {
          showAlert('success', 'Successfully changed you data!');
        }
      } catch (err) {
        console.log(err.response.data.message);
        showAlert('error', err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data">
          <div className="form__group">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input"
              id="name"
              type="text"
              required="required"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              className="form__input"
              id="email"
              type="email"
              value={email}
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-md">
            <input
              className="form__input"
              id="prevPhoto"
              name="prevPhoto"
              type="hidden"
              value={currentPhoto}
              ref={prevPhoto}
            />
          </div>
          <div className="form__group form__photo-upload">
            <img
              className="form__user-photo"
              src={`${process.env.REACT_APP_BACKEND_URL_ENDPOINT}/img/users/${user?.photo}`}
              alt={`${user?.name}`}
            />
            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={(e) => setPhotoNameUpload(e.target.files[0]?.name)}
              ref={photoFileRef}
            />
            <label htmlFor="photo">Choose new photo</label>
            <label style={{ marginLeft: '2rem' }}>{photoNameUpload}</label>
          </div>
          <div className="form__group right">
            <button
              className="btn btn--small btn--green"
              onClick={handleFormAccountSettings}
            >
              Save settings
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountSettings;
