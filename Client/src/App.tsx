import React, { useState } from 'react'
import Header from './components/Header'
import MainComponent from './components/MainComponent'
import './App.css'

function App() {
  const [mainContent, setMainContent] = useState<string | undefined>('logo')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  return (
    <div className="App">
      <Header 
        setMainContent={setMainContent}
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />
      <MainComponent 
        mainContent={mainContent}
        setMainContent={setMainContent}
        searchTerm={searchTerm}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </div>
  )
}

export default App