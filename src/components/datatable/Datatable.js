import "./Datatable.scss"
import { HiOutlineSearchCircle as ViewIcon, HiOutlinePencilAlt as EditIcon, HiOutlineTrash as DeleteIcon } from "react-icons/hi"

import { DataGrid } from '@mui/x-data-grid'
import { Link, useNavigate } from "react-router-dom"
import { FormatDate } from '../../services/general'
import { useEffect } from "react"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 70,},
    { 
        field: 'username', headerName: 'Username', width: 200,
        renderCell: (params)=>{
            return (
                <div className="withImg">
                    <img className="rowImg profile" src={params.row.profileImg} alt="user avatar" />
                    <Link to={`${params.row._id}`} className="product--name">
                        <span className="rowTxt">{params.row.username}</span>
                    </Link>
                </div>
            )
        }
    },
    { field: 'email', headerName: 'E-mail', width: 230 },
]


const productColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
        field: 'product', headerName: 'Product Name', width: 350,
        renderCell: (params)=>{
            return (
                <div className="withImg">
                    <img className="rowImg" src={params.row.cover} alt={params.row.coverAlt} />
                    <Link to={`${params.row._id}`} className="product--name">
                        <span className="rowTxt">{params.row.title}</span>
                    </Link>
                </div>
            )
        },

    },
    { 
        field: 'desc', headerName: 'Description', width: 350, 
        renderCell: (params)=>{
            return (
                <div className="rowDesc">
                    <span className="rowDesc--txt">{params.row.desc}</span>
                </div>
            )
        }
    },
    { field: 'artistFormatted', headerName: 'Artist', width: 130 },
]

const orderColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
        field: 'createdAt', headerName: 'Order Date', width: 170,
        renderCell: (params)=>{
            return (
                <div>
                    <span className="rowTxt">{FormatDate.getYmd(params.row.createdAt)}</span>
                </div>
            )
        } 
    },
    { 
        field: 'user', headerName: 'Customer', width: 200,
        renderCell: (params)=>{
            return (
                <div>
                    <span className="rowTxt">{params.row._user.username}</span>
                </div>
            )
        } 
    },
    { 
        field: 'orders', headerName: 'Orders', width: 350,
        renderCell: (params)=>{
            const products = params.row.products.map(prod => prod._product.title)
            const prodList = products.join(', ')
            return (
                <div>
                    <span className="rowTxt">{prodList}</span>
                </div>
            )
        } 
    },
    { 
        field: 'status', headerName: 'Status', width: 150,
        renderCell: (params)=>{
            const status = params.row.status
            let bgColor
            if (status === 'fulfilled')
                bgColor = '#99C1B9'
            else if (status === 'pending')
                bgColor = '#F2D0A9'
            else
                bgColor = '#D88C9A'
            const rowStyles = {
                background: bgColor
            }
            return (
                <div>
                    <span className="rowTxt--status" style={rowStyles}>{params.row.status}</span>
                </div>
            )
        } 
    }
]

const userOrdersColumn = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
        field: 'createdAt', headerName: 'Order Date', width: 170,
        renderCell: (params)=>{
            return (
                <div>
                    <span className="rowTxt">{FormatDate.getYmd(params.row.createdAt)}</span>
                </div>
            )
        } 
    },
    { 
        field: 'orders', headerName: 'Orders', width: 350,
        renderCell: (params)=>{
            const products = params.row.products.map(prod => prod._product.title)
            const prodList = products.join(', ')
            console.log(prodList)
            return (
                <div>
                    <span className="rowTxt">{prodList}</span>
                </div>
            )
        } 
    }, 
    { 
        field: 'status', headerName: 'Status', width: 150,
        renderCell: (params)=>{
            const status = params.row.status
            let bgColor
            if (status === 'fulfilled')
                bgColor = '#99C1B9'
            else if (status === 'pending')
                bgColor = '#F2D0A9'
            else
                bgColor = '#D88C9A'
            const rowStyles = {
                background: bgColor,
            }
            return (
                <div>
                    <span className="rowTxt--status" style={rowStyles}>{params.row.status}</span>
                </div>
            )
        } 
    }
]


const Datatable = ({rows, type, classname}) => {
    const actionColumn = [
        { 
            field: 'actions', headerName: 'Actions', width: 200,  
            renderCell: (params) => {
                return (
                    <div className="actionRow">
                        {/* <Link to={`${params.row._id}`}><ViewIcon className="action--btn" /></Link>
                        <Link to={`edit/${params.row._id}`}><EditIcon className="action--btn" /></Link> */}
                        <ViewIcon className="action--btn" onClick={()=>redirectTo(`${params.row._id}`)} />
                        <EditIcon className="action--btn" onClick={()=>redirectTo(`edit/${params.row._id}`)} />
                        <DeleteIcon className="action--btn md" />
                    </div>
                )
            }
        }
    ]


    const navigate = useNavigate()
    const redirectTo = (url) => {
        navigate(url)
    }
    
    // const columns = type === 'prod' ? productColumns : userColumns
    let columns
    if (type === 'prod')
        columns = productColumns
    if (type === 'user')
        columns = userColumns
    if (type === 'order')
        columns = orderColumns
    if (type === 'userOrders')
        columns = userOrdersColumn
        
    return (
        <div className={`datatable ${classname}`}>
            <DataGrid
                className="datagrid"
                rows={rows}
                columns={columns.concat(actionColumn)}
                getRowId={(row) => row._id}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

export default Datatable