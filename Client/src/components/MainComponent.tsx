import React, { useState, useEffect } from 'react'
import Authorisation from './Authorisation'
import Registration from './Registration'
import Basket from './Basket'
import User from './User'

// Тип для товара в корзине
type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
  emoji: string
  category?: string
  description?: string
}

// Тип для товара из JSON
type Product = {
  id: number
  title: string
  price: number
  isAvailable: boolean
  description: string
  categories: string[]
  images: {
    preview: string
    gallery?: string[]
  }
  delivery?: {
    startTown: {
      country?: string
      town?: string
      street?: string
      houseNumber?: string
    }
    earlyDate: string
    price: number
  }
  discount?: number
}

// Тип для стилей
type StylesType = {
  [key: string]: React.CSSProperties
}

type MainContentProps = {
  mainContent: string | undefined
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>
  searchTerm: string
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainComponent({ 
  mainContent, 
  setMainContent, 
  searchTerm,
  setIsAuthenticated 
}: MainContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Состояние корзины
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [setIsAuthenticated])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch('http://localhost:3000/products')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          setProducts(data)
          setError(null)
        } else {
          throw new Error('Неверный формат данных: ожидался массив')
        }
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err)
        setError(err instanceof Error ? err.message : 'Не удалось загрузить товары')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Функция для определения эмодзи по категории
  const getEmojiForCategory = (category: string): string => {
    if (category.includes('Пиво')) return '🍺'
    if (category.includes('Закуски')) return '🥨'
    if (category.includes('Сухарики')) return '🥨'
    if (category.includes('Рыбные')) return '🐟'
    if (category.includes('Морепродукты')) return '🦐'
    if (category.includes('Сырные')) return '🧀'
    return '📦'
  }

  // Добавление в корзину
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { 
        id: product.id,
        title: product.title,
        price: product.discount 
          ? Math.round(product.price * (1 - product.discount / 100))
          : product.price,
        quantity: 1,
        emoji: getEmojiForCategory(product.categories[0]),
        category: product.categories[0],
        description: product.description
      }]
    })
    alert(`🍻 ${product.title} добавлен в корзину!`)
  }

  // Подсчет товаров по категориям
  const getCategoryCount = (category: string) => {
    if (category === 'all') return products.length
    return products.filter(p => p.categories.includes(category)).length
  }

  // Фильтрация товаров
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.categories.includes(selectedCategory)
    const matchesAvailability = !showAvailableOnly || product.isAvailable
    return matchesSearch && matchesCategory && matchesAvailability
  })

  // Получение уникальных категорий
  const allCategories = ['all', ...new Set(products.flatMap(p => p.categories))]

  // Рендер разных страниц
  if (mainContent === 'authorisation') {
    return <Authorisation setMainContent={setMainContent} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
  }
  if (mainContent === 'registration') {
    return <Registration setMainContent={setMainContent} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
  }
  if (mainContent === 'Basket') {
    return (
      <Basket 
        setMainContent={setMainContent}
        items={cartItems}
        onRemoveItem={(id) => setCartItems(prev => prev.filter(item => item.id !== id))}
        onUpdateQuantity={(id, quantity) => setCartItems(prev => 
          prev.map(item => item.id === id ? { ...item, quantity } : item)
        )}
      />
    )
  }
  if (mainContent === 'user') {
    return <User user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} setMainContent={setMainContent} />
  }

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingContent}>
          <span style={styles.loadingEmoji}>🍺</span>
          <p style={styles.loadingText}>Загрузка пивного меню...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.loading}>
        <div style={styles.loadingContent}>
          <span style={styles.loadingEmoji}>😕</span>
          <p style={styles.loadingText}>Ошибка загрузки: {error}</p>
          <p style={styles.loadingText}>Используем тестовые данные</p>
        </div>
      </div>
    )
  }

  // Если товаров нет, показываем заглушку
  if (products.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.tapeTop}>
          <span style={styles.tapeText}>🍻 Пивная Таверна 🍻</span>
        </div>
        <div style={styles.noProducts}>
          <div style={styles.noProductsEmoji}>🍺</div>
          <h3 style={styles.noProductsTitle}>Скоро здесь будет пиво!</h3>
          <p style={styles.noProductsText}>А пока налейте себе чаю :)</p>
        </div>
      </div>
    )
  }

  // ГЛАВНАЯ СТРАНИЦА
  return (
    <div style={styles.container}>
      {/* ВЕРХНЯЯ ДЕКОРАТИВНАЯ ЛЕНТА */}
      <div style={styles.tapeTop}>
        <span style={styles.tapeText}>🍻 Добро пожаловать в Пивную Таверну! 🍻</span>
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div style={styles.mainContent}>
        {/* САЙДБАР С ФИЛЬТРАМИ */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <span style={styles.sidebarHeaderIcon}>🍺</span>
            <h2 style={styles.sidebarTitle}>Пивной погреб</h2>
          </div>
          
          <div style={styles.sidebarSection}>
            <h3 style={styles.sectionTitle}>Категории</h3>
            
            {/* Категория "Все товары" */}
            <div 
              style={{
                ...styles.categoryItem,
                ...(selectedCategory === 'all' ? styles.categoryItemActive : {})
              }}
              onClick={() => setSelectedCategory('all')}
            >
              <span>🍺 Все напитки и закуски</span>
              <span style={styles.categoryCount}>{getCategoryCount('all')}</span>
            </div>

            {/* Динамические категории из JSON */}
            {allCategories.filter(cat => cat !== 'all').map(category => (
              <div 
                key={category}
                style={{
                  ...styles.categoryItem,
                  ...(selectedCategory === category ? styles.categoryItemActive : {})
                }}
                onClick={() => setSelectedCategory(category)}
              >
                <span>
                  {category.includes('Пиво') ? '🍺' : 
                   category.includes('Закуски') ? '🥨' : 
                   category.includes('Сухарики') ? '🥨' : 
                   category.includes('Рыбные') ? '🐟' : 
                   category.includes('Морепродукты') ? '🦐' : 
                   category.includes('Сырные') ? '🧀' : '📦'} {category}
                </span>
                <span style={styles.categoryCount}>{getCategoryCount(category)}</span>
              </div>
            ))}
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={styles.sectionTitle}>Наличие</h3>
            <label style={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxLabel}>Только в наличии</span>
              <span style={styles.checkboxEmoji}>✅</span>
            </label>
          </div>

          {/* Кнопка сброса */}
          <button 
            style={styles.resetButton}
            onClick={() => {
              setSelectedCategory('all')
              setShowAvailableOnly(false)
            }}
          >
            <span style={styles.resetButtonIcon}>🧹</span>
            Сбросить фильтры
          </button>

          {/* ДЕКОРАТИВНЫЙ ЭЛЕМЕНТ */}
          <div style={styles.sidebarDecoration}>
            <span style={styles.decorationText}>🍻</span>
            <span style={styles.decorationText}>🥨</span>
            <span style={styles.decorationText}>🍺</span>
          </div>
        </aside>

        {/* ОСНОВНОЙ КОНТЕНТ С ТОВАРАМИ */}
        <main style={styles.content}>
          {/* Заголовок с пивным счетчиком */}
          <div style={styles.contentHeader}>
            <div style={styles.titleWrapper}>
              <h1 style={styles.contentTitle}>
                {searchTerm ? `Поиск: "${searchTerm}"` : '🍺 Наше меню'}
              </h1>
              <div style={styles.beerMug}>
                <span style={styles.beerMugIcon}>🍺</span>
                <span style={styles.beerMugCount}>{filteredProducts.length}</span>
              </div>
            </div>
            <p style={styles.contentSubtitle}>
              Свежее пиво и лучшие закуски каждый день!
            </p>
          </div>

          {/* СЕТКА ТОВАРОВ */}
          <div style={styles.productsGrid}>
            {filteredProducts.map(product => {
              const discountedPrice = product.discount 
                ? Math.round(product.price * (1 - product.discount / 100))
                : product.price
              
              return (
                <div key={product.id} style={styles.productCard}>
                  {/* ДЕКОРАТИВНАЯ ЛЕНТА НА КАРТОЧКЕ */}
                  <div style={styles.productRibbon}>
                    {product.isAvailable ? '🍻 В наличии' : '😕 Нет'}
                  </div>
                  
                  {/* ИЗОБРАЖЕНИЕ ТОВАРА */}
                  <div style={styles.productEmoji}>
                    <img 
                      src={product.images.preview} 
                      alt={product.title}
                      style={styles.productImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/300/8B4513/FFFFFF?text=🍺'
                      }}
                    />
                  </div>
                  
                  {/* ИНФОРМАЦИЯ О ТОВАРЕ */}
                  <div style={styles.productInfo}>
                    <div style={styles.productCategoryWrapper}>
                      <span style={styles.productCategoryIcon}>
                        {getEmojiForCategory(product.categories[0])}
                      </span>
                      <span style={styles.productCategory}>{product.categories[0]}</span>
                    </div>
                    
                    <h3 style={styles.productName}>{product.title}</h3>
                    <p style={styles.productDescription}>{product.description}</p>
                    
                    {/* ЦЕНА И СКИДКА */}
                    {product.discount && (
                      <div style={styles.priceContainer}>
                        <span style={styles.oldPrice}>{product.price} BYN</span>
                        <span style={styles.discountBadge}>-{product.discount}%</span>
                      </div>
                    )}
                    
                    {/* ЦЕНА И КНОПКА */}
                    <div style={styles.productFooter}>
                      <div style={styles.priceWrapper}>
                        <span style={styles.priceLabel}>Цена:</span>
                        <span style={styles.productPrice}>
                          {discountedPrice} BYN
                        </span>
                      </div>
                      
                      <button 
                        style={{
                          ...styles.addButton,
                          ...(!product.isAvailable ? styles.addButtonDisabled : {})
                        }}
                        onClick={() => addToCart(product)}
                        disabled={!product.isAvailable}
                      >
                        {product.isAvailable ? (
                          <>
                            <span style={styles.addButtonIcon}>🍻</span>
                            <span>Наливай!</span>
                          </>
                        ) : (
                          'Нет в наличии'
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ДЕКОРАТИВНЫЙ НИЗ КАРТОЧКИ */}
                  <div style={styles.productCardFooter}>
                    <span style={styles.cardFooterEmoji}>🍺</span>
                    <span style={styles.cardFooterEmoji}>🥨</span>
                    <span style={styles.cardFooterEmoji}>🍻</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Если товаров нет */}
          {filteredProducts.length === 0 && (
            <div style={styles.noProducts}>
              <div style={styles.noProductsEmoji}>😕🍺</div>
              <h3 style={styles.noProductsTitle}>Пусто, как в бочке!</h3>
              <p style={styles.noProductsText}>Ничего не нашлось... Попробуй другое пивко!</p>
              <button 
                style={styles.noProductsButton}
                onClick={() => {
                  setSelectedCategory('all')
                  setShowAvailableOnly(false)
                }}
              >
                🧹 Показать всё
              </button>
            </div>
          )}
        </main>
      </div>

      {/* НИЖНЯЯ ДЕКОРАТИВНАЯ ЛЕНТА */}
      <div style={styles.tapeBottom}>
        <span style={styles.tapeText}>Пейте пиво пенное - будет настроение отменное! 🍻</span>
      </div>
    </div>
  )
}

// СТИЛИ (твои оригинальные, без изменений)
const styles: StylesType = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2c1a0c 0%, #4a2c1a 100%)',
    fontFamily: 'Arial, sans-serif'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2c1a0c 0%, #4a2c1a 100%)'
  },
  loadingContent: {
    textAlign: 'center'
  },
  loadingEmoji: {
    fontSize: '60px',
    animation: 'float 3s ease-in-out infinite',
    display: 'block',
    marginBottom: '20px'
  },
  loadingText: {
    color: '#FFD700',
    fontSize: '24px',
    fontFamily: 'Arial, sans-serif'
  },
  tapeTop: {
    background: 'linear-gradient(90deg, #8B4513, #DAA520, #8B4513)',
    padding: '15px',
    textAlign: 'center',
    borderBottom: '3px solid #FFD700',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
  },
  tapeBottom: {
    background: 'linear-gradient(90deg, #8B4513, #DAA520, #8B4513)',
    padding: '15px',
    textAlign: 'center',
    borderTop: '3px solid #FFD700',
    marginTop: '40px',
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
    display: 'flex',
    maxWidth: '1400px',
    margin: '30px auto',
    padding: '0 20px',
    gap: '30px'
  },
  sidebar: {
    width: '280px',
    background: 'rgba(44, 26, 12, 0.95)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,215,0,0.2)',
    border: '2px solid #DAA520',
    position: 'sticky',
    top: '20px',
    height: 'fit-content',
    backdropFilter: 'blur(5px)'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '2px solid #DAA520'
  },
  sidebarHeaderIcon: {
    fontSize: '32px'
  },
  sidebarTitle: {
    color: '#FFD700',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  sidebarSection: {
    marginBottom: '25px'
  },
  sectionTitle: {
    color: '#DAA520',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    borderLeft: '4px solid #DAA520',
    paddingLeft: '10px'
  },
  categoryItem: {
    padding: '12px 15px',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    transition: 'all 0.3s',
    color: '#DEB887',
    background: 'rgba(139, 69, 19, 0.3)',
    border: '1px solid #8B4513'
  },
  categoryItemActive: {
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    borderColor: '#FFD700',
    boxShadow: '0 4px 10px rgba(255,215,0,0.3)',
    fontWeight: 'bold'
  },
  categoryCount: {
    background: 'rgba(0,0,0,0.3)',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    color: '#FFD700'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '10px',
    background: 'rgba(139, 69, 19, 0.3)',
    borderRadius: '10px',
    border: '1px solid #8B4513'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: '#DAA520'
  },
  checkboxLabel: {
    color: '#DEB887',
    fontSize: '14px',
    flex: 1
  },
  checkboxEmoji: {
    fontSize: '16px'
  },
  resetButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #8B4513, #654321)',
    color: '#FFD700',
    border: '2px solid #DAA520',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s',
    marginTop: '20px'
  },
  resetButtonIcon: {
    fontSize: '18px'
  },
  sidebarDecoration: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '25px',
    paddingTop: '15px',
    borderTop: '2px solid #DAA520'
  },
  decorationText: {
    fontSize: '24px',
    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))'
  },
  content: {
    flex: 1
  },
  contentHeader: {
    marginBottom: '30px',
    background: 'rgba(44, 26, 12, 0.9)',
    padding: '20px',
    borderRadius: '15px',
    border: '2px solid #DAA520',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '10px'
  },
  contentTitle: {
    color: '#FFD700',
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  beerMug: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #8B4513, #654321)',
    padding: '8px 15px',
    borderRadius: '30px',
    border: '2px solid #DAA520'
  },
  beerMugIcon: {
    fontSize: '20px'
  },
  beerMugCount: {
    color: '#FFD700',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  contentSubtitle: {
    color: '#DEB887',
    fontSize: '16px',
    margin: '10px 0 0 0',
    fontStyle: 'italic'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px'
  },
  productCard: {
    background: 'rgba(44, 26, 12, 0.95)',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,215,0,0.2)',
    border: '2px solid #DAA520',
    transition: 'all 0.3s',
    position: 'relative',
    backdropFilter: 'blur(5px)'
  },
  productRibbon: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    zIndex: 1
  },
  productEmoji: {
    height: '180px',
    background: 'linear-gradient(135deg, #8B4513, #654321)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: '3px solid #DAA520',
    position: 'relative',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  },
  productInfo: {
    padding: '20px'
  },
  productCategoryWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  },
  productCategoryIcon: {
    fontSize: '18px'
  },
  productCategory: {
    background: 'rgba(218, 165, 32, 0.2)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#DAA520',
    border: '1px solid #DAA520'
  },
  productName: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FFD700',
    margin: '0 0 8px 0',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
  },
  productDescription: {
    fontSize: '14px',
    color: '#DEB887',
    margin: '0 0 15px 0',
    lineHeight: '1.5',
    fontStyle: 'italic'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  oldPrice: {
    fontSize: '14px',
    color: '#DEB887',
    textDecoration: 'line-through'
  },
  discountBadge: {
    background: '#27ae60',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  productFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '2px solid #8B4513'
  },
  priceWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  priceLabel: {
    fontSize: '12px',
    color: '#DEB887'
  },
  productPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#FFD700',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    border: 'none',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 10px rgba(255,215,0,0.3)'
  },
  addButtonIcon: {
    fontSize: '16px'
  },
  addButtonDisabled: {
    background: '#8B4513',
    color: '#DEB887',
    cursor: 'not-allowed',
    boxShadow: 'none'
  },
  productCardFooter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px',
    background: 'rgba(139, 69, 19, 0.3)',
    borderTop: '1px solid #8B4513'
  },
  cardFooterEmoji: {
    fontSize: '16px',
    opacity: 0.7
  },
  noProducts: {
    textAlign: 'center',
    padding: '60px',
    background: 'rgba(44, 26, 12, 0.95)',
    borderRadius: '20px',
    border: '2px solid #DAA520'
  },
  noProductsEmoji: {
    fontSize: '60px',
    marginBottom: '20px'
  },
  noProductsTitle: {
    color: '#FFD700',
    fontSize: '24px',
    margin: '0 0 10px 0'
  },
  noProductsText: {
    color: '#DEB887',
    fontSize: '16px',
    marginBottom: '25px'
  },
  noProductsButton: {
    padding: '12px 30px',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(255,215,0,0.3)'
  }
}

// Добавляем анимацию (проверяем, что мы в браузере)
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .productCard:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.7), inset 0 2px 5px rgba(255,215,0,0.3);
    }
    
    .productCard:hover .productImage {
      transform: scale(1.1);
    }
    
    .resetButton:hover {
      background: linear-gradient(135deg, #654321, #8B4513);
      transform: scale(1.02);
    }
    
    .categoryItem:hover {
      background: rgba(218, 165, 32, 0.3);
      transform: translateX(5px);
    }
  `
  document.head.appendChild(styleElement)
}