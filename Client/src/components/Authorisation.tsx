import React, { useState } from 'react'

type AutorisationProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // Добавляем пропс для авторизации
};

export default function Authorisation({ setMainContent, setIsAuthenticated }: AutorisationProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Простая проверка (в реальном проекте здесь будет запрос к API)
    if (username && password) {
      if (password.length < 3) {
        setError('🍺 Пароль слишком короткий!')
        return
      }
      
      // Успешная авторизация
      setIsAuthenticated(true) // Устанавливаем флаг авторизации
      alert(`🍻 С возвращением, ${username}! Заждались уже!`)
      setMainContent('logo') // Перенаправляем на главную
    } else {
      setError('🍺 Заполните все поля!')
    }
  }

  return (
    <div style={styles.container}>
      {/* ДЕКОРАТИВНАЯ ЛЕНТА СВЕРХУ */}
      <div style={styles.tapeTop}>
        <span style={styles.tapeText}>🍻 Добро пожаловать в Таверну! 🍻</span>
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div style={styles.mainContent}>
        {/* ЛЕВАЯ ДЕКОРАТИВНАЯ ЧАСТЬ */}
        <div style={styles.leftDecoration}>
          <div style={styles.beerMugs}>
            <span style={styles.mugIcon}>🍺</span>
            <span style={styles.mugIcon}>🍻</span>
            <span style={styles.mugIcon}>🥨</span>
          </div>
          <div style={styles.woodText}>
            <p style={styles.woodPhrase}>Пиво пенится,</p>
            <p style={styles.woodPhrase}>друзья ценятся!</p>
          </div>
         
        </div>

        {/* ФОРМА АВТОРИЗАЦИИ */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* ЗАГОЛОВОК С ДЕКОРОМ */}
          <div style={styles.header}>
            <span style={styles.headerIcon}>🍺</span>
            <h2 style={styles.title}>Вход в таверну</h2>
            <span style={styles.headerIcon}>🍺</span>
          </div>

          {/* ПОДЗАГОЛОВОК */}
          <p style={styles.subtitle}>
            Для постоянных посетителей
          </p>

          {/* ПОЛЕ ИМЕНИ */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>👤</span>
              Имя посетителя
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              placeholder="Введите ваше имя"
            />
          </div>

          {/* ПОЛЕ ПАРОЛЯ */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔒</span>
              Ключ от погреба
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Введите пароль"
            />
          </div>

          {/* ОШИБКА */}
          {error && (
            <div style={styles.errorContainer}>
              <span style={styles.errorIcon}>⚠️</span>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          {/* КНОПКА ВХОДА */}
          <button type="submit" style={styles.submitButton}>
            <span style={styles.buttonIcon}>🍻</span>
            Войти в таверну
            <span style={styles.buttonIcon}>🍺</span>
          </button>

          {/* ССЫЛКА НА РЕГИСТРАЦИЮ */}
          <div style={styles.registerLink}>
            <span style={styles.linkText}>Новичок?</span>
            <a 
              onClick={() => setMainContent('registration')} 
              style={styles.link}
            >
              Получить пропуск в таверну 🥨
            </a>
          </div>

          {/* ДЕКОРАТИВНЫЙ НИЗ ФОРМЫ */}
          <div style={styles.formFooter}>
            <span style={styles.footerEmoji}>🍺</span>
            <span style={styles.footerEmoji}>🥨</span>
            <span style={styles.footerEmoji}>🍻</span>
          </div>
        </form>

        {/* ПРАВАЯ ДЕКОРАТИВНАЯ ЧАСТЬ */}
        <div style={styles.rightDecoration}>
          <div style={styles.hops}>
            <span style={styles.hopsIcon}>🌾</span>
            <span style={styles.hopsIcon}>🌾</span>
            <span style={styles.hopsIcon}>🌾</span>
          </div>
          <div style={styles.beerAdvice}>
            <p style={styles.adviceText}>"Пиво -</p>
            <p style={styles.adviceText}>жидкий хлеб"</p>
          </div>
        </div>
      </div>

      {/* ДЕКОРАТИВНАЯ ЛЕНТА СНИЗУ */}
      <div style={styles.tapeBottom}>
        <span style={styles.tapeText}>🍻 Заходи, гостем будешь! 🍻</span>
      </div>
    </div>
  )
}

// СТИЛИ (те же, что и раньше)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2c1a0c 0%, #4a2c1a 100%)',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column' as const
  },
  tapeTop: {
    background: 'linear-gradient(90deg, #8B4513, #DAA520, #8B4513)',
    padding: '15px',
    textAlign: 'center' as const,
    borderBottom: '3px solid #FFD700',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
  },
  tapeBottom: {
    background: 'linear-gradient(90deg, #8B4513, #DAA520, #8B4513)',
    padding: '15px',
    textAlign: 'center' as const,
    borderTop: '3px solid #FFD700',
    boxShadow: '0 -4px 15px rgba(0,0,0,0.5)'
  },
  tapeText: {
    color: '#FFD700',
    fontSize: '22px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #2c1a0c',
    letterSpacing: '2px'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  leftDecoration: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '30px',
    padding: '20px'
  },
  rightDecoration: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '30px',
    padding: '20px'
  },
  beerMugs: {
    display: 'flex',
    gap: '20px',
    fontSize: '60px',
    animation: 'float 3s ease-in-out infinite'
  },
  mugIcon: {
    filter: 'drop-shadow(0 8px 12px rgba(255,215,0,0.3))',
    transform: 'rotate(-5deg)'
  },
  woodText: {
    background: 'rgba(139, 69, 19, 0.7)',
    padding: '20px',
    borderRadius: '20px',
    border: '3px solid #DAA520',
    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.3)'
  },
  woodPhrase: {
    color: '#FFD700',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '5px 0',
    textShadow: '2px 2px 4px #2c1a0c',
    fontStyle: 'italic'
  },
  barrel: {
    width: '150px',
    height: '200px',
    background: 'linear-gradient(135deg, #8B4513, #654321)',
    borderRadius: '50% 50% 30% 30%',
    border: '4px solid #DAA520',
    position: 'relative',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  hops: {
    display: 'flex',
    gap: '15px',
    fontSize: '50px',
    animation: 'shake 4s ease-in-out infinite'
  },
  hopsIcon: {
    filter: 'drop-shadow(0 4px 6px rgba(255,215,0,0.3))'
  },
  beerAdvice: {
    background: 'rgba(44, 26, 12, 0.9)',
    padding: '25px',
    borderRadius: '30px',
    border: '3px solid #DAA520',
    transform: 'rotate(3deg)'
  },
  adviceText: {
    color: '#DEB887',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: '5px 0',
    textShadow: '2px 2px 4px #000000',
    fontFamily: 'Georgia, serif'
  },
  form: {
    background: 'rgba(44, 26, 12, 0.95)',
    padding: '40px',
    borderRadius: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,215,0,0.2)',
    border: '3px solid #DAA520',
    width: '400px',
    maxWidth: '100%',
    backdropFilter: 'blur(5px)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '15px'
  },
  headerIcon: {
    fontSize: '32px',
    filter: 'drop-shadow(0 4px 6px rgba(255,215,0,0.5))'
  },
  title: {
    color: '#FFD700',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '3px 3px 6px #2c1a0c'
  },
  subtitle: {
    color: '#DEB887',
    fontSize: '16px',
    textAlign: 'center' as const,
    marginBottom: '30px',
    fontStyle: 'italic',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '15px'
  },
  inputGroup: {
    marginBottom: '25px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#FFD700',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  labelIcon: {
    fontSize: '18px'
  },
  input: {
    width: '100%',
    padding: '15px',
    background: 'rgba(139, 69, 19, 0.3)',
    border: '2px solid #8B4513',
    borderRadius: '15px',
    fontSize: '16px',
    color: '#FFD700',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box' as const
  },
  errorContainer: {
    background: 'rgba(255, 99, 71, 0.2)',
    border: '2px solid #CD5C5C',
    borderRadius: '15px',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  errorIcon: {
    fontSize: '20px'
  },
  errorText: {
    color: '#FFA07A',
    fontSize: '14px',
    fontWeight: '500'
  },
  submitButton: {
    width: '100%',
    padding: '18px',
    background: 'linear-gradient(135deg, #8B4513, #DAA520)',
    color: '#2c1a0c',
    border: '3px solid #FFD700',
    borderRadius: '50px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    transition: 'all 0.3s',
    boxShadow: '0 8px 20px rgba(218,165,32,0.3)',
    marginTop: '20px'
  },
  buttonIcon: {
    fontSize: '24px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
  },
  registerLink: {
    marginTop: '25px',
    textAlign: 'center' as const,
    padding: '15px',
    background: 'rgba(139, 69, 19, 0.3)',
    borderRadius: '15px',
    border: '2px solid #8B4513'
  },
  linkText: {
    color: '#DEB887',
    marginRight: '5px',
    fontSize: '15px'
  },
  link: {
    color: '#FFD700',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '15px',
    borderBottom: '2px dotted #DAA520',
    paddingBottom: '2px'
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
    paddingTop: '15px',
    borderTop: '2px solid #8B4513'
  },
  footerEmoji: {
    fontSize: '20px',
    opacity: 0.7
  }
}

// Добавляем анимации
const style = document.createElement('style')
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    75% { transform: rotate(-5deg); }
  }
  
  input:focus {
    border-color: #DAA520 !important;
    box-shadow: 0 0 15px rgba(218,165,32,0.3) !important;
  }
  
  button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 25px rgba(218,165,32,0.4) !important;
  }
  
  a:hover {
    color: #FFD700 !important;
    border-bottom: 2px solid #FFD700 !important;
  }
`
document.head.appendChild(style)