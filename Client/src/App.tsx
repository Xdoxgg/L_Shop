import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import MainComponent from './components/MainComponent'

function App() {
  const [mainContent, setMainContent] = useState<string | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  return (
    <>
      <Header 
        setMainContent={setMainContent} 
        onSearch={setSearchTerm}
        searchTerm={searchTerm} 
      />
      <main>
        <MainComponent 
          setMainContent={setMainContent} 
          mainContent={mainContent}
          searchTerm={searchTerm} 
        />
      </main>
      {/* <User></User> */}
      {/* <Cart></Cart> */}
    </>
  )
}

export default App