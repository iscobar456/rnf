import Link from "next/link"
import { FacebookIcon, XIcon, WhatsappIcon } from "../icons"
import { useEffect, useState } from "react"
import styles from './sharing.module.css'


interface ShareIconsProps {
  className?: string
}

export const ShareIcons: React.FC<ShareIconsProps> = ({ className }) => {
  const [postUri, setPostUri] = useState('')

  useEffect(() => {
    setPostUri(window.location.toString());
  }, [])

  return (
    <div className={className || styles.sharePostIcons}>
      <Link
        href={'https://www.facebook.com/dialog/share?'
          + 'app_id='
          + '&display=popup'
          + `&href=${encodeURI(postUri)}`}
        target='_blank'>
        <FacebookIcon width={20} height={21} />
      </Link>
      <Link href={`https://x.com/intent/tweet?url=${encodeURI(postUri)}`} target='_blank'>
        <XIcon width={20} height={21} />
      </Link>
      <Link href={`https://api.whatsapp.com/send?text=${encodeURI(postUri)}`} target='_blank'>
        <WhatsappIcon width={20} height={21} />
      </Link>
    </div>
  )
}


export const SharePost: React.FC = () => {
  return (
    <div className={styles.sharePost}>
      <h3>Share</h3>
      <ShareIcons />
    </div>
  )
}
