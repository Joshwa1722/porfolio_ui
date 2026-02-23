import { createContext, useContext } from 'react'

const SSRContext = createContext(false)

export function SSRProvider({ children, isSSR = false }) {
  return <SSRContext.Provider value={isSSR}>{children}</SSRContext.Provider>
}

export function useIsSSR() {
  return useContext(SSRContext)
}
