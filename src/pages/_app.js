import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { AppProvider } from '../../state/context'
import store from '../../state/redux/store'
import Navbar from './components/Navbar'

export default function App({ Component, pageProps }) {
  return <>
 <Provider store={store}>
  <Navbar/>
   <AppProvider>
   <Component  {...pageProps} />
   </AppProvider>
   </Provider>
    </>
}
