import React, { useState } from 'react'

type RegistrationProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export default function Registration({ setMainContent, setIsAuthenticated, setUser }: RegistrationProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('🍺 Пароли не совпадают!')
      return
    }
    if (password.length < 6) {
      setError('🍺 Пароль должен быть не короче 6 символов!')
      return
    }
    if (!username) {
      setError('🍺 Введите имя!')
      return
    }
    if (contactMethod === 'phone' && !phone) {
      setError('🍺 Введите номер телефона!')
      return
    }
    if (contactMethod === 'email' && !email) {
      setError('🍺 Введите email!')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username,
          password,
          email: contactMethod === 'email' ? email : undefined,
          phone: contactMethod === 'phone' ? phone : undefined
        })
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        alert(`🍻 Добро пожаловать в таверну, ${username}!`)
        setMainContent('main')
      } else {
        setError(data.error || 'Ошибка регистрации')
      }
    } catch (err) {
      setError('Не удалось подключиться к серверу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.tapeTop}>
        <span style={styles.tapeText}>🍻 Запись в гильдию пивоваров! 🍻</span>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.leftDecoration}>
          <div style={styles.woodSign}>
            <p style={styles.signText}>Правила</p>
            <p style={styles.signText}>таверны:</p>
          </div>
          <div style={styles.rulesList}>
            <div style={styles.ruleItem}>
              <span style={styles.ruleIcon}>🍺</span>
              <span style={styles.ruleText}>Пиво - только свежее!</span>
            </div>
            <div style={styles.ruleItem}>
              <span style={styles.ruleIcon}>🥨</span>
              <span style={styles.ruleText}>Закуска - в каждом заказе!</span>
            </div>
            <div style={styles.ruleItem}>
              <span style={styles.ruleIcon}>🍻</span>
              <span style={styles.ruleText}>С друзьями - веселее!</span>
            </div>
            <div style={styles.ruleItem}>
              <span style={styles.ruleIcon}>🏆</span>
              <span style={styles.ruleText}>Постоянным - скидки!</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.header}>
            <span style={styles.headerIcon}>📜</span>
            <h2 style={styles.title}>Запись в постоянные</h2>
            <span style={styles.headerIcon}>📜</span>
          </div>

          <p style={styles.subtitle}>Заполните свиток данными</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>👤</span> Ваше имя (позывной)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
              placeholder="Как к Вам обращаться?"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔒</span> Придумайте ключ
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Не меньше 6 символов"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🔐</span> Повторите ключ
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
              placeholder="Ещё разок для верности"
            />
          </div>

          <div style={styles.contactSection}>
            <div style={styles.contactHeader}>
              <span style={styles.contactIcon}>📞</span>
              <span style={styles.contactTitle}>Как с Вами связаться?</span>
            </div>

            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={contactMethod === 'phone'}
                  onChange={() => setContactMethod('phone')}
                  style={styles.radio}
                />
                <span style={styles.radioText}>📱 Позвонить</span>
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={() => setContactMethod('email')}
                  style={styles.radio}
                />
                <span style={styles.radioText}>✉️ Написать</span>
              </label>
            </div>

            {contactMethod === 'phone' ? (
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>📞</span> Номер телефона
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="+375 (29) 123-45-67"
                />
              </div>
            ) : (
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <span style={styles.labelIcon}>✉️</span> Электронная почта
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                  placeholder="example@mail.com"
                />
              </div>
            )}
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <span style={styles.errorIcon}>⚠️</span>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          <button type="submit" style={styles.submitButton} disabled={loading}>
            <span style={styles.buttonIcon}>📜</span>
            {loading ? 'Загрузка...' : 'Вступить в гильдию'}
            <span style={styles.buttonIcon}>🍺</span>
          </button>

          <div style={styles.loginLink}>
            <span style={styles.linkText}>Уже свой?</span>
            <a onClick={() => setMainContent('authorisation')} style={styles.link}>
              Заходи в таверну 🍻
            </a>
          </div>

          <div style={styles.formFooter}>
            <span style={styles.footerEmoji}>🍺</span>
            <span style={styles.footerEmoji}>🥨</span>
            <span style={styles.footerEmoji}>🍻</span>
            <span style={styles.footerEmoji}>🏆</span>
          </div>
        </form>

        <div style={styles.rightDecoration}>
          <div style={styles.benefits}>
            <h3 style={styles.benefitsTitle}>Что даёт запись?</h3>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>🏆</span>
              <span style={styles.benefitText}>Скидка 10% на всё пиво</span>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>🎁</span>
              <span style={styles.benefitText}>Подарок в день рождения</span>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>🍺</span>
              <span style={styles.benefitText}>Дегустация новинок</span>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>🥨</span>
              <span style={styles.benefitText}>Закуска в подарок</span>
            </div>
          </div>
          <div style={styles.mugStack}>
            <span style={styles.mug}>🍺</span>
            <span style={styles.mug}>🍺</span>
            <span style={styles.mug}>🍺</span>
          </div>
        </div>
      </div>

      <div style={styles.tapeBottom}>
        <span style={styles.tapeText}>🍻 Становись постоянным гостем! 🍻</span>
      </div>
    </div>
  )
}

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
    padding: '30px 20px',
    gap: '30px',
    maxWidth: '1400px',
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
  woodSign: {
    background: 'rgba(139, 69, 19, 0.8)',
    padding: '25px 40px',
    borderRadius: '30px',
    border: '4px solid #DAA520',
    transform: 'rotate(-3deg)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
  },
  signText: {
    color: '#FFD700',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '5px 0',
    textShadow: '3px 3px 6px #2c1a0c',
    textAlign: 'center' as const
  },
  rulesList: {
    background: 'rgba(44, 26, 12, 0.9)',
    padding: '25px',
    borderRadius: '30px',
    border: '3px solid #DAA520',
    width: '100%',
    maxWidth: '300px'
  },
  ruleItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '2px solid #8B4513'
  },
  ruleIcon: {
    fontSize: '28px'
  },
  ruleText: {
    color: '#DEB887',
    fontSize: '16px',
    fontWeight: '500'
  },
  form: {
    background: 'rgba(44, 26, 12, 0.95)',
    padding: '40px',
    borderRadius: '40px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,215,0,0.2)',
    border: '3px solid #DAA520',
    width: '500px',
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
    marginBottom: '20px'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#FFD700',
    fontSize: '15px',
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
    fontSize: '15px',
    color: '#FFD700',
    outline: 'none',
    transition: 'all 0.3s',
    boxSizing: 'border-box' as const
  },
  contactSection: {
    background: 'rgba(139, 69, 19, 0.2)',
    padding: '20px',
    borderRadius: '20px',
    border: '2px solid #8B4513',
    marginBottom: '20px'
  },
  contactHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px'
  },
  contactIcon: {
    fontSize: '24px'
  },
  contactTitle: {
    color: '#FFD700',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  radio: {
    width: '18px',
    height: '18px',
    accentColor: '#DAA520',
    cursor: 'pointer'
  },
  radioText: {
    color: '#DEB887',
    fontSize: '15px'
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
    marginTop: '10px',
    opacity: 1
  },
  buttonIcon: {
    fontSize: '24px'
  },
  loginLink: {
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
    gap: '20px',
    marginTop: '25px',
    paddingTop: '15px',
    borderTop: '2px solid #8B4513'
  },
  footerEmoji: {
    fontSize: '22px',
    opacity: 0.7
  },
  benefits: {
    background: 'rgba(44, 26, 12, 0.9)',
    padding: '30px',
    borderRadius: '30px',
    border: '3px solid #DAA520',
    width: '100%',
    maxWidth: '300px'
  },
  benefitsTitle: {
    color: '#FFD700',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center' as const,
    borderBottom: '2px solid #8B4513',
    paddingBottom: '10px'
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px',
    padding: '8px',
    background: 'rgba(139, 69, 19, 0.3)',
    borderRadius: '10px'
  },
  benefitIcon: {
    fontSize: '24px'
  },
  benefitText: {
    color: '#DEB887',
    fontSize: '15px'
  },
  mugStack: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    fontSize: '50px'
  },
  mug: {
    filter: 'drop-shadow(0 8px 12px rgba(255,215,0,0.3))',
    transform: 'rotate(5deg)',
    animation: 'stack 3s ease-in-out infinite'
  }
}

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes stack {
      0%, 100% { transform: rotate(5deg) translateY(0); }
      50% { transform: rotate(8deg) translateY(-5px); }
    }
    input:focus {
      border-color: #DAA520 !important;
      box-shadow: 0 0 20px rgba(218,165,32,0.3) !important;
    }
    button:hover:not(:disabled) {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 30px rgba(218,165,32,0.4) !important;
    }
    a:hover {
      color: #FFD700 !important;
      border-bottom: 2px solid #FFD700 !important;
    }
    .radioLabel:hover {
      transform: scale(1.05);
    }
  `
  document.head.appendChild(style)
}