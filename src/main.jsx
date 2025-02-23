import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GraphProvider } from './context/GraphContext';

createRoot(document.getElementById('root')).render(
   <div>
    <GraphProvider>
     <App />
    </GraphProvider>
   </div>
)
