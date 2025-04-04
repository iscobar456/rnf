import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import Logo from '@/public/img/rnf_logo_3.png'
import MenuIcon from '@/public/img/menu-icon.svg' // Ensure this path is correct
import CloseIcon from '@/public/img/arrow-up.svg' // Ensure this path is correct
import DonateButton from '../buttons/DonateButton'
import { useState } from 'react'


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to handle clicks outside the menu to close it
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    const menu = document.querySelector(`.${styles.navbar}`)
    console.log(target, menu, isMenuOpen)
    if (menu && !menu.contains(target)) {
      setIsMenuOpen(false)
      document.removeEventListener('click', handleClickOutside)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    console.log(isMenuOpen)
    if (!isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }
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
          src={isMenuOpen ? CloseIcon : MenuIcon}
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