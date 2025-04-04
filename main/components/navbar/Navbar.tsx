import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import Logo from '@/public/img/rnf_logo_3.png'
import MenuIcon from '@/public/menu-icon.svg' // Ensure this path is correct
import DonateButton from '../buttons/DonateButton'
import { useState } from 'react'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Link href="/" className={styles.navLogo}>
          <Image src={Logo} fill alt="Rwanda Nurture Foundation logo" />
        </Link>
        <h1>Rwanda Nurture Foundation</h1>
      </div>
      <button
        className={styles.menuToggle}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Image
          src={MenuIcon}
          alt="Menu Icon"
          width={30}
          height={30}
          className={`${styles.menuIcon} ${isMenuOpen ? styles.open : ''}`}
        />
      </button>
      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.show : ''}`}>
        <li>
          <Link href="/#about">About</Link>
        </li>
        <li>
          <Link href="/posts/">News</Link>
        </li>
        <li>
          <DonateButton />
        </li>
      </ul>
    </nav>
  )
}