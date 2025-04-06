import Link from "next/link"
import { FacebookIcon, XIcon, WhatsappIcon, ShareIcon } from "../icons"
import { useEffect, useState } from "react"
import styles from './sharing.module.css'


interface ShareIconsProps {
  postUri: string
}

interface SharePostProps {
  className?: string,
}


function ShareLinks({ postUri }: ShareIconsProps) {
  return (
    <div className={styles.sharePostIcons}>
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

function MobileShareButton({ postUri }: ShareIconsProps) {
  return (
    <button
      className={styles.shareButton}
      aria-label={"Share this post"}
      onClick={() => {
        if (typeof navigator.share === 'function' ) {
          navigator.share({
            title: document.title,
            text: "Check out this post!",
            url: postUri,
          }).catch((error) => {
            console.error("Error sharing:", error)
          })
        } else {
          alert("Sharing is not supported on this device.")
        }
      }}
    >
      <ShareIcon
        width={18}
        height={18}
      />
    </button>
  )
}

export const ShareIcons: React.FC<ShareIconsProps> = ({ postUri }) => {
  return typeof navigator.share === 'function' ? (
    <MobileShareButton postUri={postUri} />
  ) : (
    <ShareLinks postUri={postUri} />
  )
}


export const SharePost: React.FC<SharePostProps> = ({ className }) => {
  const [postUri, setPostUri] = useState('')

  useEffect(() => {
    setPostUri(window.location.toString());
  }, [])

  return typeof navigator.share === 'function' ? (
    <MobileShareButton postUri={postUri} />
  ) : (
    <div className={`${className} ${styles.sharePost}`}>
      <h3>Share</h3>
      <ShareIcons postUri={postUri} />
    </div>
  )
}
