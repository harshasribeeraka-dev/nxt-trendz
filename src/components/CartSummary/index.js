// Write your code here

import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalPrice = cartList.reduce(
        (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
        0,
      )
      const itemsCount = cartList.length

      return (
        <div className="cart-summary">
          <h1 className="summary-title">
            Order Total:{' '}
            <span className="summary-price">Rs {totalPrice}/-</span>
          </h1>
          <p className="summary-items">{itemsCount} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
