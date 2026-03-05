import React from 'react'
import '../styles/item.css'
///Сорян Вик, это допиливаешь сама
interface ProductCardProps {
  title: string
  price: number
  available: boolean
  description: string
  category: string
  imageUrl: string
  onAddToCart?: () => void
}

export default function ItemCard({
  title,
  price,
  available,
  description,
  category,
  imageUrl,
  onAddToCart,
}: ProductCardProps){
  return (
    <article className="item-card" aria-label={`Товар: ${title}`}>
      <div className="item-card__image-wrapper">
        <img
          src={imageUrl}
          alt={title}
          className="item-card__image"
          loading="lazy"
          width={240}
          height={240}
        />
        {!available && <span className="item-card__badge">Нет в наличии</span>}
      </div>

      <div className="item-card__content">
        <h3 className="item-card__title" title={title}>
          {title}
        </h3>

        <p className="item-card__category">{category}</p>

        <p className="item-card__description" title={description}>
          {description.length > 120 ? description.slice(0, 117) + '...' : description}
        </p>

        <div className="item-card__footer">
          <span
            className={`item-card__price ${available ? '' : 'item-card__price--unavailable'}`}
            aria-label={available ? `Цена: ${price} BYN` : 'Цена недоступна'}
          >
            {available ? price.toLocaleString('ru-RU', { style: 'currency', currency: 'BYN' }) : '—'}
          </span>

          <button
            className="item-card__btn-add"
            onClick={onAddToCart}
            disabled={!available}
            aria-disabled={!available}
            aria-label={available ? `Добавить ${title} в корзину` : `Товар ${title} недоступен для покупки`}
            type="button"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </article>
  )
}
