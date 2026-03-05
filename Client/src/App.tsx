import React from 'react'
import './App.css'
import Header from './components/Header'
import MainComponent from './components/MainComponent'
import User from './components/User';
import ItemCard from './components/Item';
import Cart from './components/Basket';
function App() {
  
    const [mainContent, setMainContent] = React.useState<string | undefined>(undefined);
  
  return (
    <>
      <Header setMainContent={setMainContent}/>
      <MainComponent setMainContent={setMainContent} mainContent={mainContent}/>
      {/* <User></User> */}
      {/* <Cart></Cart> */}
    </>
  )
}

export default App
