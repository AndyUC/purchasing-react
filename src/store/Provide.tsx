import React, { createContext, useContext, useReducer, useState } from "react";
import { ContextProviderProps} from "./ContextProviderProps";

export interface ICart {
    productid:string,
    productname:string,
    imagePath:string,
    catalog:string,
    size:string,
    price:number,
    quantity:number
  }

type CartContextType={
    cart:ICart[],
    setCart:React.Dispatch<React.SetStateAction<ICart[]>>
}

export const CartContext = createContext<CartContextType>({cart:[],setCart:():any=>{}});
export const useCartContext = ()=>useContext(CartContext)


