import '../App.css'
import '../styles/header.css'
type HeaderProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export default function Header({setMainContent}: HeaderProps) {
  return (
    <header>
      <div className="header">
        <div className="logo" onClick={() => setMainContent('logo')}>B&C</div>
        <input
          type="search"
          className="search-input"
          placeholder="Поиск..."
          aria-label="Поиск"
        />
        <div className="header-right">
          <button className="cart-btn" aria-label="Корзина">🛒</button>
          <button className="user-btn" aria-label="Кабинет пользователя" onClick={()=> setMainContent('authorisation')}>👤</button>
        </div>
      </div>
    </header>
  )
}
