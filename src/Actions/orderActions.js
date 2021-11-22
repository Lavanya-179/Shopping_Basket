import { UPDATE_FIELD, ORDER_DELETE } from "../Constants/Constants"
export const updateFieldAction = (res) => ({
 type : UPDATE_FIELD,
 payload: res,
}) 
export const orderDeleteAction = (res) => ({
    type : ORDER_DELETE,
    payload: res,
   }) 