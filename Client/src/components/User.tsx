import React, { useState } from 'react'
import '../styles/user.css'

interface UserData {
  username: string
  email: string
  phone: string
  password: string
}

export default function User() {
  const [userData, setUserData] = useState<UserData>({
    username: 'ivan_ivanov',
    email: 'ivan@example.com',
    phone: '+375 (29) 123-45-67',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!userData.username.trim()) newErrors.username = 'Имя пользователя обязательно'
    if (userData.password && userData.password.length < 6)
      newErrors.password = 'Пароль должен быть не менее 6 символов'
    if (!userData.email.trim()) newErrors.email = 'Электронная почта обязательна'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      newErrors.email = 'Введите корректный email'
    if (!userData.phone.trim()) newErrors.phone = 'Номер телефона обязателен'
    else if (
      !/^\+375\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(userData.phone.trim())
    )
      newErrors.phone = 'Введите корректный белорусский номер телефона'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    alert('Данные успешно сохранены!')
    setEditMode(false)
    setUserData((prev) => ({ ...prev, password: '' }))
  }

  const handleCancel = () => {
    setEditMode(false)
    setErrors({})
    setUserData((prev) => ({ ...prev, password: '' }))
  }

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    setShowLogoutConfirm(false)
    // Здесь добавьте логику выхода, например очистку сессии и редирект
    alert('Вы вышли из аккаунта')
  }

  const cancelLogout = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <div className="user-container">
      <h1>Личный кабинет</h1>

      {!editMode ? (
        <>
          <div className="user-info">
            <div className="info-row">
              <span className="label">Имя пользователя:</span>
              <span className="value">{userData.username}</span>
            </div>
            <div className="info-row">
              <span className="label">Электронная почта:</span>
              <span className="value">{userData.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Номер телефона:</span>
              <span className="value">{userData.phone}</span>
            </div>
            <div className="info-row">
              <span className="label">Пароль:</span>
              <span className="value">••••••••</span>
            </div>

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Редактировать профиль
            </button>
            <button className="logout-btn" onClick={handleLogoutClick}>
              Выйти
            </button>
          </div>

          {showLogoutConfirm && (
            <div className="logout-confirm-overlay" role="dialog" aria-modal="true" aria-labelledby="logout-title">
              <div className="logout-confirm-box">
                <h2 id="logout-title">Подтверждение выхода</h2>
                <p>Вы уверены, что хотите выйти из аккаунта?</p>
                <div className="logout-buttons">
                  <button className="btn-confirm" onClick={confirmLogout}>
                    Да
                  </button>
                  <button className="btn-cancel" onClick={cancelLogout}>
                    Нет
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <form className="user-form" onSubmit={handleSave} noValidate>
          <label htmlFor="username">Имя пользователя</label>
          <input
            id="username"
            type="text"
            value={userData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            placeholder="Введите имя пользователя"
            aria-invalid={!!errors.username}
            aria-describedby="username-error"
          />
          {errors.username && (
            <span className="error" id="username-error">
              {errors.username}
            </span>
          )}

          <label htmlFor="email">Электронная почта</label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="example@mail.com"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
          />
          {errors.email && (
            <span className="error" id="email-error">
              {errors.email}
            </span>
          )}

          <label htmlFor="phone">Номер телефона</label>
          <input
            id="phone"
            type="tel"
            value={userData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+375 (29) 123-45-67"
            pattern="\+375\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}"
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
          />
          {errors.phone && (
            <span className="error" id="phone-error">
              {errors.phone}
            </span>
          )}

          <label htmlFor="password">Новый пароль</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={userData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Введите новый пароль"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && (
            <span className="error" id="password-error">
              {errors.password}
            </span>
          )}

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              Сохранить
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Отмена
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
