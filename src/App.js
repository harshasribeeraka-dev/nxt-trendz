import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  // Add a product to the cart
  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const productObject = cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (productObject) {
        // If product already exists, update quantity
        return {
          cartList: cartList.map(eachItem =>
            eachItem.id === product.id
              ? {...eachItem, quantity: eachItem.quantity + product.quantity}
              : eachItem,
          ),
        }
      }

      // Add new product
      return {cartList: [...cartList, product]}
    })
  }

  // Remove a specific product
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
    }))
  }

  // Remove all products
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // Increase quantity
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.id === id
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    }))
  }

  // Decrease quantity
  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const product = prevState.cartList.find(eachItem => eachItem.id === id)
      if (product.quantity > 1) {
        return {
          cartList: prevState.cartList.map(eachItem =>
            eachItem.id === id
              ? {...eachItem, quantity: eachItem.quantity - 1}
              : eachItem,
          ),
        }
      }
      // If quantity is 1, remove product
      return {
        cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
      }
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
