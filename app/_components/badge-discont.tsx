

import { Product } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'
import React from 'react'

interface BadgeDiscontProps {
    product: Pick<Product, "discontPercentage">
}

export const BadgeDiscont = ({ product }: BadgeDiscontProps) => {
  return (
    <div className='gap-[2px] bg-primary px-2 py-1 rounded-full text-white flex items-center'>
        <ArrowDownIcon />
        <span className='font-semibold text-xs'>{product.discontPercentage || 10} %</span>
    </div>
  )
}
