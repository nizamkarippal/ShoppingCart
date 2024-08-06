import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
type ShoppingCartProviderProps = {
    children:ReactNode
}
type CartItem = {
    id:number
    quantity:number
}

type ShoppingCartContext = {
    openCart:()=>void
    closeCart:()=>void
    getItemQuantity:(id:number)=>number
    IncreaseCartQuantity:(id:number)=>void
    DecreaseCartQuantity:(id:number)=>void
    RemoveFromCart:(id:number)=>void
    cartQuantity:number
    cartItems:CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext) 


export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
   const [cartItems,SetcartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

   const [isOpen,setIsOpen] = useState(false)

   function getItemQuantity(id:number){
    return cartItems.find(item=> item.id === id )?.quantity || 0
   }
    function IncreaseCartQuantity(id:number){
        SetcartItems(currentItems=>{
            if(currentItems.find(item => item.id === id)== null){
               return [...cartItems,{id,quantity:1}] 
            }else{
                return currentItems.map(item =>{
                    if(item.id === id){
                        return {...item,quantity:item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function DecreaseCartQuantity(id:number){
        SetcartItems(currentItems=>{
            if(currentItems.find(item => item.id === id)?.quantity === 1){
               return currentItems.filter(item => item.id !== id)
            }else{
                return currentItems.map(item =>{
                    if(item.id === id){
                        return {...item,quantity:item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
     
    function RemoveFromCart(id:number){
        SetcartItems(currentItem =>{
           return currentItem.filter(item=> item.id !== id )
        })
    }

    const cartQuantity = cartItems.reduce(
        (quantity,item) => item.quantity + quantity,0
    )

    const openCart = ()=> setIsOpen(true)
    const closeCart = ()=> setIsOpen(false)
   
   return (<ShoppingCartContext.Provider value={{
    getItemQuantity,IncreaseCartQuantity
    ,DecreaseCartQuantity,RemoveFromCart,
    openCart,closeCart,
    cartItems,cartQuantity}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}


// const ShoppingCartContext = () => {
//   return (
//     <div>ShoppingCartContext</div>
//   )
// }
// export default ShoppingCartContext