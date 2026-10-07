import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        const onClickRemove = () => removeCartItem(id)
        const onClickIncrement = () => incrementCartItemQuantity(id)
        const onClickDecrement = () => decrementCartItemQuantity(id)

        return (
          <li className="cart-item">
            <img src={imageUrl} alt={title} className="cart-item-img" />
            <div className="cart-item-details">
              <p className="cart-item-title">{title}</p>
              <p className="cart-item-brand">by {brand}</p>
              <div className="quantity-controls">
                <button
                  type="button"
                  data-testid="minus"
                  className="quantity-btn"
                  onClick={onClickDecrement}
                >
                  <BsDashSquare size={14} />
                </button>
                <p className="quantity">{quantity}</p>
                <button
                  type="button"
                  data-testid="plus"
                  className="quantity-btn"
                  onClick={onClickIncrement}
                >
                  <BsPlusSquare size={14} />
                </button>
              </div>
              <p className="cart-item-price">Rs {price * quantity}/-</p>
            </div>
            <button
              type="button"
              className="remove-btn"
              data-testid="remove"
              onClick={onClickRemove}
            >
              <AiFillCloseCircle size={20} />
            </button>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartItem
