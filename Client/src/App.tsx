import React from 'react'
import './App.css'
import Header from './components/Header'
import MainComponent from './components/MainComponent'

function App() {
  
    const [mainContent, setMainContent] = React.useState<string | undefined>(undefined);
  
  return (
    <>
      <Header setMainContent={setMainContent}/>
      <MainComponent setMainContent={setMainContent} mainContent={mainContent}/>
      
    </>
  )
}

export default App
