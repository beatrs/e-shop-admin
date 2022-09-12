import "./Settings.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import styled from "styled-components"

import { TbSun as LightMdIcon, TbMoonStars as DarkMdIcon } from "react-icons/tb";
import { useContext, useEffect, useState } from "react"
import { DarkModeContext } from "../../context/darkMode"

const Icon = styled.div`
    border: ${props => props.isSelected && '1px solid gray'};
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    margin-right: 15px;
` 

const Settings = () => {
    const { darkMode, dispatch } = useContext(DarkModeContext)
    const [isDarkMode, setDarkMode] = useState(darkMode)

    const handleClick = (val) => {
        setDarkMode(val)
    }

    useEffect(() => {
        if (isDarkMode) {
            dispatch({ type: "setToDark" })
        } else {
            dispatch({ type: "setToLight" })
        }
    }, [isDarkMode])

    const [isToggled, setIsToggled] = useState(false)
    
    return (
        <div className="settings">
            <Sidebar styleProp={isToggled} />
            <div className="settings--container" onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                <div className="settings--main">
                    <h1 className="settings--heading">General Settings</h1>
                    <div className="settings--section">
                        <h2 className="settings--heading subheading">Theme</h2>
                        <div className="section--group">
                            <Icon isSelected={!isDarkMode}>
                                <LightMdIcon 
                                    className="settings--icon" 
                                    onClick={()=>handleClick(false)}
                                />
                            </Icon>
                            <Icon isSelected={isDarkMode}>
                                <DarkMdIcon 
                                    className="settings--icon" 
                                    onClick={()=>handleClick(true)}
                                />
                            </Icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings