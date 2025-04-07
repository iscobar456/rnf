import Link from "next/link"
import { FacebookIcon, XIcon, WhatsappIcon, ShareIcon } from "../icons"
import { useEffect, useState } from "react"
import styles from './sharing.module.css'


interface ShareIconsProps {
  postUri: string
}


function ShareLinks({ postUri }: ShareIconsProps) {
  return (
    <div className={styles.shareLinks}>
      <Link
        href={'https://www.facebook.com/dialog/share?'
          + 'app_id='
          + '&display=popup'
          + `&href=${encodeURI(postUri)}`}
        target='_blank'>
        <FacebookIcon width={18} height={18} />
      </Link>
      <Link href={`https://x.com/intent/tweet?url=${encodeURI(postUri)}`} target='_blank'>
        <XIcon width={18} height={18} />
      </Link>
      <Link href={`https://api.whatsapp.com/send?text=${encodeURI(postUri)}`} target='_blank'>
        <WhatsappIcon width={18} height={18} />
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
        if (typeof navigator.share === 'function') {
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


export const SharePost: React.FC = () => {
  const [postUri, setPostUri] = useState('')

  useEffect(() => {
    setPostUri(window.location.toString());
  }, [])

  const ShareComponent = typeof navigator.share === 'function' ? (
    <MobileShareButton postUri={postUri} />
  ) : (
    <ShareLinks postUri={postUri} />
  )


  return (
    <div className={styles.sharePost}>
      <div className={styles.text}>
        <h2>Share this post</h2>
        <p>If you liked this article, consider sharing it.</p>
      </div>
      {ShareComponent}
    </div>
  )
}
