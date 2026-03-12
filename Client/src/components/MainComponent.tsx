import React, { useState } from 'react'
import '../App.css'
import '../styles/header.css'
import '../styles/main.css'
import Authorisation from './Authorisation'
import Registration from './Registration'
import Basket from './Basket'

type Product = {
  id: number
  image: string
  name: string
  price: number
  available: boolean
  category: string 
}

type MainContentProps = {
  mainContent: string | undefined;
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchTerm: string; 
}

const testProducts: Product[] = [
  
  {
    id: 1,
    image: 'https://via.placeholder.com/150/FFD700/000000?text=🍺',
    name: 'Пиво Жигулевское',
    price: 8,
    available: true,
    category: 'Пиво'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150/FFA500/000000?text=🍺',
    name: 'Пиво Балтика 7',
    price: 7,
    available: true,
    category: 'Пиво'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150/FF4500/000000?text=🍺',
    name: 'Пиво Хайнекен',
    price: 12,
    available: true,
    category: 'Пиво'
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150/FF8C00/000000?text=🍺',
    name: 'Пиво Крушовице',
    price: 11,
    available: true,
    category: 'Пиво'
  },
  {
    id: 5,
    image: 'https://via.placeholder.com/150/DEB887/000000?text=🍺',
    name: 'Пиво Старопрамен',
    price: 13,
    available: false,
    category: 'Пиво'
  },
  // Сухарики
  {
    id: 6,
    image: 'https://via.placeholder.com/150/D2691E/FFFFFF?text=🥨',
    name: 'Сухарики Кириешки с беконом',
    price: 4,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 7,
    image: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=🥨',
    name: 'Сухарики Воронцовские с сыром',
    price: 5,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 8,
    image: 'https://via.placeholder.com/150/CD853F/FFFFFF?text=🥨',
    name: 'Сухарики Хрустящий картофель',
    price: 4,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 9,
    image: 'https://via.placeholder.com/150/BC8F8F/FFFFFF?text=🥨',
    name: 'Сухарики Фишка с солью',
    price: 3,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 10,
    image: 'https://via.placeholder.com/150/D2B48C/FFFFFF?text=🥨',
    name: 'Сухарики Хрустерики с паприкой',
    price: 4,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 11,
    image: 'https://via.placeholder.com/150/C0C0C0/000000?text=🍺',
    name: 'Пиво Эфес',
    price: 9,
    available: true,
    category: 'Пиво'
  },
  {
    id: 12,
    image: 'https://via.placeholder.com/150/FFD700/000000?text=🍺',
    name: 'Пиво Старый Мельник',
    price: 8,
    available: true,
    category: 'Пиво'
  },
  {
    id: 13,
    image: 'https://via.placeholder.com/150/FF6347/000000?text=🍺',
    name: 'Пиво Афанасий',
    price: 11,
    available: true,
    category: 'Пиво'
  },
  {
    id: 14,
    image: 'https://via.placeholder.com/150/F4A460/FFFFFF?text=🥨',
    name: 'Сухарики Три корочки с чесноком',
    price: 4,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 15,
    image: 'https://via.placeholder.com/150/DEB887/FFFFFF?text=🥨',
    name: 'Сухарики Емеля с грибами',
    price: 5,
    available: true,
    category: 'Сухарики'
  },
  {
    id: 16,
    image: 'https://via.placeholder.com/150/D2B48C/FFFFFF?text=🥨',
    name: 'Сухарики Хлебный спас с салом',
    price: 6,
    available: false,
    category: 'Сухарики'
  },
]

export default function MainComponent({mainContent, setMainContent, searchTerm}: MainContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  switch (mainContent){
    case 'authorisation': 
      return <Authorisation setMainContent={setMainContent} />
    case 'registration': 
      return <Registration setMainContent={setMainContent} />
    case 'Basket': 
      return <Basket setMainContent={setMainContent} />
    case 'logo':
    case undefined:
      const filteredProducts = testProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });

      const categoryCounts = testProducts.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return (
        <div className="main-wrapper">
          <section className="products-section">
            {searchTerm && (
              <div className="search-info">
                <h2>Результаты поиска: "{searchTerm}"</h2>
                <p>Найдено товаров: {filteredProducts.length}</p>
              </div>
            )}
            
            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <article key={product.id} className="product-card">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.price} ₽</p>
                    <p className="product-category">{product.category}</p>
                    <p
                      className={
                        product.available ? 'product-available' : 'product-unavailable'
                      }
                    >
                      {product.available ? 'В наличии' : 'Нет в наличии'}
                    </p>
                    {product.available && (
                      <button className="add-to-cart-btn">В корзину</button>
                    )}
                  </article>
                ))
              ) : (
                <div className="no-results">
                  <p>По вашему запросу ничего не найдено</p>
                  <p>Попробуйте изменить поисковый запрос</p>
                </div>
              )}
            </div>
          </section>

          <aside className="filter-panel">
            <h2>Фильтрация</h2>
            
            <div className="filter-section">
              <h3>Категории</h3>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={selectedCategory === 'all'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                Все товары ({testProducts.length})
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="Пиво"
                  checked={selectedCategory === 'Пиво'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                Пиво ({categoryCounts['Пиво'] || 0})
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value="Сухарики"
                  checked={selectedCategory === 'Сухарики'}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                Сухарики ({categoryCounts['Сухарики'] || 0})
              </label>
            </div>

            {searchTerm && (
              <button 
                className="clear-search-btn"
                onClick={() => {
                  
                }}
              >
                Сбросить поиск
              </button>
            )}
          </aside>
        </div>
      )
  }
}