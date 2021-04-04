import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { StoreProvider } from './utils/GlobalStore'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import AlertBar from './components/AlertBar'
import Chat from './components/Chat/Chat'
// pages
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Settings from './pages/Settings'


function App() {
   return (
      <StoreProvider>
         <BrowserRouter>
            <div className="container">
               <AlertBar />
               <NavBar />
               <Route exact path={['/', '/chat']} component={Chat} />
               <Route exact path="/settings" component={Settings} />
               <Route exact path="/register" component={Register} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/logout" component={Logout} />
               {/* <Route exact path="/chat" component={Chat} /> */}
               <Footer />
            </div>
         </BrowserRouter>
      </StoreProvider>
   )
}

export default App