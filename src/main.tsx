import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

export default function Main(){
  const [darkMode,setDarkMode]=React.useState(false);
  function toggleDarkMode(){
    setDarkMode(prev => !prev);
  }
  React.useEffect(()=>{
    if(!darkMode){
      document.documentElement.setAttribute('class','light');
    }
    else{
      document.documentElement.setAttribute('class','dark');
    }
  },[darkMode])
  return(
    <App toggleTheme={toggleDarkMode} darkmode={darkMode}/>
  )
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>,
)
