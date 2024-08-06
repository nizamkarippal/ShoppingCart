import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilites/formatCurrency"

type CartItemProps = {
    id: number
    quantity:number
}

const CartItem = ({id,quantity}:CartItemProps) => {
    const {RemoveFromCart} =useShoppingCart()
    const item = storeItems.find(item => item.id === id)
    if(item == null) return null
  return (
    <Stack direction="horizontal" gap={2}
    className="d-flex align-item-center">
        <img src={item.imgUrl} alt=""
        style={{width:"125px",height:"75px", objectFit:"cover"}} />
        <div className="me-auto">
            <div>
                {item.name} {quantity >1 &&
                <span className="text-muted" style={{fontSize:".62rem"}}>
                    x{quantity}
                </span>
                }
            </div>
            <div  className="text-muted" style={{fontSize:".72rem"}}>
                {formatCurrency(item.price)}
            </div>
        </div>

        <div>
            {formatCurrency(item.price * quantity)}
        </div>
        <Button variant="outline-danger" size="sm"
        onClick={() => RemoveFromCart(id)}>
            &times;
        </Button>
    </Stack>
  )
}
export default CartItem