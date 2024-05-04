"use client"

import React, { FormEventHandler, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Search = () => {

  const router = useRouter()

  const [search, setSearch] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {

    e.preventDefault()

    if(!search) return;

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSearchSubmit}>
        <Input onChange={handleChange} value={search} placeholder='Buscar restaurante' className='border-none' />
        <Button size="icon" type='submit'>
            <SearchIcon size={20} />
        </Button>
    </form>
  )
}
