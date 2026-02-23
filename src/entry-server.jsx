import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { SSRProvider } from './context/SSRContext.jsx'

export function render() {
  return renderToString(
    <SSRProvider isSSR={true}>
      <App />
    </SSRProvider>
  )
}
