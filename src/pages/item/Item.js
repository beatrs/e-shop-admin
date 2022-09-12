
import { useEffect, useState, Fragment } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Item.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { userRequest } from "../../reqMethods"

import 'react-mde/lib/styles/css/react-mde-all.css'
import Showdown from "showdown"
import parse from 'html-react-parser';
import { FormatNumber } from "../../services/general"

const Item = () => {
    const [item, setItem] = useState()
    const location = useLocation()
    const itemId = location.pathname.split("/").pop()
    // console.log(itemId)
    useEffect(() => {
        const query = `/products/${itemId}`
        const getItem = async () => {
            try {
                const res = await userRequest.get(query)
                setItem(res.data)
                // console.log(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        getItem()
    }, [itemId])

    const navigate = useNavigate()    
    const redirectTo = (url) => {
        try {
            navigate(url, {replace: true})
        } catch (err) {
            console.error(err)
        }
    }

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    const convertedText = () => {
        return (
            <Fragment>
                {parse(converter.makeHtml(item.desc))}
            </Fragment>
        )
    }

    const [isToggled, setIsToggled] = useState(false)
    
    return (
        <div className="page">
            <Sidebar styleProp={isToggled} />
            <div className="page--container" onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                {item &&
                <div className="item--container">
                    <div className="item--img">
                        <img src={item.cover} alt={item.coverAlt} />
                    </div>
                    <div className="item--info">
                        <h2 className="info--title">
                            { item.title }
                        </h2>
                        {item.artist &&
                        <span className="info--item">
                            Artist: 
                            <span className="info--artist"> { item.artist }</span>
                        </span>
                        }
                        <span className="info--item">
                            Description: {convertedText()}
                        </span>
                        <span className="info--item">Price: ₱ { FormatNumber.withComma(item.price) }</span>
                        {item.versions &&
                        <div className="info--versions">
                            <span className="info--item">Versions:</span>
                            <ul>
                                {item.versions.map((version) => (
                                    <li key={version}>{version}</li>
                                ))}
                            </ul>
                        </div>
                        }
                        <button className="info--btn" onClick={()=>redirectTo(`/products/edit/${item._id}`)}>Edit Details</button>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Item