import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import {CssBaseline} from '@mui/material'

createRoot(document.getElementById('root')).render(
    <>
      <div>
        <App />   
      </div>
    </>
)
