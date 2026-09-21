import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import NotFound from './pages/NotFound.jsx'
import { adminKeyFromUrl, isAdminKey } from './lib/adminKey'
import './styles.css'

// The responses page lives in its own chunk so regular visitors never download it.
const Responses = lazy(() => import('./pages/Responses.jsx'))

const root = createRoot(document.getElementById('root'))
const render = (node) => root.render(<StrictMode>{node}</StrictMode>)

const key = adminKeyFromUrl()
if (key === null) {
  render(<App />)
} else {
  isAdminKey(key).then((ok) =>
    render(
      ok ? (
        <Suspense fallback={null}>
          <Responses />
        </Suspense>
      ) : (
        <NotFound />
      ),
    ),
  )
}
