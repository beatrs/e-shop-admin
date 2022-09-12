import React, { useContext } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import List from "./pages/list/List"
import Item from "./pages/item/Item"
import Settings from "./pages/settings/Settings"
import AddEditItem from "./pages/add-edit-item/AddEditItem"
import './styles/darkMode.scss'

import { DarkModeContext } from "./context/darkMode"
import { useSelector } from "react-redux"
import AddEditUser from "./pages/add-edit-user/AddEditUser"
import User from "./pages/user/User"
import AddEditOrder from "./pages/add-edit-order/AddEditOrder"

const App = () => {
  
  const {darkMode} = useContext(DarkModeContext)
  const user = useSelector((state) => state.user.currentUser)
  const redirectTo = (url) => {
    return (
      <Navigate to={url} replace={true} />
    )
  } 

  const BASE = "admin"
  const LOGIN_URL = '/login'
  return(
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="admin" element={user ? <Home /> : redirectTo('/login')}> */}
          <Route path="/" element={user ? <Home /> : redirectTo('/login')} />
            
          <Route path="login" element={!user ? <Login /> : redirectTo('/')} /> 

          <Route path="users">
            <Route index element={user? <List type="users"/> : redirectTo(LOGIN_URL)} />
            <Route path=":uId" element={user? <User /> : redirectTo(LOGIN_URL)} />
            <Route path="new" element={user? <AddEditUser type="add" /> : redirectTo(LOGIN_URL)} />
            <Route path="edit/:uId" element={user? <AddEditUser type="edit" /> : redirectTo(LOGIN_URL)} />
          </Route>

          <Route path="orders">
            <Route index element={user ? <List type="orders" /> : redirectTo(LOGIN_URL)} />
            <Route path=":oId" element={user ? <AddEditOrder type="view" /> : redirectTo(LOGIN_URL)} />
            <Route path="edit/:oId" element={user ? <AddEditOrder type="edit" /> : redirectTo(LOGIN_URL)} />
          </Route>

          <Route path="products">
            <Route index element={user? <List type="products" /> : redirectTo(LOGIN_URL)} />
            <Route path=":pId" element={user ? <Item /> : redirectTo(LOGIN_URL)} />
            <Route path="new" element={user ? <AddEditItem type="add" /> : redirectTo(LOGIN_URL)} />
            <Route path="edit/:pId" element={user ? <AddEditItem type="edit" /> : redirectTo(LOGIN_URL)} />
          </Route>

          <Route path="settings" element={user? <Settings /> : redirectTo(LOGIN_URL)} />
        </Routes>
      </BrowserRouter>
    </div>
    
  )
}

export default App