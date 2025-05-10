import styles from './footer.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/img/rnf_logo_3.png'
import { FacebookIcon } from '@/components/icons'


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.brand}>
          <div className={styles.footerLogo}>
            <Image src={Logo} fill alt="Rwanda Nurture logo" />
          </div>
          <h3>Rwanda Nurture</h3>
          <div className={styles.footerSocials}>
            <Link href="https://www.facebook.com/share/165DGinVkr/" target='_blank'>
              <FacebookIcon width={19} height={18} grayscale={true} />
            </Link>
            {/* <Link href="">
                <WhatsappIcon width={19} height={18} grayscale={true} />
              </Link> */}
          </div>
        </div>
        <hr />
        <ul>
          <li>Email: contact@rwandanurture.org</li>
        </ul>
        <p>&copy; 2025 Rwanda Nurture Organization. All rights reserved.</p>
      </div>
    </footer>
  )
}
