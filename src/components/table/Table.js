import "./Table.scss"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const table = () => {
    const items = [
        {
            id: 1,
            img: "https://cf.shopee.com.my/file/971b71ad9ff60d881b363cb63cccf7d4",
            title: "Oneiric Diary",
            desc: "IZ*ONE 3rd Mini Album",
            artist: "IZ*ONE"
        },
        {
            id: 2,
            img: "https://cdn.shopify.com/s/files/1/0017/0439/4825/products/70428C6D-9724-4166-9D66-9C762E97F783_1024x1024@2x.jpg?v=1651034639",
            title: "FEARLESS",
            desc: "Le Sserafim 1st Mini Album",
            artist: "LE SSERAFIM"
        },
        {
            id: 3,
            img: "https://cf.shopee.com.br/file/47968e8fe11fb79baf3c756a56a1199a",
            title: "ELEVEN",
            desc: "IVE 1st Single Album",
            artist: "IVE"
        },
        {
            id: 4,
            img: "http://www.gasookpopgalore.net/image/cache/data/product/CD16/fromis9_2ndmini_04-down-600x600.jpg",
            title: "To. Day",
            desc: "fromis_9 2nd EP",
            artist: "fromis_9"
        },
    ]
    return (
        <TableContainer component={Paper} className="table--container">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className="col--heading cell">ID</TableCell>
                    <TableCell className="col--heading cell" align="right">Title</TableCell>
                    <TableCell className="col--heading cell" align="right">Artist</TableCell>
                    <TableCell className="col--heading cell" align="right">Description</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {items.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell className="cell" component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell className="cell" align="right">{row.title}</TableCell>
                    <TableCell className="cell" align="right">{row.artist}</TableCell>
                    <TableCell className="cell" align="right">{row.desc}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export { table }