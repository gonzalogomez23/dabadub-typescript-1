import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import router from '@/router'
import { ContextProvider } from '@contexts/ContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
)
