import React, { useState } from 'react'
import '../styles/basket.css'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  imageUrl: string
}


type BasketProps = {
  mainContent: string | undefined;
   setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Basket({mainContent, setMainContent}: BasketProps) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      title: 'Смартфон Xiaomi Redmi Note 12',
      price: 899.99,
      quantity: 1,
      imageUrl: 'https://example.com/images/redmi-note-12.jpg',
    },
    {
      id: '2',
      title: 'Кофеварка DeLonghi Magnifica',
      price: 350.0,
      quantity: 2,
      imageUrl: 'https://example.com/images/delonghi-magnifica.jpg',
    },
  ])

  // Увеличить количество товара
  const increment = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  // Уменьшить количество товара (минимум 1)
  const decrement = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  // Удалить товар из корзины
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Общая сумма
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Обработка оформления заказа (заглушка)
  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Спасибо за заказ на сумму ${totalPrice.toFixed(2)} BYN!`)
    setItems([]) // Очистить корзину после заказа
  }

  return (
    <main className="cart-container">
      <h1>Корзина</h1>

      {items.length === 0 ? (
        <p className="cart-empty">Ваша корзина пуста.</p>
      ) : (
        <>
          <ul className="cart-list" aria-label="Список товаров в корзине">
            {items.map(({ id, title, price, quantity, imageUrl }) => (
              <li key={id} className="cart-item">
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
                    Цена: {price.toLocaleString('ru-RU', { style: 'currency', currency: 'BYN' })}
                  </p>
                  <div className="cart-item__quantity">
                    <button
                      onClick={() => decrement(id)}
                      aria-label={`Уменьшить количество товара ${title}`}
                      disabled={quantity <= 1}
                      type="button"
                    >
                      −
                    </button>
                    <span aria-live="polite" aria-atomic="true" className="quantity-value">
                      {quantity}
                    </span>
                    <button
                      onClick={() => increment(id)}
                      aria-label={`Увеличить количество товара ${title}`}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item__remove"
                  onClick={() => removeItem(id)}
                  aria-label={`Удалить товар ${title} из корзины`}
                  type="button"
                >
                  ×
                </button>
              </li>
            ))}
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
