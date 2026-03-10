import React, { useState } from 'react'
import styles from '../styles/dilivery.css'

type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
}

type PaymentMethod = 'card' | 'cash' | 'online'

type FormData = {
  city: string
  street: string
  house: string
  building: string
  apartment: string
  firstName: string
  lastName: string
  email: string
  phone: string
  paymentMethod: PaymentMethod | ''
  details: string
}

type Props = {
  cartItems: CartItem[]
  onSubmit: (data: FormData) => void
}

export default function OrderForm({ cartItems, onSubmit }: Props) {
  const [form, setForm] = useState<FormData>({
    city: '',
    street: '',
    house: '',
    building: '',
    apartment: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: '',
    details: '',
  })

  const [errors, setErrors] = useState<string[]>([])

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const validate = (): boolean => {
    const errs: string[] = []
    if (!form.city.trim()) errs.push('Введите город')
    if (!form.street.trim()) errs.push('Введите улицу')
    if (!form.house.trim()) errs.push('Введите дом')
    if (!form.firstName.trim()) errs.push('Введите имя')
    if (!form.lastName.trim()) errs.push('Введите фамилию')
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.push('Введите корректный email')
    if (!form.phone.trim()) errs.push('Введите номер телефона')
    if (!form.paymentMethod) errs.push('Выберите способ оплаты')
    setErrors(errs)
    return errs.length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(form)
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit} noValidate>
      <div className={styles.left}>
        <h2>Личные данные</h2>
        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}

        <label>
          Город *
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Улица *
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Дом *
          <input
            type="text"
            name="house"
            value={form.house}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Корпус
          <input
            type="text"
            name="building"
            value={form.building}
            onChange={handleChange}
          />
        </label>

        <label>
          Квартира
          <input
            type="text"
            name="apartment"
            value={form.apartment}
            onChange={handleChange}
          />
        </label>

        <label>
          Имя *
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Фамилия *
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Электронная почта *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Номер телефона *
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset className={styles.paymentMethods}>
          <legend>Способ оплаты *</legend>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={form.paymentMethod === 'card'}
              onChange={handleChange}
              required
            />
            Банковская карта
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={form.paymentMethod === 'cash'}
              onChange={handleChange}
            />
            Наличные при получении
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={form.paymentMethod === 'online'}
              onChange={handleChange}
            />
            Онлайн-оплата
          </label>
        </fieldset>

        <label>
          Дополнительные детали
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <button type="submit" className={styles.submitBtn}>
          Отправить заказ
        </button>
      </div>

      <aside className={styles.right}>
        <h2>Корзина</h2>
        <ul className={styles.cartList}>
          {cartItems.map(({ id, title, price, quantity }) => (
            <li key={id} className={styles.cartItem}>
              <span className={styles.cartTitle}>{title}</span>
              <span>
                {quantity} × {price.toFixed(2)} BYN ={' '}
                {(price * quantity).toFixed(2)} BYN
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          Итого: <strong>{totalPrice.toFixed(2)} BYN</strong>
        </div>
      </aside>
    </form>
  )
}
