import React from 'react'

import "./header.scss";

export const Header = () => {

  const handleDev = (e) => {
    e.preventDefault();
    alert('Функция в разработке');
  }

  return (
    <div className='header'>
      <div className='title'>JobSense</div>
      <div className="auth-container">
        <button onClick={handleDev}>Вход</button>
        <button onClick={handleDev}>Регистрация</button>
      </div>
    </div>
  )
}

