import React, { useState } from 'react'
import '../styles/regis.css'
type RegistrationProps = {
   setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}
export default function Registration({setMainContent}: RegistrationProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return
    }

    const contactValue = contactMethod === 'phone' ? phone : email

    // Здесь можно добавить логику регистрации, например, отправку на сервер
    console.log({
      username,
      password,
      contactMethod,
      contactValue,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Регистрация</h2>

      <label htmlFor="username">Имя пользователя</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder="Введите имя пользователя"
      />

      <label htmlFor="password">Пароль</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Введите пароль"
      />

      <label htmlFor="confirmPassword">Подтвердите пароль</label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        placeholder="Повторите пароль"
      />

      <fieldset>
        <legend>Контакт для связи</legend>
        <label>
          <input
            type="radio"
            name="contactMethod"
            value="phone"
            checked={contactMethod === 'phone'}
            onChange={() => setContactMethod('phone')}
          />{' '}
          Номер телефона
        </label>
        <label>
          <input
            type="radio"
            name="contactMethod"
            value="email"
            checked={contactMethod === 'email'}
            onChange={() => setContactMethod('email')}
          />{' '}
          Электронная почта
        </label>
      </fieldset>

      {contactMethod === 'phone' && (
        <>
          <label htmlFor="phone">Номер телефона</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="+375 (29) 123-45-67"
            pattern="\+375\s?\(?\d{2}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}"
            title="Введите корректный номер телефона"
          />
        </>
      )}

      {contactMethod === 'email' && (
        <>
          <label htmlFor="email">Электронная почта</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@mail.com"
          />
        </>
      )}

      {error && <p className="error-message">{error}</p>}

      <p  style={{ marginTop: 20, textAlign: 'center', cursor:'pointer' }}>
        Есть аккаунт?{' '}
        <a onClick={()=>setMainContent('authorisation')} style={{ color: '#007bff', textDecoration: 'none' }}>
          Авторизация
        </a>
      </p>

      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}
