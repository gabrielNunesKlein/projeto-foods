
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface CategoryItemProps {
  category: Category
}

export const CategoryItem = ({ category}: CategoryItemProps ) => {

  return (
    <Link href={`/categories/${category.id}/products`} className="flex items-center gap-3 py-3 px-4 bg-white shadow-md rounded-full">

        <Image 
          src={category.imageUrl}
          alt={category.name}
          height={30}
          width={30}
        />

        <span className="font-semibold text-sm">{category.name}</span>
    </Link>
  )
}

