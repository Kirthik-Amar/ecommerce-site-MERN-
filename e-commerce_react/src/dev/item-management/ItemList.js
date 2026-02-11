import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function ItemList() {
    const [itemArray, setItemArray] = useState([])

    const getData = async() => {
        await axios.get(process.env.REACT_APP_BACKEND_URL_ITEMS)
        .then(response => {
            console.log(response.data)
            setItemArray(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {getData()}, [])

    const delete1 = async(record) => {
        if(window.confirm(`Are you sure to delete ${record.itemName}?`)) {
            await axios.delete(process.env.REACT_APP_BACKEND_URL_ITEMS + record._id)
            .then(() => {
                console.log('Deleted')
                let updatedArray = itemArray.filter(items => items._id !== record._id)
                setItemArray(updatedArray)
            })
            .catch(error => console.log(error))
        }
    }

    return(
        <>
        <h1>Item List</h1>
        {itemArray.length === 0 &&<h1>No data found</h1>}
        {itemArray.length !== 0 && (
            <div className='table-responsive'>
            <table className='table table-striped table-bordered table-hover'>
            <thead><tr><th>S.No</th><th>Itemname</th><th>ItemId</th><th>Price</th></tr></thead>
            <tbody>
                {itemArray.map((record, index) => {
                    return <tr key={record._id}> 
                    <td>{index + 1}</td>
                    <td>{record.itemName}</td>
                    <td>{record.itemId}</td>
                    <td>{record.price}</td>
                    <td className='center'><Link to={'/item-edit/' + record._id}><button>Edit</button></Link></td>
                    <td><button onClick={() => delete1(record)}>Delete</button></td>
                    </tr>
                })}
            </tbody>
            </table>
            </div>
        )}
        </>
    )
}

export default ItemList;