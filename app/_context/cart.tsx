"use client"

import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { getProductTotalPrice } from "../_helpers/price";

export interface CartProduct extends Prisma.ProductGetPayload<{include:{
    restaurant: {
        select: {
            deliveryFae: true
        }
    }
}}> {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    subTotalPrice: number;
    totalPrice: number;
    totalDisconts: number;
    totalQuantity: number;
    addProduct: ({ product, quantity, emptyCart }: {
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant: {
                    select: {
                        deliveryFae: true;
                    };
                };
            };
        }>;
        quantity: number;
        emptyCart?: boolean;
    }) => void;
    decressProductQuantity: (productId: string) => void;
    incrementProductQuantity: (productId: string) => void;
    removeProduct: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    subTotalPrice: 0,
    totalPrice: 0,
    totalDisconts: 0,
    totalQuantity: 0,
    addProduct: () => {},
    decressProductQuantity: () => {},
    incrementProductQuantity: () => {},
    removeProduct: () => {}
})

export const CartProvider = ({children}: { children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([])

    const subTotalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc = Number(product.price) * product.quantity
        }, 0)
    }, [products])

    const totalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc = getProductTotalPrice(product) * product.quantity
        }, 0) + Number(products[0]?.restaurant.deliveryFae)
    }, [products])

    const totalQuantity = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + product.quantity
        }, 0)
    }, [products])


    const totalDisconts = subTotalPrice - totalPrice + Number(products[0]?.restaurant.deliveryFae)

    const removeProduct = (productId: string) => {
        return setProducts((prev) => prev.filter(product => product.id != productId))
    }

    const decressProductQuantity = (productId: string) => {
        return setProducts((prev) => 
            prev.map((cartProduct) => {
                if(cartProduct.id == productId){
                    if(cartProduct.quantity == 1){
                        return cartProduct;
                    }

                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity - 1
                    }
                }

                return cartProduct;
            })
        )
    }

    const incrementProductQuantity = (productId: string) => {
        return setProducts((prev) => 
            prev.map((cartProduct) => {
                if(cartProduct.id == productId){
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1
                    }
                }

                return cartProduct;
            })
        )
    }

    const addProduct = (
        { product, quantity, emptyCart}: { product: Prisma.ProductGetPayload<{include:{
        restaurant: {
            select: {
                deliveryFae: true
            }
        }
    }}>, quantity: number, emptyCart?: boolean }) => {
/*
        const hasDiferentRestaurantProduct = products.some(
            (cartProduct) => cartProduct.restaurantId != product.restaurantId
        )*/

        if(emptyCart){
            setProducts([])
        }

        const productCart = products.some(cartProduct => cartProduct.id == product.id)

        if(productCart){
            setProducts((prev) => 
                prev.map((cartProduct) => {
                    if(cartProduct.id == product.id){
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + quantity
                        }
                    }

                    return cartProduct;
                })
            )

            return;
        }

        setProducts((prev) => [...prev, { ...product, quantity: quantity } ])
    }

    return (
        <CartContext.Provider 
        value={{ 
            subTotalPrice,
            totalDisconts,
            totalPrice,
            products: products, 
            totalQuantity,
            addProduct, 
            decressProductQuantity, 
            incrementProductQuantity, 
            removeProduct
        }}>
            {children}
        </CartContext.Provider>
    )
}