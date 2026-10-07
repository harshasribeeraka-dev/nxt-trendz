import {Component} from 'react'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'

import './index.css'

class Cart extends Component {
  renderEmptyView = () => (
    <div className="cart-empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="cart empty"
        className="cart-empty-img"
      />
      <h1 className="cart-empty-heading">Your Cart is Empty</h1>
    </div>
  )

  renderCartView = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

        return (
          <div className="cart-container">
            <div className="cart-header">
              <h1 className="cart-title">My Cart</h1>
              <button
                type="button"
                className="remove-all-btn"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>
            <ul className="cart-items-list">
              {cartList.map(eachItem => (
                <CartItem key={eachItem.id} cartItemDetails={eachItem} />
              ))}
            </ul>
            <CartSummary />
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          return cartList.length === 0
            ? this.renderEmptyView()
            : this.renderCartView()
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
