import "./Navbar.scss"
import { GoSearch } from "react-icons/go"
import { FaGlobe, FaBell } from "react-icons/fa"
import { GrMenu as MenuIcon } from "react-icons/gr";
import { useSelector } from "react-redux"

const Navbar = (props) => {
    
    const user = useSelector((state) => state.user.currentUser)
    return(
        <div className="navbar">
            <div className="navbar--wrapper">
                <MenuIcon className="drawer" onClick={()=>props.handleMenuClick()} />
                <div className="search">
                    <input type="text" placeholder="Search" />
                    <div className="search--wrapper">
                        <GoSearch className="search--icon" />
                    </div>
                </div>
                <div className="items">
                    <div className="item lang">
                        <FaGlobe className="item--icon"  />
                        English
                    </div>
                    <div className="item">
                        <FaBell className="item--icon" />
                        <div className="badge">1</div>
                    </div>
                    <div className="item">
                        <img src={user.profileImg} alt="user-avatar" className="avatar" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar