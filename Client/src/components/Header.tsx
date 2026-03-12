// Header.tsx
import '../App.css'
import '../styles/header.css'

type HeaderProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  onSearch?: (term: string) => void; 
  searchTerm?: string;
};

export default function Header({ setMainContent, onSearch, searchTerm }: HeaderProps) {
  return (
    <header>
      <div className="header">
        <div className="logo" onClick={() => setMainContent('logo')}>B&C</div>
        <input
          type="search"
          className="search-input"
          placeholder="Поиск пива и сухариков..."
          aria-label="Поиск"
          value={searchTerm}
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <div className="header-right">
          <button className="cart-btn" aria-label="Корзина" onClick={()=>setMainContent('Basket')}>🛒</button>
          <button className="user-btn" aria-label="Кабинет пользователя" onClick={()=> setMainContent('authorisation')}>👤</button>
        </div>
      </div>
    </header>
  )
}