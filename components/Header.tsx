'use client'
import React, { Suspense, CSSProperties } from 'react'
import siteMetadata from 'public/data/siteMetadata'
import headerNavLinks from 'public/data/headerNavLinks'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'

interface HeaderProps {
  style?: CSSProperties; // Define a style prop
  // Include other props as necessary
}

const Header: React.FC<HeaderProps> = ({ style, ...props }) => {
  return (
    <header style={style} className="flex items-center justify-between py-10">
      <div>
        <Link href="/latest" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image alt='Logo' src={'/newsDEMO-4303-svg.svg'} width={24} height={24} />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <Suspense fallback={<p>Loading wallet...</p>}>
          <DynamicWidget innerButtonComponent={'Sign In'}/>
        </Suspense>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
