import { Product } from "@prisma/client";


export const getProductTotalPrice = (product: Product) => {

    if(product.discontPercentage === 0){
        return Number(product.price)
    }

    const discont = Number(product.price) * (product.discontPercentage / 100)

    return Number(product.price) - discont
}

export const formatCurrency = (value: number): string => {
    return 'R$ ' + Intl.NumberFormat("pt-br", {
        minimumFractionDigits: 2,
        currency: "BRL"
    }).format(Number(value))
}