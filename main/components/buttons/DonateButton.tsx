import Link from 'next/link'
import styles from './DonateButton.module.css'
import { useRef } from 'react'
import { CloseIcon } from '../icons';


export default function DonateButton() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openDialogue = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  }

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
  };

  return (
    <>
      <button className={styles.donateButton} onClick={openDialogue}>
        Donate
      </button>
      <dialog className={styles.modalDialog} ref={dialogRef}>
        <div className={styles.header}>
          <h2>How To Donate</h2>
          <button onClick={closeDialog} ><CloseIcon /></button>
        </div>
        <p>
          We’re currently in the early stages of building our organization and are not yet registered as an official non-profit. If you're interested in supporting our work, please reach out directly to our finance director to arrange a donation or learn more about how your contribution will be used.
        </p>
        <p>
          Contact: Seth Criddle – <a href="mailto:seth.criddle@rwandanurture.org">seth.criddle@rwandanurture.org.</a>
        </p>
        <p>
          Thank you for your interest and support — it truly makes a difference at this foundational stage.
        </p>
      </dialog>
    </>
  )
}
