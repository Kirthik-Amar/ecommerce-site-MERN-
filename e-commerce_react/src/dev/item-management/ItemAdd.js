import {useState} from 'react'
import axios from 'axios'

function ItemAdd() {
    const [itemName, setItemName] = useState('')
    const [itemNameError, setItemNameError] = useState('')
    const [itemId, setItemId] = useState('')
    const [itemIdError, setItemIdError] = useState('')
    const [price, setPrice] = useState('')
    const [priceError, setPriceError] = useState('')

    const changeItemName = (e) => setItemName(e.target.value)
    const changeItemId = (e) => setItemId(e.target.value)
    const changePrice = (e) => setPrice(e.target.value)

    const validateItemName = () => {
        let isValid = true
        setItemNameError('')
        if(!itemName){
            isValid = false
            setItemNameError('Itemname cannot be empty')
        }
        return isValid
    }

    const validateItemId = () => {
        let isValid = true
        setItemIdError('')
        if(!itemId){
            isValid = false
            setItemIdError('ItemId cannot be empty')
        }
        return isValid
    }

    const validatePrice = () => {
        let isValid = true
        setPriceError('')
        if(!price){
            isValid = false
            setPriceError('Price cannot be empty')
        }
        return isValid
    }

    const reset = () => {
        setItemName('')
        setItemNameError('')
        setItemId('')
        setItemIdError('')
        setPrice('')
        setPriceError('')
    }

    const submitForm = async(e) => {
        e.preventDefault();
        if(validateItemName() && validateItemId() && validatePrice()){
            let body = {itemName, itemId, price, active:'yes'}
            await axios.post(process.env.REACT_APP_BACKEND_URL_ITEMS, body)
            .then(response => {
                console.log('Inserted', response.data)
                reset()
                window.location.pathname = '/item-list'
            })
            .catch(error => console.log(error))
        } else {
            console.log('Not inserted')
        }
    }

    return(
        <>
        <div className='smallerWindow'>
        <h1>Item Add</h1>
        <form onSubmit={submitForm}>
        <div className='form-group'>
            <label>Item name:</label>
            <input type='text' name='itemName' value={itemName} placeholder='Enter Itemname'
            onChange={changeItemName} onBlur={validateItemName} className='form-control' />
            <div className='error'>{itemNameError}</div>
        </div>
        <div className='form-group'>
            <label>ItemId:</label>
            <input type='text' name='itemId' value={itemId} placeholder='Enter ItemId'
            onChange={changeItemId} onBlur={validateItemId} className='form-control' />
            <div className='error'>{itemIdError}</div>
        </div>
        <div className='form-group'>
            <label>Price:</label>
            <input type='text' name='price' value={price} placeholder='Enter Price'
            onChange={changePrice} onBlur={validatePrice} className='form-control' />
            <div className='error'>{priceError}</div>
        </div>
        <div className='form-group'>
        <div className='center'>
            <button type='submit' className='btn btn-success'>Submit</button>
            <button type='reset' className='btn btn-warning' onClick={reset}>Reset</button>
        </div>
        </div>
        </form>
        </div>
        </>
    )
}

export default ItemAdd;