import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import './index.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
  // <React.StrictMode>
    // <App />
 // </React.StrictMode>,
)
