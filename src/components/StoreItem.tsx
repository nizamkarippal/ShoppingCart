import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilites/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProp = {
    id:number,
    name: string,
    price:number,
    imgUrl:string
}

const StoreItem = ({id,name,price,imgUrl}:StoreItemProp) => {
const {
            getItemQuantity,
         IncreaseCartQuantity
            ,DecreaseCartQuantity,
             RemoveFromCart
        } = useShoppingCart()
const quantity = getItemQuantity(id)

  return (
   <>
   <Card className="h-100">
    <Card.Img variant="top" src={imgUrl} height='200px' 
    style={{objectFit:'cover'}}/>
    <Card.Body className="d-flex flex-column">
    <Card.Title className="d-flex justify-content-between
     align-item-baseline mb-4">
        <span className="fs-2">{name}</span>
        <span className="ms-2 text-muted">{formatCurrency(price)}</span>
    </Card.Title>
    <div className="mt-auto">
        
      {quantity===0?(
        <Button className="w-100"
        onClick={() => IncreaseCartQuantity(id)}>
           + Add to Cart
            </Button>
      ): <div className="d-flex align-items-center flex-column"
      style={{gap:".5rem"}}>
        <div className="d-flex align-item-center justify-content-center"
        style={{gap:".5rem"}}>
            <Button  onClick={() => DecreaseCartQuantity(id)}>-</Button>
            <div>
            <span className="fs-3">
                {quantity}
            </span>
            in cart
            </div>
            
            <Button  onClick={() => IncreaseCartQuantity(id)}>+</Button>
        </div>
        <Button variant="danger" size="sm"
         onClick={() => RemoveFromCart(id)}>Remove</Button>
      </div> }
    </div>
    </Card.Body>
   </Card>
   </>
  )
}
export default StoreItem