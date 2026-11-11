import { createContext, useContext, useState } from "react";



//contexto
export const CartContext = createContext();

//cosumer
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error(
            'useCart debe ser usado dentro de un provider'
        )
    }
    return context;
}

//provider

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);


    const addToCart = (product, quantity) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };

    const clearCart = () => setCart([]);
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const getCartQuantity = () => {

        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart, getCartQuantity, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}


