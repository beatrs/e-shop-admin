import "./Login.scss"
import logo_light from "../../assets/logos/xoxo-logos_white.png"
import logo_dark from "../../assets/logos/xoxo-logos_black.png"

import { login } from "../../redux/apiCalls"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearIsError } from "../../redux/userRedux"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const isError = useSelector((state) => state.user.isError)
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        login(dispatch, {username, password})
    }

    const Logo = (dark) => {
        return (
            <div className="logo">
                <img src={dark ? logo_dark : logo_light} alt="admin-logo" />
                <h2 className="logo--lbl">admin</h2>
            </div>
        )
    }
    return(
        <div className="login">
            <div className="login--bg">
							<img src={require("assets/images/main-bg.jpg")} alt="" loading="lazy"/>
						</div>
            <div className="bg-layer"></div>
            <div className="login--container">
                <div className="left">
                    {Logo(false)}
                </div>
                <div className="right">
                    <div className="form--container">
                        {Logo(true)}
                        <span className="right-lbl">Welcome to Admin Panel</span>
                        <h2 className="right-lbl">Login to your admin account</h2>
                        <form>
                            <div className="form--item">
                                <label>Username</label>
                                <input type="text" placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}/>
                            </div>
                            <div className="form--item">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <span>Never share your password to anyone</span>
                            <button onClick={handleLogin}>Sign In</button>
                            {isError &&
                            <div className="form--err">Incorrect username/password. Please try again</div>
                            }
                        </form>
                    </div>
                </div>
            </div>
            <div className="attribution">
                <a href="https://www.pexels.com/photo/magnificent-cloudy-sky-at-sunset-4534134/">© Photo by ArtHouse Studio from Pexels</a>
            </div>
        </div>
    )
}

export default Login