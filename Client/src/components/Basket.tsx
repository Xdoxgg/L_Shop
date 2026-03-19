import React, { useState } from 'react'

interface CartItem {
  id: number  
  title: string
  price: number
  quantity: number
  emoji: string
  category?: string
  description?: string
}

type BasketProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>
  // Добавляем возможность получать товары извне (из MainComponent)
  items?: CartItem[]
  onAddItem?: (item: CartItem) => void
  onRemoveItem?: (id: number) => void
  onUpdateQuantity?: (id: number, quantity: number) => void
}

export default function Basket({ 
  setMainContent, 
  items: externalItems, 
  onRemoveItem: externalRemoveItem,
  onUpdateQuantity: externalUpdateQuantity
}: BasketProps) {
  // Если передан externalItems - используем его, иначе пустой массив
  const [items, setItems] = useState<CartItem[]>(externalItems || [])

  // Синхронизация с внешними items
  
  // Функции для работы с корзиной
  const increment = (id: number) => {
    if (externalUpdateQuantity) {
      const item = items.find(i => i.id === id)
      if (item) {
        externalUpdateQuantity(id, item.quantity + 1)
      }
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    }
  }

  const decrement = (id: number) => {
    if (externalUpdateQuantity) {
      const item = items.find(i => i.id === id)
      if (item && item.quantity > 1) {
        externalUpdateQuantity(id, item.quantity - 1)
      }
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      )
    }
  }

  const removeItem = (id: number) => {
    if (externalRemoveItem) {
      externalRemoveItem(id)
    } else {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`🍻 Заказ оформлен! Спасибо за покупку на сумму ${totalPrice.toFixed(2)} BYN!`)
    if (externalRemoveItem) {
      // Очищаем корзину через внешнюю функцию
      items.forEach(item => externalRemoveItem(item.id))
    } else {
      setItems([])
    }
  }

  const continueShopping = () => {
    setMainContent('logo')
  }

  return (
    <div style={styles.container}>
      {/* ВЕРХНЯЯ ДЕКОРАТИВНАЯ ЛЕНТА */}
      <div style={styles.tapeTop}>
        <span style={styles.tapeText}>🍻 Пивная корзина 🍻</span>
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <div style={styles.mainContent}>
        <div style={styles.basketContainer}>
          {/* ЗАГОЛОВОК */}
          <div style={styles.header}>
            <span style={styles.headerIcon}>🛒</span>
            <h1 style={styles.title}>Корзина</h1>
            <span style={styles.headerIcon}>🍺</span>
          </div>

          {items.length === 0 ? (
            // ПУСТАЯ КОРЗИНА
            <div style={styles.emptyBasket}>
              <div style={styles.emptyEmoji}>🍺🥨🍻</div>
              <h2 style={styles.emptyTitle}>Корзина пуста, как бочка!</h2>
              <p style={styles.emptyText}>
                Загляните в наше меню - там свежее пиво и вкусные закуски!
              </p>
              <button 
                style={styles.continueButton}
                onClick={continueShopping}
              >
                <span style={styles.buttonIcon}>🍺</span>
                К меню
                <span style={styles.buttonIcon}>🥨</span>
              </button>
            </div>
          ) : (
            // КОРЗИНА С ТОВАРАМИ
            <>
              {/* СТАТИСТИКА */}
              <div style={styles.statsBar}>
                <div style={styles.statItem}>
                  <span style={styles.statIcon}>📦</span>
                  <span style={styles.statText}>Товаров: {totalItems} шт.</span>
                </div>
                <div style={styles.statItem}>
                  <span style={styles.statIcon}>🏷️</span>
                  <span style={styles.statText}>Позиций: {items.length}</span>
                </div>
              </div>

              {/* СПИСОК ТОВАРОВ */}
              <div style={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    {/* ЭМОДЗИ ТОВАРА */}
                    <div style={styles.itemEmoji}>
                      <span style={styles.itemEmojiIcon}>{item.emoji || '🍺'}</span>
                    </div>

                    {/* ИНФОРМАЦИЯ О ТОВАРЕ */}
                    <div style={styles.itemInfo}>
                      <div style={styles.itemHeader}>
                        <h3 style={styles.itemTitle}>{item.title}</h3>
                        {item.category && (
                          <span style={styles.itemCategory}>{item.category}</span>
                        )}
                      </div>
                      
                      {item.description && (
                        <p style={styles.itemDescription}>{item.description}</p>
                      )}

                      <div style={styles.itemFooter}>
                        {/* ЦЕНА */}
                        <div style={styles.priceBlock}>
                          <span style={styles.priceLabel}>Цена:</span>
                          <span style={styles.itemPrice}>{item.price} BYN</span>
                        </div>

                        {/* КОЛИЧЕСТВО */}
                        <div style={styles.quantityBlock}>
                          <button 
                            style={styles.quantityBtn}
                            onClick={() => decrement(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span style={styles.quantityValue}>{item.quantity}</span>
                          <button 
                            style={styles.quantityBtn}
                            onClick={() => increment(item.id)}
                          >
                            +
                          </button>
                        </div>

                        {/* СУММА */}
                        <div style={styles.totalBlock}>
                          <span style={styles.totalLabel}>Сумма:</span>
                          <span style={styles.itemTotal}>
                            {(item.price * item.quantity).toFixed(2)} BYN
                          </span>
                        </div>

                        {/* КНОПКА УДАЛЕНИЯ */}
                        <button 
                          style={styles.removeBtn}
                          onClick={() => removeItem(item.id)}
                          title="Убрать из корзины"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ИТОГОВАЯ СУММА */}
              <div style={styles.totalSection}>
                <div style={styles.totalDetails}>
                  <div style={styles.totalRow}>
                    <span>Товары ({totalItems} шт.)</span>
                    <span>{totalPrice.toFixed(2)} BYN</span>
                  </div>
                  <div style={styles.totalRow}>
                    <span>🍺 Пивной сбор</span>
                    <span style={styles.free}>Бесплатно</span>
                  </div>
                  <div style={styles.totalRow}>
                    <span>🥨 Закусочный налог</span>
                    <span style={styles.free}>Бесплатно</span>
                  </div>
                  <div style={styles.grandTotal}>
                    <span>ИТОГО:</span>
                    <span style={styles.grandTotalPrice}>{totalPrice.toFixed(2)} BYN</span>
                  </div>
                </div>

                {/* КНОПКИ */}
                <div style={styles.actionButtons}>
                  <button 
                    style={styles.continueBtn}
                    onClick={continueShopping}
                  >
                    <span style={styles.btnIcon}>🍺</span>
                    Продолжить
                  </button>
                  
                  <button 
                    style={styles.orderBtn}
                    onClick={handleOrder}
                  >
                    <span style={styles.btnIcon}>🍻</span>
                    Заказать
                  </button>
                </div>

                <p style={styles.note}>
                  Нажимая "Заказать", вы подтверждаете, что хотите пива! 🍻
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* НИЖНЯЯ ДЕКОРАТИВНАЯ ЛЕНТА */}
      <div style={styles.tapeBottom}>
        <span style={styles.tapeText}>🍻 Хорошего пивного настроения! 🍻</span>
      </div>
    </div>
  )
}

// СТИЛИ В СТИЛЕ ПИВНОЙ ТАВЕРНЫ
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2c1a0c 0%, #4a2c1a 100%)',
    fontFamily: 'Arial, sans-serif'
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
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 140px)',
    padding: '40px 20px'
  },
  basketContainer: {
    maxWidth: '900px',
    width: '100%',
    background: 'rgba(44, 26, 12, 0.95)',
    borderRadius: '30px',
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,215,0,0.2)',
    border: '3px solid #DAA520',
    backdropFilter: 'blur(5px)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #DAA520'
  },
  headerIcon: {
    fontSize: '36px',
    filter: 'drop-shadow(0 4px 6px rgba(255,215,0,0.5))'
  },
  title: {
    color: '#FFD700',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    textShadow: '3px 3px 6px #2c1a0c'
  },
  emptyBasket: {
    textAlign: 'center' as const,
    padding: '60px 20px'
  },
  emptyEmoji: {
    fontSize: '80px',
    marginBottom: '20px',
    animation: 'float 3s ease-in-out infinite'
  },
  emptyTitle: {
    color: '#FFD700',
    fontSize: '28px',
    marginBottom: '15px'
  },
  emptyText: {
    color: '#DEB887',
    fontSize: '18px',
    marginBottom: '30px'
  },
  continueButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    border: 'none',
    borderRadius: '50px',
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 8px 20px rgba(255,215,0,0.3)'
  },
  buttonIcon: {
    fontSize: '24px'
  },
  statsBar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '25px',
    padding: '15px',
    background: 'rgba(139, 69, 19, 0.3)',
    borderRadius: '15px',
    border: '1px solid #8B4513'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  statIcon: {
    fontSize: '20px'
  },
  statText: {
    color: '#DEB887',
    fontSize: '16px',
    fontWeight: '500'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    marginBottom: '30px',
    maxHeight: '500px',
    overflowY: 'auto' as const,
    padding: '5px'
  },
  cartItem: {
    display: 'flex',
    gap: '20px',
    background: 'rgba(139, 69, 19, 0.2)',
    borderRadius: '20px',
    padding: '20px',
    border: '2px solid #8B4513',
    transition: 'all 0.3s'
  },
  itemEmoji: {
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, #8B4513, #654321)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #DAA520'
  },
  itemEmojiIcon: {
    fontSize: '50px',
    filter: 'drop-shadow(0 4px 6px rgba(255,215,0,0.3))'
  },
  itemInfo: {
    flex: 1
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  itemTitle: {
    color: '#FFD700',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0
  },
  itemCategory: {
    background: 'rgba(218, 165, 32, 0.2)',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#DAA520',
    border: '1px solid #DAA520'
  },
  itemDescription: {
    color: '#DEB887',
    fontSize: '14px',
    margin: '0 0 15px 0',
    fontStyle: 'italic'
  },
  itemFooter: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gap: '15px',
    alignItems: 'center',
    paddingTop: '10px',
    borderTop: '2px solid #8B4513'
  },
  priceBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px'
  },
  priceLabel: {
    fontSize: '10px',
    color: '#DEB887'
  },
  itemPrice: {
    color: '#FFD700',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  quantityBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: 'rgba(44, 26, 12, 0.8)',
    padding: '5px',
    borderRadius: '25px',
    border: '2px solid #DAA520'
  },
  quantityBtn: {
    width: '30px',
    height: '30px',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    border: 'none',
    borderRadius: '50%',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  quantityValue: {
    color: '#FFD700',
    fontSize: '16px',
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center' as const
  },
  totalBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px'
  },
  totalLabel: {
    fontSize: '10px',
    color: '#DEB887'
  },
  itemTotal: {
    color: '#FFD700',
    fontSize: '18px',
    fontWeight: 'bold'
  },
  removeBtn: {
    width: '36px',
    height: '36px',
    background: '#8B4513',
    color: '#FFA07A',
    border: '2px solid #CD5C5C',
    borderRadius: '50%',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalSection: {
    background: 'rgba(139, 69, 19, 0.3)',
    borderRadius: '20px',
    padding: '25px',
    border: '2px solid #DAA520',
    marginTop: '20px'
  },
  totalDetails: {
    marginBottom: '25px'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    color: '#DEB887',
    borderBottom: '1px dashed #8B4513'
  },
  free: {
    color: '#27ae60',
    fontWeight: 'bold'
  },
  grandTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0 0',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FFD700',
    borderTop: '3px solid #DAA520',
    marginTop: '10px'
  },
  grandTotalPrice: {
    color: '#FFD700',
    fontSize: '26px'
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px'
  },
  continueBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '15px',
    background: '#8B4513',
    color: '#DEB887',
    border: '2px solid #DAA520',
    borderRadius: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  orderBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '15px',
    background: 'linear-gradient(135deg, #DAA520, #FFD700)',
    color: '#4A2C0D',
    border: 'none',
    borderRadius: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 4px 15px rgba(255,215,0,0.3)'
  },
  btnIcon: {
    fontSize: '20px'
  },
  note: {
    textAlign: 'center' as const,
    color: '#DEB887',
    fontSize: '14px',
    marginTop: '15px',
    fontStyle: 'italic'
  }
}

// Добавляем анимацию
const styleElement = document.createElement('style')
styleElement.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .cartItem:hover {
    transform: translateX(5px);
    border-color: #DAA520;
  }
  
  .quantityBtn:hover:not(:disabled) {
    transform: scale(1.1);
  }
  
  .removeBtn:hover {
    background: #CD5C5C;
    color: white;
    transform: rotate(90deg);
  }
  
  .continueBtn:hover, .orderBtn:hover {
    transform: translateY(-3px);
  }
  
  .itemsList::-webkit-scrollbar {
    width: 8px;
  }
  
  .itemsList::-webkit-scrollbar-track {
    background: #8B4513;
    border-radius: 10px;
  }
  
  .itemsList::-webkit-scrollbar-thumb {
    background: #DAA520;
    border-radius: 10px;
  }
`
document.head.appendChild(styleElement)