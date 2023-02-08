import React, { Component } from 'react'

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_CART":
            let newItem = state.cart;
            let addedProduct = state.cart.find(product => { return product._id === action.payload._id })
            if (addedProduct) {
                addedProduct.quantity += 1;
                return { cart: [...state.cart] }
            }
            else {
                newItem.push({ ...action.payload, quantity: 1 })
                return { newItem }
            }
        case "GET_PRODUCTS":
            return { items: [...action.payload] }
        case "FILTER_SEARCH":
            return { items: [...action.payload] }
        case "LOADING_STATE":
            return { isLoading: action.payload }
        case "SEARCH_PRODUCTS":
            return { items: [...action.payload] }
        case "REMOVE_FROM_CART":
            const cart = [...state.cart]
            const index = cart.indexOf(action.payload)
            cart[index].quantity > 1 ? cart[index].quantity -= 1 : cart.splice(index, 1);
            if (cart.length === 0) return { cart, arrowDir: true }
            else return { cart }
        case "SEARCH_TEXT":
            return { currentValue: action.payload }
        case "ARROW_DIRECTION":
            return { arrowDir: action.payload }

        default: return state
    }
}



export class ContextProvider extends Component {

    state = {
        cart: [], items: [], isLoading: false, currentValue: '', arrowDir: true, dispatch: (action) => {
            this.setState(state => reducer(state, action))
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default Context;
