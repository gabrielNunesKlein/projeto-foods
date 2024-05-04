import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <div className='flex justify-between pt-6 px-3'>

        <Link href="/">
          <Image className='object-contain' src="/logo.png" height={30} width={100} alt='FSW FOODS' />
        </Link>

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
