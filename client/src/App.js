import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { StoreProvider } from './utils/GlobalStore'
import Footer from './components/Footer/index'
import AlertBar from './components/AlertBar'
// pages
import Products from './pages/Products'
import Register from './pages/Register/index.js'
import Login from './pages/Login/index'
import Logout from './pages/Logout'
import Messages from './pages/Messages'
import UserCreation from './pages/UserCreation.js'
import Swiper from './pages/Swiper'

function App() {
   return (
      <StoreProvider>
         <BrowserRouter>
            <div className="container">
               <AlertBar />
               <Route exact path={['/', '/products']} component={Products} />
               <Route exact path='/info' component={UserCreation} />
               <Route exact path='/browse' component={Swiper} />
               <Route exact path="/register" component={Register} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/logout" component={Logout} />
               <Route exact path="/messages" component={Messages} />
            </div>
         </BrowserRouter>
         <Footer/>
      </StoreProvider>
      
   )
}

export default App