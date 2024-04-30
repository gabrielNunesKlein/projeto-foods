import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'

export const Header = () => {
  return (
    <div className='flex justify-between pt-6 px-3'>
        <Image src="/logo.png" height={30} width={100} alt='FSW FOODS' />

        <Button
            size="icon"
            variant="outline"
            className='border-none bg-transparent'
        >
            <MenuIcon />
        </Button>
    </div>
  )
}
