import React, { useState } from 'react'
import '../styles/basket.css'

// Исправленный интерфейс - id должен быть number, так как в данных используются числа
interface CartItem {
  id: number  
  title: string
  price: number
  quantity: number
  imageUrl: string
  name?: string 
  image?: string
  available?: boolean
}

type BasketProps = {
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Basket({ setMainContent }: BasketProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,  // теперь это number, что соответствует интерфейсу
      image: 'https://via.placeholder.com/150/FFD700/000000?text=🍺',
      name: 'Пиво Жигулевское',
      price: 8,
      available: true,
      title: 'Пиво Жигулевское',  // добавляем title для соответствия интерфейсу
      imageUrl: 'https://via.placeholder.com/150/FFD700/000000?text=🍺',  // добавляем imageUrl
      quantity: 1  // добавляем quantity
    },
    {
      id: 2,  // теперь это number
      image: 'https://via.placeholder.com/150/FFA500/000000?text=🍺',
      name: 'Пиво Балтика 7',
      price: 7,
      available: true,
      title: 'Пиво Балтика 7',  // добавляем title
      imageUrl: 'https://via.placeholder.com/150/FFA500/000000?text=🍺',  // добавляем imageUrl
      quantity: 1  // добавляем quantity
    }
  ])

  // Меняем тип параметра с string на number
  const increment = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  // Меняем тип параметра с string на number
  const decrement = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  // Меняем тип параметра с string на number
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Спасибо за заказ на сумму ${totalPrice.toFixed(2)} BYN!`)
    setItems([])
  }

  return (
    <main className="cart-container">
      <h1>Корзина</h1>

      {items.length === 0 ? (
        <p className="cart-empty">Ваша корзина пуста.</p>
      ) : (
        <>
          <ul className="cart-list" aria-label="Список товаров в корзине">
            {items.map((item) => {
              // Используем title или name, imageUrl или image
              const title = item.title || item.name || 'Товар'
              const imageUrl = item.imageUrl || item.image || ''
              
              return (
                <li key={item.id} className="cart-item">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="cart-item__image"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <div className="cart-item__info">
                    <h2 className="cart-item__title">{title}</h2>
                    <p className="cart-item__price">
                      Цена: {item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'BYN' })}
                    </p>
                    <div className="cart-item__quantity">
                      <button
                        onClick={() => decrement(item.id)}
                        aria-label={`Уменьшить количество товара ${title}`}
                        disabled={item.quantity <= 1}
                        type="button"
                      >
                        −
                      </button>
                      <span aria-live="polite" aria-atomic="true" className="quantity-value">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        aria-label={`Увеличить количество товара ${title}`}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Удалить товар ${title} из корзины`}
                    type="button"
                  >
                    ×
                  </button>
                </li>
              )
            })}
          </ul>

          <form className="cart-summary" onSubmit={handleOrder} aria-label="Форма оформления заказа">
            <div className="cart-summary__total">
              <span>Итого:</span>
              <span className="cart-summary__price">
                {totalPrice.toLocaleString('ru-RU', { style: 'currency', currency: 'BYN' })}
              </span>
            </div>

            <button type="submit" className="cart-summary__order-btn" disabled={items.length === 0}>
              Оформить заказ
            </button>
          </form>
        </>
      )}
    </main>
  )
}