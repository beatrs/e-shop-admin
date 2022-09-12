import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { adminRequest, userRequest } from "../../reqMethods"
import { FormatNumber } from "../../services/general"
import "./AddEditOrder.scss"

const AddEditOrder = ({type}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const orderId = location.pathname.split("/").pop()
    const [order, setOrder] = useState({
        _user: {
            username: '',
        },
        products: [],
        totalQty: 0,
        amount: 0,
        status: ''
    })
    const [statusOptions, setStatusOptions] = useState([
        "pending", "fulfilled", "cancelled"
    ])
    const [status, setStatus] = useState((order && order.status) || '')
    //get user
    useEffect(() => {
        const query = `/orders/${orderId}`
        const getOrder = async () =>  {
            try {
                const res = await userRequest.get(query)
                setOrder(res.data)
                setStatus(res.data.status)
            } catch (err) {
                console.error(err)
            }
        }

        if (orderId) {
            getOrder()
        }

    }, [orderId])

    let Title = ''
    if (type === 'view') {
        Title = 'View Order'
    } else if (type === 'add') {
        Title = 'Add New Order'
    } else if (type === 'edit') {
        Title = 'Edit Order'
    }

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            let url = `/orders`
            if (orderId) {
                url += `/${orderId}/${status}`
                console.log(url)
                const res = await adminRequest.put(url)
                if (res.status === 200) {
                    console.log(res)
                    navigate('../', {replace: true})
                }

            }
        } catch (err) {
            console.error(err)
        }
    }
    const orderStatus = () => {
        if (type === 'view') {
            return (
                <span className="row--info">{order.status}</span>
            )
        } else {
            return (
                <div className="status--dropdown">
                    <select name="status" onChange={(e)=>setStatus(e.target.value)} defaultValue={status}>
                        <option disabled defaultValue={true}>{order.status}</option>
                        {statusOptions && statusOptions.map((status) => (
                            <option value={status} key={statusOptions.indexOf(status)}>{status}</option>
                        ))
                        }
                    </select>
                </div>
            )
        }
    }
    const [isToggled, setIsToggled] = useState(false)
    return (
        <div className="form">
            <Sidebar styleProp={isToggled} onClick={isToggled ? ()=>setIsToggled(false) : null} />
            <div className="form--container">
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                {order &&
                <div className="item-form">
                    <form className="order-form">
                        <h2>{Title}</h2>
                        <div className="form--body">
                            <div className="form--row">
                                <span className="row--lbl">Customer</span>
                                <span className="row--info">{order._user.username}</span>
                            </div>
                            <div className="form--row">
                                <span className="row--lbl">Items</span>
                                <ul className="row--info">
                                {order.products && order.products.map(item => {return(
                                    <li key={item._id}>
                                        {item._product.title} - {item._product.artistFormatted} {item.version} &times;{item.quantity}
                                    </li>
                                )})}     
                                </ul>
                            </div>
                            <div className="form--row">
                                <span className="row--lbl">Total Quantity</span>
                                <span className="row--info">{order.totalQty}</span>
                            </div>
                            <div className="form--row">
                                <span className="row--lbl">Total Amount</span>
                                <span className="row--info">PHP {FormatNumber.withComma(order.amount)}</span>
                            </div>
                            <div className="form--row">
                                <span className="row--lbl">Order Status</span>
                                {orderStatus()}
                            </div>
                        </div>
                        {type === 'edit' &&
                        <button type="button" onClick={handleSave} className="save--btn">Save changes</button>
                        }
                    </form>
                </div>
                }
            </div>
        </div>
    )
}

export default AddEditOrder