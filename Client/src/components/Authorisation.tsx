import React, { useState } from 'react'
import '../styles/auth.css'
type AutorisationProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
};


// TODO: бля кораче сделай норм margin в авторизации/регистрации


export default function Authorisation({setMainContent}: AutorisationProps){
  // Состояния для полей формы
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  // Обработчик отправки формы (пока просто вывод в консоль)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const contactValue = contactMethod === 'phone' ? phone : email
    console.log({
      username,
      password,
      contactMethod,
      contactValue,
    })
    // Здесь можно добавить логику авторизации
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Авторизация</h2>

      <label htmlFor="username" style={{ display: 'block', marginBottom: 6 }}>
        Имя пользователя
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 16 }}
        placeholder="Введите имя пользователя"
      />

      <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>
        Пароль
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
        placeholder="Введите пароль"
      />

      {/* <fieldset style={{ marginBottom: 16 }}>
        <legend>Контакт для связи</legend>
        <label style={{ marginRight: 12 }}>
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
          <label htmlFor="phone" style={{ display: 'block', marginBottom: 6 }}>
            Номер телефона
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 16 }}
            placeholder="+7 (999) 999-99-99"
            pattern="\+?\d{7,15}"
            title="Введите корректный номер телефона"
          />
        </>
      )}

      {contactMethod === 'email' && (
        <>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>
            Электронная почта
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginBottom: 16 }}
            placeholder="example@mail.com"
          />
        </>
      )} */}
      
      <p  style={{ marginTop: 20, textAlign: 'center', cursor:'pointer' }}>
        Нет аккаунта?{' '}
        <a onClick={()=>setMainContent('registration')} style={{ color: '#007bff', textDecoration: 'none' }}>
          Зарегистрироваться
        </a>
      </p>

      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        
        Войти
      </button>
    </form>
  )
}
