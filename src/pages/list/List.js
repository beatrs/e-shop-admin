
import "./List.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useState, useEffect } from "react"

import { adminRequest, userRequest } from "../../reqMethods"
import { Link, useNavigate } from "react-router-dom"

const List = ({type}) => {
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    useEffect(() => {
    
      const getUsers = async () => {
        try {
            const userQuery = `/users`
            const res = await adminRequest.get(userQuery)
            setUsers(modList(res.data))
        } catch (err) {
            console.error(err)
        }
      }

      const getProducts = async () => {
        try {
            const prodQuery = `/products`
            const res = await userRequest.get(prodQuery)
            setProducts(modList(res.data))
        } catch (err) {
            console.error(err)
        }
      }

      const getOrders = async () => {
        try {
            const query = `/orders`
            const res = await adminRequest.get(query)
            setOrders(modList(res.data))
        } catch (err) {
            console.error(err)
        }
      }

      getUsers()
      getProducts()
      getOrders()
    }, [])

    
    const modList = (arr) => {
        try {
            const newArr = arr.map(obj => ({
                ...obj,
                'id': arr.indexOf(obj) + 1
            }))

            return newArr
        } catch (err) {
            console.error(err)
        }
    }

    const getDatatable = () => {
        if (type === 'products')
            return <Datatable rows={products} type="prod" />
        else if (type === 'users')
            return <Datatable rows={users} type="user" />
        else if (type === 'orders')
            return <Datatable rows={orders} type="order" />
    }
    
    const [isToggled, setIsToggled] = useState(false)
    const navigate = useNavigate()
    
    return (
        <div className="list">
            <Sidebar styleProp={isToggled} />
            <div className="list--container" onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                <div className="list--top">
                    <h2>{type}</h2>
                    {type !== 'orders' &&
                    <button onClick={()=>navigate(`/${type}/new`)}>Add New</button>
                    }
                </div>
                
                { getDatatable() }
            </div>
        </div>
    )
}

export default List