import {createSlice} from "@reduxjs/toolkit"

const cartSlice=createSlice({
    name:"cart",
    initialState:{
    products:[],
    quantity:0,
    cart:0,
    total:0,
    },
    reducers:{
        addToCart:(state,action)=>{
            state.quantity +=1;
            state.cart +=1;
            state.products.push(action.payload);
            state.total +=action.payload.price *action.payload.quantity;
        },
        removerFromCart:(state,action)=>{
          const productId=action.payload;
          const updatedProducts=state.products.filter((product)=>product._id !==productId);
          const updatedQuantity=updatedProducts.reduce(
            (accumulator,currentProduct) => accumulator + currentProduct.quantity , 0
          );
          const updatedTotal=updatedProducts.reduce(
            (accProd,prod)=> accProd+ prod.price*prod.quantity,0
          )
          return{
            ...state,
            products:updatedProducts,
            quantity:updatedQuantity,
            total:updatedTotal,
            cart:updatedProducts.length
          };
        },
        clearCart:(state)=>{
            return{
                ...state,
                products:[],
                quantity:0,
                total:0,
                cart:0
            }
        }
    }    
})
export const{addToCart,removerFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;