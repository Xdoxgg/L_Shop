import React from 'react'
import './App.css'
import Header from './components/header'
import MainComponent from './components/MainComponent'

function App() {
  const [mainContent, setMainContent] = React.useState<string>('main');
   const onClickHandler = () => {
      setMainContent('main2')
   }
  return (
    <>
      <Header/>
      <MainComponent content={mainContent}/>
      <button onClick={() => onClickHandler()}>click</button>
     </>
  )
}

export default App
