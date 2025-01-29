import { createRoot } from 'react-dom/client'
import { UserContextProvider} from './context/UserContext.jsx'
import { ProductContextProvider } from './context/ProductContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <ProductContextProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </ProductContextProvider>,
)
