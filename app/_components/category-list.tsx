import React from 'react'

import { db } from "../_lib/prisma";
import { CategoryItem } from './category-item';

const CategoryList = async () => {

    const catgories = await db.category.findMany()

  return (
    <div className='grid grid-cols-2 gap-3'>

        {catgories.map((item) => (
          <CategoryItem category={item} key={item.id} />
      ))}
    </div>
  )
}

export default CategoryList