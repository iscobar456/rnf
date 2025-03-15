// import type { Metadata } from 'next'
import { Open_Sans, Oswald } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../public/img/rnf_logo_3.png'
import styles from './layout.module.css'

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
})

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
})

// export const metadata: Metadata = {
//   title: 'Rwanda Nurture Foundation',
//   description:
//     'The Rwanda Nurture Foundation focuses on community needs by helping single mothers learn skills that enhance family well-being',
// }

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/" className={styles.navLogo}>
          <Image src={Logo} fill alt="Rwanda Nurture Foundation logo" />
        </Link>
        <h1>Rwanda Nurture Foundation</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/#about">About</Link>
        </li>
        <li>
          <Link href="/posts/">News</Link>
        </li>
        <li>
          <Link href="/#donate" className={styles.donateButton}>
            Donate
          </Link>
        </li>
      </ul>
    </nav>
  )
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.brand}>
          <div className={styles.footerLogo}>
            <Image src={Logo} fill alt="Rwanda Nurture Foundation logo" />
          </div>
          <h3>Rwanda Nurture Foundation</h3>
          <div className={styles.footerSocials}>
            {/* Facebook */}
            <Link href="">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_89_288)">
                  <path
                    d="M9.5 0C4.52948 0 0.5 4.02948 0.5 9C0.5 13.2206 3.40592 16.7623 7.32596 17.735V11.7504H5.47016V9H7.32596V7.81488C7.32596 4.75164 8.71232 3.3318 11.7198 3.3318C12.29 3.3318 13.2739 3.44376 13.6764 3.55536V6.04836C13.464 6.02604 13.095 6.01488 12.6367 6.01488C11.161 6.01488 10.5908 6.57396 10.5908 8.02728V9H13.5306L13.0255 11.7504H10.5908V17.9341C15.0472 17.3959 18.5004 13.6015 18.5004 9C18.5 4.02948 14.4705 0 9.5 0Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_89_288">
                    <rect width="18" height="18" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
            </Link>

            {/* X */}
            <Link href="">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2447 1.42798H16.7748L11.2473 7.7456L17.75 16.3425H12.6584L8.67053 11.1285L4.10746 16.3425H1.57582L7.48808 9.58505L1.25 1.42798H6.47083L10.0755 6.19373L14.2447 1.42798ZM13.3567 14.8281H14.7587L5.70905 2.86283H4.2046L13.3567 14.8281Z"
                  fill="white"
                />
              </svg>
            </Link>

            {/* Whatsapp */}
            <Link href="">
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 18L1.76525 13.3777C0.984499 12.0247 0.57425 10.491 0.575 8.91823C0.57725 4.00124 4.57849 0 9.49473 0C11.8805 0.000749998 14.12 0.929998 15.8045 2.61599C17.4882 4.30199 18.4152 6.54299 18.4145 8.92648C18.4122 13.8442 14.411 17.8455 9.49473 17.8455C8.00223 17.8447 6.53149 17.4705 5.22874 16.7595L0.5 18ZM5.44774 15.1447C6.70474 15.891 7.90473 16.338 9.49173 16.3387C13.5777 16.3387 16.9062 13.0132 16.9085 8.92498C16.91 4.82849 13.5972 1.5075 9.49773 1.506C5.40874 1.506 2.0825 4.83149 2.081 8.91898C2.08025 10.5877 2.56925 11.8372 3.39049 13.1445L2.64125 15.8805L5.44774 15.1447ZM13.988 11.0467C13.9325 10.9537 13.784 10.8982 13.5605 10.7865C13.3377 10.6747 12.242 10.1355 12.0372 10.0612C11.8332 9.98698 11.6847 9.94948 11.5355 10.173C11.387 10.3957 10.9595 10.8982 10.8297 11.0467C10.7 11.1952 10.5695 11.214 10.3467 11.1022C10.124 10.9905 9.40548 10.7557 8.55423 9.99598C7.89198 9.40498 7.44423 8.67523 7.31448 8.45173C7.18473 8.22898 7.30098 8.10823 7.41198 7.99723C7.51248 7.89748 7.63473 7.73698 7.74648 7.60648C7.85973 7.47748 7.89648 7.38448 7.97148 7.23523C8.04573 7.08673 8.00898 6.95623 7.95273 6.84449C7.89648 6.73349 7.45098 5.63624 7.26573 5.18999C7.08424 4.75574 6.90049 4.81424 6.76399 4.80749L6.33649 4.79999C6.18799 4.79999 5.94649 4.85549 5.74249 5.07899C5.53849 5.30249 4.96249 5.84099 4.96249 6.93823C4.96249 8.03548 5.76124 9.09523 5.87224 9.24373C5.98399 9.39223 7.44348 11.6437 9.67923 12.609C10.211 12.8385 10.6265 12.9757 10.9497 13.0785C11.4837 13.248 11.9697 13.224 12.3537 13.167C12.782 13.1032 13.6722 12.6277 13.8582 12.1072C14.0442 11.586 14.0442 11.1397 13.988 11.0467Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
        </div>
        <hr />
        <ul>
          <li>Address: </li>
          <li>Email: contact@rwandanurture.org</li>
        </ul>
        <p>&copy; 2025 Rwanda Nurture Foundation. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${openSans.variable} ${oswald.variable}`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
