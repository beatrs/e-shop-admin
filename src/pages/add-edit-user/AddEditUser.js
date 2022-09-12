import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./AddEditUser.scss"

import { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { userRequest, adminRequest } from "../../reqMethods"

import { serialize } from 'object-to-formdata'

const AddEditUser = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    // const userId = location.pathname.split("/").pop()
    const userId = params.uId
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        profileImg: '',
        isAdmin: 'false'
    })
    const [image, setImage] = useState({
        file: '',
        previewUrl: user.profileImg
    })

    //get user
    useEffect(() => {
        const query = `/users/${userId}`
        const getUser = async () =>  {
            try {
                const res = await userRequest.get(query)
                setUser(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        if (userId) {
            getUser()
        }

    }, [userId])

    const handleFormChange = (e) => {
        const prop = e.target.name
        // const val = e.target.value
        let val = e.target.value
        if (prop === 'isAdmin') {
            val = e.target.value === 'true' ? true : false
        } 
        
        try {
            setUser(prevState => ({
                ...prevState,
                [prop]: val
            }))
        } catch (err) {
            console.error(err)
        }
    }

    //* image handling
    const handleImgChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.onloadend = () => {
            setImage({
                file: file,
                previewUrl: reader.result
            })
            setUser(prevState => ({
                ...prevState,
                profileImg: file
            }))
        }
        reader.readAsDataURL(file)
    }


    const handleSave = async(e) => {
        e.preventDefault()
        const formData = serialize(user)
        console.log(formData)
        console.log(user)
        try {
            if (userId) {
                const url = `/users/${userId}`
                const res = await adminRequest.put(url, formData)
                    .then(res => {
                        if (res.status === 200) 
                            navigate('../', {replace: true})
                    })
            } else {
                const url = `/auth/register`
                const res = await adminRequest.post(url, formData)
                    .then(res => {
                        if (res.data) 
                            navigate('../', {replace: true})
                    })
            }
            
        } catch (err) {
            console.error(err)
        }
    }

    const [isToggled, setIsToggled] = useState(false)
    
    return (
        <div className="form">
            <Sidebar styleProp={isToggled} />
            <div className="form--container" onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                {user && 
                <div className="user-form">
                    <form>
                        <h2>{!userId ? 'Add New User': 'Edit User'}</h2>
                        <div className="form-body">
                            <div className="section--left">
                                <div className="form--item">
                                    <label>Profile Image</label>
                                    <div className="input--wrapper">
                                        <div className="image--input">
                                            <div className="image" >
                                                <img src={image.previewUrl || user.profileImg} alt="" />
                                                <div className="upload-btn" style={{ opacity: userId || user.profileImg ? '0' : '1' }}>
                                                    <input type="file" onChange={(e)=>handleImgChange(e)} />
                                                    <button type="button"></button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="section--right">
                                <div className="form--item">
                                    <label>First Name</label>
                                    <input type="text" name="firstName" value={user.firstName || ""} onChange={handleFormChange} />
                                </div>
                                <div className="form--item">
                                    <label>Last Name</label>
                                    <input type="text" name="lastName" value={user.lastName || ""} onChange={handleFormChange} />
                                </div>
                                <div className="form--item">
                                    <label>Username</label>
                                    <input type="text" name="username" value={user.username || ""} onChange={handleFormChange} />
                                </div>
                                <div className="form--item">
                                    <label>E-mail</label>
                                    <input type="text" name="email" value={user.email || ""} onChange={handleFormChange} />
                                </div>
                                {!userId &&
                                <div className="form--item">
                                    <label>Password</label>
                                    <input type="password" name="password" value={user.password || ""} onChange={handleFormChange} />
                                </div>
                                }
                                <div className="form--item">
                                    <label>User Role</label>
                                    <select name="isAdmin" onChange={handleFormChange} value={userId ? user.isAdmin.toString() : 'false'}>
                                        <option value='false'>User (no administrator access)</option>
                                        <option value='true'>Global administrator</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button className="save--btn" type="button" onClick={handleSave}>Save</button>
                    </form>
                </div>
                }
            </div>
        </div>
    )
}

export default AddEditUser