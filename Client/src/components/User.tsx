import React, { useState } from 'react'
import '../styles/user.css'

interface UserData {
  id: number
  name: string
  email?: string
  phone?: string
}

interface UserProps {
  user: UserData | null
  setUser: React.Dispatch<React.SetStateAction<any>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function User({ user, setUser, setIsAuthenticated, setMainContent }: UserProps) {
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!user) {
    return <div style={{ color: '#FFD700', padding: '20px' }}>Загрузка...</div>
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = 'Имя обязательно'
    if (formData.password && formData.password.length < 6)
      newErrors.password = 'Пароль должен быть не менее 6 символов'
    if (!formData.email?.trim()) newErrors.email = 'Электронная почта обязательна'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Введите корректный email'
    if (!formData.phone?.trim()) newErrors.phone = 'Номер телефона обязателен'
    else if (!/^\+375\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/.test(formData.phone.trim()))
      newErrors.phone = 'Введите корректный белорусский номер'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)

    try {
      const response = await fetch(`http://localhost:3000/users/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        alert('Данные успешно сохранены!')
        setEditMode(false)
        setFormData(prev => ({ ...prev, password: '' }))
      } else {
        const error = await response.json()
        alert('Ошибка: ' + (error.error || 'Не удалось сохранить'))
      }
    } catch (error) {
      alert('Ошибка соединения с сервером')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setErrors({})
    setFormData({
      name: user.name,
      email: user.email || '',
      phone: user.phone || '',
      password: ''
    })
  }

  const confirmLogout = async () => {
    // Очищаем корзину на сервере перед выходом
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      try {
        await fetch('http://localhost:3000/basket/clear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id })
        })
      } catch (err) {
        console.error('Ошибка очистки корзины:', err)
      }
    }
    
    setShowLogoutConfirm(false)
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('cartItems')
    alert('Вы вышли из аккаунта. Заходите ещё! 🍻')
    setMainContent('main')
  }

  return (
    <div className="user-container">
      <h1>Личный кабинет</h1>

      {!editMode ? (
        <>
          <div className="user-info">
            <div className="info-row">
              <span className="label">Имя пользователя:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Электронная почта:</span>
              <span className="value">{user.email || 'не указана'}</span>
            </div>
            <div className="info-row">
              <span className="label">Номер телефона:</span>
              <span className="value">{user.phone || 'не указан'}</span>
            </div>
            <div className="info-row">
              <span className="label">Пароль:</span>
              <span className="value">••••••••</span>
            </div>

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Редактировать профиль
            </button>
            <button className="logout-btn" onClick={() => setShowLogoutConfirm(true)}>
              Выйти
            </button>
          </div>

          {showLogoutConfirm && (
            <div className="logout-confirm-overlay">
              <div className="logout-confirm-box">
                <h2>Подтверждение выхода</h2>
                <p>Вы уверены, что хотите выйти?</p>
                <div className="logout-buttons">
                  <button className="btn-confirm" onClick={confirmLogout}>Да</button>
                  <button className="btn-cancel" onClick={() => setShowLogoutConfirm(false)}>Нет</button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <form className="user-form" onSubmit={handleSave} noValidate>
          <label>Имя пользователя</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Введите имя"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

          <label>Электронная почта</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="example@mail.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label>Номер телефона</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+375 (29) 123-45-67"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}

          <label>Новый пароль</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Оставьте пустым, если не хотите менять"
              className={errors.password ? 'error' : ''}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}

          <div className="form-buttons">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
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