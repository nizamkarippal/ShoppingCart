import {Container, Navbar as NavbarBr,Nav ,
    Button,}
 from "react-bootstrap"

import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"


const Navbar = () => {
  const {openCart,closeCart,cartQuantity} = useShoppingCart()
  return (
    <NavbarBr sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink} >
            Home
            </Nav.Link>
            <Nav.Link to="/store" as={NavLink} >
            Store
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink} >
            About
            </Nav.Link>
          </Nav>
          {cartQuantity > 0 && (
          <Button 
          onClick={openCart}
          style={{width:"3rem" , height:"3rem", display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        position:"relative"}}
          variant="outline-secondary"
          className="rounded-circle">
          <img style={{maxWidth: '100%', maxHeight: '100%'}} className="" src="public\shopping-cart-outline-svgrepo-com.svg" alt="cartlogo" />
          <div className="rounded-circle bg-danger d-flex justify-content-center
          align-items-center"
          style={{color:'white',width:"1.5rem",height:"1.5rem" ,position:"absolute"
            ,bottom:'0',right:'0' , transform:"translate(25%,25%)"
          }}>
          {cartQuantity}
          </div>
          </Button>
          )}
        </Container>
    </NavbarBr>
  )
}
export default Navbar