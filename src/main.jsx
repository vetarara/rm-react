// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// создаёт корень реакт-приложения
// StrictMode - специальная обёртка, которая помогает находить потенциальные проблемы во время разработки
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>
)

// В React 18/19 в режиме разработки useEffect специально выполняется два раза, 
// чтобы помочь найти ошибки.