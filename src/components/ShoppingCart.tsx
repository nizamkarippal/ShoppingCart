import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import CartItem from "./CartItem"
import { formatCurrency } from "../utilites/formatCurrency"
import StoreItem from "./StoreItem"
import storeItems from "../data/items.json"
type ShoppingCartProps = {
    isOpen:boolean
}

const ShoppingCart = ({isOpen}:ShoppingCartProps) => {
    const {closeCart,cartItems} = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
            {cartItems.map(item=>(
                <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(cartItems.reduce((total,cartItem)=>{
                   const item = storeItems.find(i => i.id === cartItem.id)
                   return total + (item?.price || 0)* cartItem.quantity
            },0))}
            </div>
            </Stack>
        </Offcanvas.Body>
            
    </Offcanvas>
  )
}
export default ShoppingCart