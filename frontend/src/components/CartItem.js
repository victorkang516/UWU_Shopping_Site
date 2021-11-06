import './CartItem.css';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

const CartItem = ({_id, userId, productId, quantity, isPaid, removeOrder}) => {

  const [qty, setQty] = useState(quantity);
  const [product, setProduct] = useState([]);
  const deleteData = () => {
    axios.delete(`http://localhost:5000/orders/${_id}`).then(res => 
    {
    console.log(res);
    removeOrder(_id);
  }).catch(error => {
    console.log(error);
  });

  }

  const updateData = () => {
    const order = {
      quantity: qty
    };

    axios.put(`http://localhost:5000/orders/${_id}`, order).then(res =>
    {
      console.log(res);
    }).catch(error=> {
      console.log(error);
    });
  }

  const fetchData = async () =>{
    try{
      const response = await fetch(`http://localhost:5000/products/${productId}`)
      const result = await response.json();

      setProduct(result);

    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cartitem">
      <div className="cartitem-image">
        <img src={product.imageUrl} alt="img"></img>
      </div>

      <Link to={`/product/${productId}`} className="cartitem-name">
        <p>{product.name}</p>
      </Link>

      <p className="cartitem-price">RM{product.price}</p>

      <input 
            type="number" 
            value={qty} 
            onChange={(event)=>{setQty(event.target.value);updateData()}} 
            min="1" 
            max={product.countInStock}
          />

      <button className="cartitem-deletebtn" onClick={deleteData}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}

export default CartItem
