import React from 'react'
import '../App.css'
import '../styles/header.css'
import '../styles/main.css'
import Authorisation from './Authorisation'
import Registration from './Registration'

type Product = {
  id: number
  image: string
  name: string
  price: number
  available: boolean
}

type MainContentProps = {
  mainContent: string | undefined;
   setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const testProducts: Product[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 1',
    price: 1200,
    available: true,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 2',
    price: 850,
    available: false,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 3',
    price: 430,
    available: true,
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 4',
    price: 2999,
    available: true,
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 5',
    price: 150,
    available: false,
  },
   {
    id: 6,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 6',
    price: 150,
    available: false,
  },
   {
    id: 7,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 7',
    price: 150,
    available: false,
  },
   {
    id: 8,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 8',
    price: 150,
    available: false,
  },
   {
    id: 9,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 9',
    price: 150,
    available: false,
  },
   {
    id: 10,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 10',
    price: 150,
    available: false,
  },
   {
    id: 11,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 11',
    price: 150,
    available: false,
  },
   {
    id: 12,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 12',
    price: 150,
    available: false,
  },
   {
    id: 13,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 13',
    price: 150,
    available: false,
  },
   {
    id: 14,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 14',
    price: 150,
    available: false,
  },
   {
    id: 15,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 15',
    price: 150,
    available: false,
  },
   {
    id: 16,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 16',
    price: 150,
    available: false,
  },
   {
    id: 17,
    image: 'https://via.placeholder.com/150',
    name: 'Товар 17',
    price: 150,
    available: false,
  },
]


export default function MainComponent({mainContent, setMainContent}: MainContentProps) {
  switch (mainContent){
    case 'authorisation': return(<Authorisation setMainContent={setMainContent}/>)
    case 'registration': return(<Registration setMainContent={setMainContent}/>)
  case 'logo':
    
  case undefined:
  return (
    <main>
      <div className="main-wrapper">
        <section className="products-section">
          {testProducts.map((product) => (
            <article key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price} ₽</p>
              <p
                className={
                  product.available ? 'product-available' : 'product-unavailable'
                }
              >
                {product.available ? 'В наличии' : 'Нет в наличии'}
              </p>
            </article>
          ))}
        </section>

        <aside className="filter-panel">
          <h2>Фильтрация и сортировка</h2>
          {/* Здесь позже будут элементы фильтрации и сортировки */}
        </aside>
      </div>
    </main>
  )}
}

