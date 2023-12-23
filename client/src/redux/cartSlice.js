import {createSlice} from "@reduxjs/toolkit"
const cartSlice=createSlice({
    name:"Cart",
    initialState:{
        products:[],
        quantity:0,
        total:0
    },
    reducers:{
        addToCart:(state,action)=>{
            state.quantity +=1;
            state.total += action.payload.price;
            state.products.push(action.payload.product);
        }
    }
})

export const {addToCart}=cartSlice.actions;
export default cartSlice.reducer;