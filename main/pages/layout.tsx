// import type { Metadata } from 'next'
import { Open_Sans, Oswald } from 'next/font/google'
import Head from 'next/head'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
})

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${openSans.variable} ${oswald.variable}`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
