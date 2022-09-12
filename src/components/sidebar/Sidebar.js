import "./Sidebar.scss"
//* new icons { home, users, orders, settings} 
import { VscDashboard as DashboardIcon, VscAccount as UsersIcon, VscArchive as OrdersIcon, VscGear as SettingsIcon } from "react-icons/vsc";
// {products, logout}
import { RiShoppingCartLine as ProductsIcon, RiLogoutBoxRLine as LogoutIcon } from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

const Sidebar = ({styleProp}) => {
    const forward = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        forward({
            type: "RESET"
        })
        navigate("/login")
    }

    return(
        <div className={styleProp ? 'sidebar toggled' : 'sidebar'} >
            <div className="top">
                <Link to="/">
                    <span className="logo">Admin</span>
                </Link>
            </div>
            {/* <hr /> */}
            <div className="center">
                <ul>
                    {/* <p className="title">Home</p> */}
                    <Link to="/">
                        <li>
                            <DashboardIcon className="sidebar--icon" />
                            <span>Home</span>
                        </li>
                    </Link>
                    
                    {/* <p className="title">Site</p> */}
                    <li onClick={()=>window.location.assign('/users')}>
                        <UsersIcon className="sidebar--icon"  />
                        <span>Users</span>
                    </li> 
                    
                    <Link to="/orders">
                        <li>
                            <OrdersIcon className="sidebar--icon" />
                            <span>Orders</span>
                        </li>
                    </Link>
                    
                    <Link to="/products">
                        <li>
                            <ProductsIcon className="sidebar--icon" />
                            <span>Products</span>
                        </li>
                    </Link>

                    {/* <p className="title">User</p> */}
                    <Link to="/settings">
                        <li>
                            <SettingsIcon className="sidebar--icon" />
                            <span>Settings</span>
                        </li>
                    </Link>
                    
                    <li onClick={handleLogout}>
                        <LogoutIcon className="sidebar--icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                {/* <div 
                    className="sidebar--icon" 
                    onClick={handleClick}
                >
                    {isDarkMode ?
                    <DarkMdIcon />
                    :
                    <LightMdIcon />
                    }
                </div> */}
            </div>
        </div>
    )
}

export default Sidebar