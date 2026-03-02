import '../App.css'
import '../styles/header.css'

export default function Header() {
  return (
    <header>
      <div className="header">
        <div className="logo">B&C</div>
        <input
          type="search"
          className="search-input"
          placeholder="Поиск..."
          aria-label="Поиск"
        />
        <div className="header-right">
          <button className="cart-btn" aria-label="Корзина">🛒</button>
          <button className="user-btn" aria-label="Кабинет пользователя">👤</button>
        </div>
      </div>
    </header>
  )
}
