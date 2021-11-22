import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { orderDeleteAction, updateFieldAction } from './Actions/orderActions';
import { buyNow } from './Services/Api';

function App(props) {
   const handleChange = (e, i) => {
    const data= [...props.orders]
    data[i].quantity = e.target.value;
    props.dispatch(updateFieldAction(data))
   }
   const toggleincdsc = (i, value) => {
    const data= [...props.orders]
    data[i].quantity = parseInt(value);
    data[i].cost = +(parseFloat(data[i].quantity * data[i].price)).toFixed(2);
    props.dispatch(updateFieldAction(data))
   }
  
  return (
    <div className="App">
      <h1>Review Your Order & Complete Checkout</h1>
      <div className="container">
        <div className="orders-wrapped">
          <div className="card-header">
            <p>Revie Your Order</p>
          </div>
          <div className="card-body">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.orders && props.orders.map((item,i)=>{
                  return (<tr key={i}> 
                    <td>{item.name}</td>
                    <td>£{item.price}</td>
                    <td className="quantity">
                      <input type="text" value={item.quantity} onChange={(e)=>handleChange(e, i)}/>
                      <button className="btn decrement" disabled={item.quantity<1} onClick={(e)=>{
                        if(item.quantity>0)
                        toggleincdsc(i, (Number(item.quantity)-1))
                        }}>-</button>
                      <button className="btn increment" disabled={item.quantity>9} onClick={(e)=>{
                        if(item.quantity <= 9)
                        toggleincdsc(i, (Number(item.quantity)+1))
                        }}>+</button>
                    </td>
                    <td>£{item.cost}</td>
                    <td>
                    <button className="btn remove" onClick={()=> props.dispatch(orderDeleteAction(item.id))}>Delete</button>
                    </td>
                  </tr>)
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="list-item">
            <div>
              Subtotal
            </div>
            <div>
              £{props.Subtotal}
            </div>
          </div>
          <div className="list-item">
            <div>
              VAT @ 20%
            </div>
            <div>
              £{props.vat}
            </div>
          </div>
          <div className="list-item bold">
            <div>
              Total
            </div>
            <div>
              £{props.total}
            </div>
          </div>
          <div className="list-item f-end">
            <button className="btn pay" disabled={(props.total ==(0).toFixed(2))} onClick={() => {if(props.total > 0) buyNow(props.orders)}}>Buy Now</button>
          </div>
      </div>
      </div>
      
    </div>
  );
}
const mapprops = (state) => ({
  orders: state.orderReducer.orders,
  Subtotal: state.orderReducer.Subtotal,
  vat: state.orderReducer.vat,
  total: state.orderReducer.total
})
 export default connect(mapprops)(App);
