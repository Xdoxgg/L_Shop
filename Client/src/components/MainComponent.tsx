import React, { useState, useEffect } from 'react'
import '../App.css'
import '../styles/header.css'
import '../styles/main.css'
import Authorisation from './Authorisation'
import Registration from './Registration'
import Basket from './Basket'
import User from './User'
import ItemCard from './Item'

type Product = {
  id: number
  image: string
  name: string
  price: number
  available: boolean
  category: string 
  description?: string
}

type MainContentProps = {
  mainContent: string | undefined;
  setMainContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchTerm: string; 
}

export default function MainComponent({mainContent, setMainContent, searchTerm}: MainContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{min: number; max: number}>({min: 0, max: 1000});
  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Тестовые данные
  const testProducts: Product[] = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150/FFD700/000000?text=🍺',
      name: 'Пиво Жигулевское',
      price: 8,
      available: true,
      category: 'Пиво',
      description: 'Классическое светлое пиво'
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150/FFA500/000000?text=🍺',
      name: 'Пиво Балтика 7',
      price: 7,
      available: true,
      category: 'Пиво',
      description: 'Традиционное пиво'
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150/FF4500/000000?text=🍺',
      name: 'Пиво Хайнекен',
      price: 12,
      available: true,
      category: 'Пиво',
      description: 'Премиальное пиво'
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150/D2691E/FFFFFF?text=🥨',
      name: 'Сухарики Кириешки с беконом',
      price: 4,
      available: true,
      category: 'Сухарики',
      description: 'Хрустящие сухарики'
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=🥨',
      name: 'Сухарики Воронцовские с сыром',
      price: 5,
      available: true,
      category: 'Сухарики',
      description: 'Сухарики с сыром'
    },
  ];

  useEffect(() => {
    setProducts(testProducts);
    const uniqueCategories = [...new Set(testProducts.map(p => p.category))];
    setCategories(uniqueCategories);
  }, []);

  // Фильтрация продуктов
  const filteredProducts = products.filter(product => {
    // Поиск по названию
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Фильтр по категории
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Фильтр по цене
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    // Фильтр по наличию
    const matchesAvailability = !showAvailableOnly || product.available;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
  });

  // Подсчет товаров по категориям
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleAddToCart = (product: Product) => {
    console.log('Добавлено в корзину:', product);
    alert(`${product.name} добавлен в корзину!`);
  };

  switch (mainContent){
    case 'authorisation': 
      return <Authorisation setMainContent={setMainContent} />
    case 'registration': 
      return <Registration setMainContent={setMainContent} />
    case 'Basket': 
      return <Basket setMainContent={setMainContent} />
    case 'user':
      return <User />
    case 'logo':
    case undefined:
      return (
        <div className="main-wrapper">
          <section className="products-section">
            {searchTerm && (
              <div className="search-info">
                <h2>Результаты поиска: "{searchTerm}"</h2>
                <p>Найдено товаров: {filteredProducts.length}</p>
              </div>
            )}
            
            {loading ? (
              <div className="loading">Загрузка товаров...</div>
            ) : (
              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ItemCard
                      key={product.id}
                      title={product.name}
                      price={product.price}
                      available={product.available}
                      description={product.description || ''}
                      category={product.category}
                      imageUrl={product.image}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))
                ) : (
                  <div className="no-results">
                    <p>По вашему запросу ничего не найдено</p>
                    <p>Попробуйте изменить параметры фильтрации</p>
                  </div>
                )}
              </div>
            )}
          </section>

          <aside className="filter-panel">
            <h2>Фильтры</h2>
            
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
                Все товары ({products.length})
              </label>
              {categories.map(category => (
                <label key={category} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {category} ({categoryCounts[category] || 0})
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>Цена</h3>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="От"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                  min="0"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="До"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                  min="0"
                />
              </div>
            </div>

            <div className="filter-section">
              <label className="filter-option checkbox">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                />
                Только в наличии
              </label>
            </div>

            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange({min: 0, max: 1000});
                setShowAvailableOnly(false);
              }}
            >
              Сбросить фильтры
            </button>
          </aside>
        </div>
      )
    default:
      return <div>Страница не найдена</div>
  }
}