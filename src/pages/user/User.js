
import { useEffect, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import "./User.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { userRequest } from "../../reqMethods"
import { FormatDate } from "../../services/general"
import Datatable from "../../components/datatable/Datatable"


const User = () => {
    const [user, setUser] = useState()
    const [userOrders, setUserOrders] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const userId = location.pathname.split("/").pop()
    console.log(location.pathname.split("/").pop())

    const redirectTo = (url) => {
        try {
            navigate(url)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const query = `/users/${userId}`
        const getUser = async () => {
            try {
                const res = await userRequest.get(query)
                setUser(res.data)
                console.log(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        const getUserOrders = async () => {
            try {
                const query = `/orders/${userId}/orders`
                const res = await userRequest(query)
                console.log(res.data)
                setUserOrders(modList(res.data))
            } catch (err) {
                console.error(err)
            }
        }
        getUser()
        getUserOrders()
    }, [userId])

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

    const [isToggled, setIsToggled] = useState(false)
    
    return (
        <div className="page">
            <Sidebar styleProp={isToggled} />
            <div className="page--container" onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                {user &&
                <div className="user--container">
                    <div className="info-card">
                        <div className="user--img">
                            <img src={user.profileImg} alt={user.coverAlt} />
                        </div>
                        <div className="user--info">
                            <h2 className="card--heading">
                                User Information
                            </h2>

                            <div className="info--grp">
                                <div className="info--lbl">Username:</div>
                                <div className="info--txt">{ user.username }</div>
                            </div>
                            <div className="info--grp">
                                <div className="info--lbl">E-mail:</div>
                                <div className="info--txt">{ user.email }</div>
                            </div>
                            <div className="info--grp">
                                <div className="info--lbl">Admin:</div>
                                <div className="info--txt">{ user.isAdmin ? 'YES' : 'NO' }</div>
                            </div>

                            <button className="info--btn" onClick={()=>redirectTo(`/users/edit/${user._id}`)}>Edit Details</button>
                        </div>
                    </div>
                    <div className="status-card">
                        {/* <div className="user--status">
                            <h2 className="status--lbl">Online</h2>
                        </div> */}
                        <h2 className="card--heading">
                            Member
                        </h2>
                        <div className="status--infoGrp">
                            <h3 className="status--lbl">Joined on:</h3>
                            <span className="status--info">
                                {user && FormatDate.getYmd(user.createdAt)}
                            </span>
                        </div>
                        <div className="status--infoGrp">
                            <h3 className="status--lbl">Last login:</h3>
                            <span className="status--info">
                                {user && user.lastLogin && FormatDate.getYmd(user.lastLogin)}
                            </span>
                        </div>
                    </div>
                    
                </div>
                }
                <Datatable classname={"orders--container"} rows={userOrders} type="userOrders" />
            </div>
        </div>
    )
}

export default User