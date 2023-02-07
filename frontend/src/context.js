import React, { Component } from 'react'

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            let newItem = state.cart;
            let addedProduct = state.cart.find(product => { return product.id === action.payload.id })
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
        case "SEARCH_PRODUCTS":
            return { items: [...action.payload] }

        default: return state
    }
}



export class ContextProvider extends Component {

    state = {
        cart: [], items: [], dispatch: (action) => {
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
