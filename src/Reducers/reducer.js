import { UPDATE_FIELD, ORDER_DELETE } from "../Constants/Constants"

const initialState = {
    orders: [
        {name: "Apple", price: 0.52, quantity: 2, cost: 1.4, id: "1234"},
        {name: "Banana", price: 0.67, quantity: 2, cost: 1.34, id: "5678"},
    ],
    Subtotal: 3.05, 
    vat: 0.61,
    total: 3.66
}
export const orderReducer = (state=initialState, action) => {
 switch(action.type){
     case UPDATE_FIELD:
         let s = (action.payload.map(x => x.cost).reduce((pre, nxt)=> pre + nxt)).toFixed(2);
         let v = (action.payload.map(x => x.cost).reduce((pre, nxt)=> pre + nxt)*20/100).toFixed(2);
         let t = (parseFloat(s) + parseFloat(v)).toFixed(2)
         return {
             ...state, 
            orders: action.payload,
            Subtotal: s, 
            vat: v,
            total: t
        }
    case ORDER_DELETE:
        return {
            ...state,
            orders: state.orders.filter(x => x.id !== action.payload) 
        }

    default : return state

 }
     
}


