import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widget/Widget'
import { table as Table } from '../../components/table/Table'
import './Home.scss'
import { MdOutlineAttachMoney, MdShoppingCart } from "react-icons/md";
import { useState } from 'react'
const Home = () => {
    const [isToggled, setIsToggled] = useState(false)
    const toggleDrawer  = () => {
        setIsToggled(true)
        console.log(isToggled)
    }
    return(
        <div className='home'>
            <Sidebar styleProp={isToggled} />
            <div className='home--container' onClick={isToggled ? ()=>setIsToggled(false) : null} >
                <Navbar handleMenuClick={()=>setIsToggled(true)} />
                <div className='widgets'>
                    <Widget 
                        title='users'
                        icon={<MdOutlineAttachMoney className='widgets--icon'/>}
                        bdColor='salmon'
                        etcLbl='View all'
                        value='42609'
                        valueIcon={<MdOutlineAttachMoney />}
                    />
                    <Widget 
                        title='orders'
                        icon={<MdShoppingCart className='widgets--icon'/>}
                        bdColor='#1ac489'
                        etcLbl='View all'
                        value='120'
                    />
                    <Widget 
                        title='sales'
                        icon={<MdOutlineAttachMoney className='widgets--icon'/>}
                        bdColor='#3cb8ce'
                        etcLbl='View all'
                        value='42609'
                        valueIcon={<MdOutlineAttachMoney />}
                    />
                    <Widget 
                        title='revenue'
                        icon={<MdOutlineAttachMoney className='widgets--icon'/>}
                        bdColor='#f3c85b'
                        etcLbl='View all'
                        value='42609'
                        valueIcon={<MdOutlineAttachMoney />}
                    />
                </div>
                <div className='list--container'>
                    <div className='list--title'>list container</div>
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Home