import React from 'react'

import { db } from "../_lib/prisma";

const CategoryList = async () => {

    const catgories = await db.category.findMany()

  return (
    <div>CategoryList</div>
  )
}

export default CategoryList