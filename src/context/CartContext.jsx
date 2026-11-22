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
        setCart(prevCart => {
            const itemInCart = prevCart.find(item => item.id === product.id);
            if (itemInCart) {
                return prevCart.map(item => item.id === product.id
                    ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
                    : item);
            }
            return [...prevCart, { ...product, quantity: Math.min(quantity, product.stock) }];
        });
    };

    const changeQuantity = (id, change) => {
        setCart(prevCart => prevCart.map(item => item.id === id
            ? { ...item, quantity: Math.max(1, Math.min(item.quantity + change, item.stock)) }
            : item));
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
        <CartContext.Provider value={{ cart, addToCart, changeQuantity, clearCart, removeFromCart, getCartQuantity, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
}


