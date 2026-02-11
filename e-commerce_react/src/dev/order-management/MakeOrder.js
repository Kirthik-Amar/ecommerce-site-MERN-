import {useState} from 'react';
import axios from 'axios';

function MakeOrder() {
    const [itemsArray, setItemsArray] = useState([])

    const [itemName, setItemName] = useState('')
    const [itemId, setItemId] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState('')
    const [selectedRecord, setSelectedRecord] = useState({_id:'', itemName:'', price:null, quantity:null})
    const [cartArray, setCartArray] = useState([])

    const changeItemName = (e) => setItemName(e.target.value)
    const changeItemId = (e) => setItemId(e.target.value)
    const changeQuantity = (e) => setQuantity(e.target.value)

    const reset = () => {
        setItemName('')
        setItemId('')
    }

    const submitForm = async(e) => {
        e.preventDefault();
        let formData = {itemName:itemName, itemId:itemId}
        await axios.post(process.env.REACT_APP_BACKEND_URL_ITEMS + 'search', formData, {headers:{"x-access-token":`${localStorage.getItem('jwt_token')}`}})
        .then(response => {
            console.log('response.data', response.data)
            setItemsArray(response.data)
        })
        .catch(error => {
            console.log(error)
            setError('error name:' + error.name + 'error message:' + error.message)
        })
    }

    const selectedToOrder = async(record) => {
        setSelectedRecord({_id:record._id, itemName:record.itemName, itemId:record.itemId, price:record.price, quantity:0})
    }

    const addToCart = async() => {
        let tempRecord = selectedRecord
        tempRecord.quantity = quantity
        if (quantity > 0 && selectedRecord.itemName !== '') {
            setCartArray(prevArray => [...prevArray, tempRecord])
        } else {
            alert('Select an item')
        }
    }

    const removeFromCart = async(record) => {
        setCartArray(prevArray => prevArray.filter(item => item.itemId !== record.itemId))
    }

    const confirmOrder = async () => {
        if(cartArray.length === 0){
            alert('Cart is empty')
            return
        }
        let orderData = {userName:localStorage.getItem('currentUserName'), emailId:localStorage.getItem('currentUserEmail'),
            orderList: JSON.stringify(cartArray), delivered:'no',
        fullAddress: localStorage.getItem('currentUserAddress'), phoneNo:localStorage.getItem('currentUserPhoneNo') }
        await axios.post(process.env.REACT_APP_BACKEND_URL_ORDERS, orderData)
        .then(response => {

            console.log('inserted:', response.data)
            reset()
            setItemsArray([])
            setCartArray([])
            setSelectedRecord({_id:'', itemName:'', itemId:'', price:null, quantity:null})
            setQuantity(0)
        })
        .catch(error => {
            console.log(error)
            setError('error name:' + error.name + 'error message:' + error.message)
        })
    }

    return(
        <>
    {error !== '' && <h4 className='error' style={{whiteSpace:'prep-wrap'}}>{error}</h4>}

    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px'}}>

    <div className='smallerWindow' style={{width:'100%'}}>
        <h6 style={{textAlign:'center'}}>Step 1: Search an item</h6>
        <form onSubmit={submitForm}>
            <input type='text' onChange={changeItemName} value={itemName} name='itemName' placeholder='Enter item name' /> &nbsp;
            <input type='text' placeholder='Enter item Id' name='itemId' onChange={changeItemId} value={itemId} /> &nbsp;
            <button type='submit' className='btn btn-success'>Search</button> &nbsp; <button type='reset' className='btn btn-warning' onClick={reset}>Reset</button>
        </form>
    </div>

    <div className='smallerWindow' style={{width:'100%'}}>
        <h6>Step 3: Enter quantity and add to cart</h6>
        <div className='table-responsive'>
        <table className='table table-striped table-bordered table-hover'>
            <thead>
            <tr><th>Item Id</th><th>Item Name</th><th>Price</th><th>Quantity</th><th>Add to cart</th></tr>
            </thead>
            <tbody>
                <tr><td>{selectedRecord.itemId}</td><td>{selectedRecord.itemName}</td><td>{selectedRecord.price}</td>
                <td><input type='text' onChange={changeQuantity} value={quantity} name='quantity' placeholder='Enter Quantity' size='10' /></td>
                <td className='center'><button onClick={() => addToCart()}>click</button></td></tr>
            </tbody>
        </table>
        </div>
    </div>

    <div className='smallerWindow' style={{width:'100%'}}>
        <h6 style={{textAlign:'center'}}>Step 2: Select an item from search result</h6>
    {error === '' && itemsArray.length === 0 && <h6 className='error'>No data found</h6>}
    {error === '' && itemsArray.length !== 0 && (
    <div className='table-responsive'>
        <table className='table table-striped table-brdered table-hover'>
        <thead>
            <tr><th>Item Id</th><th>Item Name</th><th>Price</th><th>Select to Order</th></tr>
        </thead>
        <tbody>
        {itemsArray.map((record, index) => {
            return <tr key={record._id}>
        <td>{record.itemId}</td>
        <td>{record.itemName}</td><td>{record.price}</td>
        <td className='center'><button onClick={() => selectedToOrder(record)}click></button></td>
            </tr>
        })}
        </tbody>
        </table>
    </div>
    )}
    </div>

    <div className='smallerWindow' style={{width:'100%'}}>
    <h6>Step 4: Verify ordering items in cart and confirm order</h6>
    {error === '' && cartArray.length !== 0 && (
    <div className='table-responsive'>
    <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr><th>Item Id</th><th>Item Name</th><th>Price</th><th>Quantity</th><th>Remove</th></tr>
        </thead>
        <tbody>
            {cartArray.map((record, index) => {
                return <tr key={record._id}>
                    <td>{record.itemId}</td>
                    <td>{record.itemName}</td><td>{record.price}</td><td>{record.quantity}</td>
                    <td className='center'><button onClick={() => removeFromCart(record)}>click</button></td>
                </tr>
            })}
        </tbody>
    </table>
    </div>
    )}
      <div style={{textAlign:'center'}}><button onClick={() => confirmOrder()} className='btn btn-success'>Confirm order</button></div>
    </div>

    </div>
        </>
    )
}

export default MakeOrder;