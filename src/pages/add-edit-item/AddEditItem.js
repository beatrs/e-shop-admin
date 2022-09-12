import { useEffect, useState } from "react"
import "./AddEditItem.scss"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import { userRequest, adminRequest } from "../../reqMethods"
import { serialize } from 'object-to-formdata'

// Import the mde component
import Editor from "../../components/editor/Editor"

const AddEditItem = ({type}) => {
    //const [item, setItem] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const itemId = location.pathname.split("/").pop()
    const [item, setItem] = useState({
        title: '',
        artist: '',
        price: 0,
        desc: '',
        versions: [],
        categories: [],
        cover: '',
        coverAlt: '',
        img: '',
        imgAlt: '',
    })
 
    //get items
    useEffect(() => {
        const query = `/products/${itemId}`
        const getItem = async () =>  {
            try {
                const res = await userRequest.get(query)
                setItem(res.data)
            } catch (err) {
                console.error(err)
            }
        }

        if (itemId) {
            getItem()
        }
    }, [itemId])

    const handleFormChange = (e) => {
        const prop = e.target.name
        const val = e.target.value
        try {
            setItem(prevState => ({
                ...prevState,
                [prop]: val
            }))
        } catch (err) {
            console.error(err)
        }
    }

    // handle comma separated tags
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const prop = e.target.name
            const val = e.target.value
            try {
                // check if value already exists in array
                if (!item[prop].includes(val)) {
                    setItem(prevState => ({
                        ...prevState,
                        [prop]: [...prevState[prop], val]
                    }))
                    
                    // clear after
                    e.target.value = ""
                }
            } catch (err) {
                console.error(err)
            }
        }
    }

    const handleSave =  async (e) => {
        e.preventDefault()
        const formData = serialize(item)
        console.log(item)
        console.log(formData)
        try {
            let url = `/products`
            if (type === 'edit') {
                console.log('go here')
                url += `/${itemId}`
                const res = await adminRequest.put(url, formData)
                if (res.status === 200) 
                    navigate('../', {replace: true})

            } else {
                const res = await adminRequest.post(url, formData)
                if (res.status === 200) 
                    navigate('../', {replace: true})
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = (e, prop, value) => {
        e.preventDefault()
        // * takes property name since value is an object 
        const valueProp = Object.keys(value)[0]
        try {
            setItem(prevState => ({
                ...prevState,
                [prop]: prevState[prop].filter((propVal) => {
                    return propVal !== value[valueProp]
                })
            }))            
        } catch (err) {
            console.error(err)
        }
    }

    const versionTags = item.versions && item.versions.map(version => {
        return (
            <li key={version}>
                <span className="tag--name">{version}</span>
                <button className="tag--close" onClick={(e) => handleDelete(e, 'versions', {version})}>&times;</button>
            </li>
        )
    }) 

    const categoryTags = item.categories && item.categories.map(category => {
        return (
            <li key={category}>
                <span className="tag--name">{category}</span>
                <button className="tag--close" onClick={(e) => handleDelete(e, 'categories', {category})}>&times;</button>
            </li>
        )
    })


    const [image, setImage] = useState({ file: '', previewUrl: '' })
    const [image2, setImage2] = useState({ file: '', previewUrl: '' })

    const handleCoverChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.onloadend = () => {
            setImage({
                file: file,
                previewUrl: reader.result
            })
            setItem(prevState => ({
                ...prevState,
                cover: file
            }))
        }
        reader.readAsDataURL(file)
    }

    const handleImgChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        
        reader.onloadend = () => {
            setImage2({
                file: file,
                previewUrl: reader.result
            })
            setItem(prevState => ({
                ...prevState,
                img: file
            }))
        }
        reader.readAsDataURL(file)
    }

    const updateText = (newDesc) => {
        setItem(prevState => ({
            ...prevState,
            desc: newDesc
        }))
    }

    const [isToggled, setIsToggled] = useState(false)
    
    return (
        <div className="form">
            <Sidebar styleProp={isToggled} />
            <div className="form--container" onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                    {item && 
                    <div className="item-form">
                    <form>
                        <h2>{type === 'add' ? 'Add New item': 'Edit item'}</h2>
                        {/* FORM BODY */}
                        <div className="form--body">
                            {/* ! SECTION LEFT ! */}
                            <div className="section--left">
                                {/* COVER IMAGE */}
                                <div className="form--item">
                                    <label>Main Image</label>
                                    <div className="input--wrapper">
                                        <div className="image--input">
                                            <div className="image">
                                                <img src={image.previewUrl || item.cover} alt="" />
                                                <div className="upload-btn" style={{ opacity: image.previewUrl !== '' || item.cover !== '' ? '0' : '1' }}>
                                                    <input type="file" onChange={(e)=>handleCoverChange(e, image)} />
                                                    <button type="button">Click here to upload an image</button>
                                                </div>
                                            </div>
                                            
                                            <input type="text" name="coverAlt" value={item.coverAlt || ""} onChange={handleFormChange}  placeholder="Cover Alt Text" />
                                        </div>
                                    </div>
                                </div>
                                {/* OTHER IMAGE */}
                                <div className="form--item">
                                    <label>Secondary Image</label>
                                    <div className="input--wrapper">
                                        <div className="image--input">
                                            <div className="image">
                                                <img src={image2.previewUrl || item.img} alt="" />
                                                <div className="upload-btn" style={{ opacity: image2.previewUrl !== '' || item.img !== '' ? '0' : '1' }}>
                                                    <input type="file" onChange={(e)=>handleImgChange(e, image2)} />
                                                    <button type="button">Click here to upload an image</button>
                                                </div>
                                            </div>
                                            
                                            <input type="text" name="imgAlt" value={item.imgAlt || ""} onChange={handleFormChange}  placeholder="Image Alt Text" />
                                            <span className="help">Image not required</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* END OF SECTION LEFT */}

                            {/* SECTION RIGHT */}
                            <div className="section--right">
                                {/* PRODUCT NAME */}
                                <div className="form--item">
                                    <label>Product name</label>
                                    <input type="text" name="title" value={item.title || ""} onChange={handleFormChange} />
                                </div>
                                {/* DESCRIPTION */}
                                <div className="form--item">
                                    <label>Description</label>
                                    <Editor 
                                        currentText={item.desc || ""}
                                        updateText={updateText}
                                    />
                                </div>
                                {/* ARTIST NAME & PRICE */}
                                <div className="form--row">
                                    <div className="form--item">
                                        <label>Artist</label>
                                        <input type="text" name="artist" value={item.artist || ""} onChange={handleFormChange} />
                                    </div>
                                    <div className="form--item">
                                        <label>Price (PHP)</label>
                                        <input type="number" name="price" value={item.price || null} onChange={handleFormChange} min='0' placeholder={0}/>
                                    </div>
                                </div>
                                {/* VERSIONS */}
                                <div className="form--item">
                                    <label>Versions</label>
                                    <div className="item--multi">
                                        <input type="text" name="versions" onKeyPress={handleKeyPress} />
                                        <span className="help">Hit enter or comma to add tags</span>
                                        <ul className="tags">
                                            {versionTags}
                                        </ul>
                                    </div>
                                </div>
                                {/* CATEGORIES */}
                                <div className="form--item">
                                    <label>Categories</label>
                                    <div className="item--multi">
                                        <input type="text" name="categories" onKeyPress={handleKeyPress} />
                                        <span className="help">Hit enter or comma to add tags</span>
                                        <ul className="tags">
                                            {categoryTags}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* END OF SECTION RIGHT */}
                            
                        </div>
                        <button type="button" onClick={handleSave} className="save--btn">Save item details</button>
                    </form>
                    </div>
                    }
            </div>
        </div>
    )
}

export default AddEditItem