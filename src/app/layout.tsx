"use client"

import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased bg-white flex flex-col`}>
        <CacheProvider>
          <ChakraProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </ChakraProvider>
        </CacheProvider>
        </body>
    </html>
  )
}
