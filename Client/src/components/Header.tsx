import React from 'react'

type HeaderProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
  onSearch: React.Dispatch<React.SetStateAction<string>>  // ДОБАВЛЯЕМ
  searchTerm: string  // ДОБАВЛЯЕМ
}

export default function Header({ 
  setMainContent, 
  setIsAuthenticated, 
  isAuthenticated,
  onSearch,  // ДОБАВЛЯЕМ
  searchTerm  // ДОБАВЛЯЕМ
}: HeaderProps) {
  
  const handleLogout = async () => {
    // Очищаем корзину на сервере
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
    
    localStorage.removeItem('user')
    localStorage.removeItem('cartItems')
    setIsAuthenticated(false)
    setMainContent('logo')
    alert('🍻 До новых встреч! Заходи еще!')
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* ЛОГОТИП */}
        <div 
          style={styles.logo}
          onClick={() => setMainContent('logo')}
        >
          <span style={styles.logoIcon}>🍺</span>
          <span style={styles.logoText}>B&C</span>
          <span style={styles.logoIcon}>🍻</span>
        </div>

        {/* ПОИСК */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="🔍 Поиск пива и закусок..."
            value={searchTerm}
            onChange={handleSearch}
            style={styles.searchInput}
          />
        </div>

        {/* НАВИГАЦИЯ */}
        <nav style={styles.nav}>
          <button 
            style={styles.navButton}
            onClick={() => setMainContent('logo')}
          >
            <span style={styles.navIcon}>🏠</span>
            Главная
          </button>
          
          <button 
            style={styles.navButton}
            onClick={() => setMainContent('Basket')}
          >
            <span style={styles.navIcon}>🛒</span>
            Корзина
          </button>
          
          {isAuthenticated ? (
            <>
              <button 
                style={styles.navButton}
                onClick={() => setMainContent('user')}
              >
                <span style={styles.navIcon}>👤</span>
                Профиль
              </button>
              <button 
                style={{...styles.navButton, ...styles.logoutButton}}
                onClick={handleLogout}
              >
                <span style={styles.navIcon}>🚪</span>
                Выйти
              </button>
            </>
          ) : (
            <>
              <button 
                style={styles.navButton}
                onClick={() => setMainContent('authorisation')}
              >
                <span style={styles.navIcon}>🔑</span>
                Вход
              </button>
              <button 
                style={{...styles.navButton, ...styles.registerButton}}
                onClick={() => setMainContent('registration')}
              >
                <span style={styles.navIcon}>📜</span>
                Регистрация
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #2c1a0c 0%, #4a2c1a 100%)',
    borderBottom: '4px solid #DAA520',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    padding: '15px 0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'transform 0.3s'
  },
  logoIcon: {
    fontSize: '32px',
    filter: 'drop-shadow(0 4px 6px rgba(255,215,0,0.5))'
  },
  logoText: {
    color: '#FFD700',
    fontSize: '28px',
    fontWeight: 'bold',
    textShadow: '3px 3px 6px #2c1a0c',
    letterSpacing: '2px'
  },
  searchContainer: {
    flex: 1,
    maxWidth: '400px',
    margin: '0 20px'
  },
  searchInput: {
    width: '100%',
    padding: '12px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: '2px solid #DAA520',
    borderRadius: '30px',
    color: '#FFD700',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s'
  },
  nav: {
    display: 'flex',
    gap: '10px'
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'rgba(139, 69, 19, 0.7)',
    color: '#DEB887',
    border: '2px solid #8B4513',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  registerButton: {
    background: 'linear-gradient(135deg, #8B4513, #DAA520)',
    color: '#2c1a0c',
    borderColor: '#FFD700',
    fontWeight: 'bold'
  },
  logoutButton: {
    background: '#8B4513',
    color: '#FFA07A',
    borderColor: '#CD5C5C'
  },
  navIcon: {
    fontSize: '18px'
  }
}