import Link from 'next/link'
import styles from './DonateButton.module.css'


export default function DonateButton() {
  return (
    <Link href="/#donate" className={styles.donateButton}>
      Donate
    </Link>
  )
}