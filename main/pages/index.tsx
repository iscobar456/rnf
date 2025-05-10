import Image from 'next/image'
import headerImage from '@/public/img/header-background.jpg'
import CornerRightDown from '@/public/img/corner-right-down.svg'
import styles from '@/styles/index.module.css'
import { PostList, DeepPost } from '@/components/posts'
import RootLayout from './layout'
import { promises as fs } from 'fs'
import path from 'path'
import DonateButton from '@/components/buttons/DonateButton'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'payload-exports/posts.json')
  const fileData = await fs.readFile(filePath, 'utf8')
  const propsData = JSON.parse(fileData).docs.slice(0, 4)

  return {
    props: {
      posts: propsData
    }
  }
}

export default function Home({ posts }: { posts: DeepPost[] }) {
  return (
    <RootLayout>
      <div className={styles.page}>
        <header className={styles.header}>
          <Image src={headerImage} alt="Header Background" fill className={styles.headerImage} />
          <p className={styles.desktopBanner}>
            Focused on community needs, Rwanda Nurture helps single mothers learn
            skills that enhance family well-being.
          </p>
          <div className={styles.mobileBanner}>
            <h1>Rwanda Nurture</h1>
            <p>
              Focused on helping single mothers learn skills that enhance family well-being.
            </p>
          </div>
        </header>
        <section className={styles.postsSection}>
          <h2>Recent News <Image src={CornerRightDown} alt='Corner right down' /></h2>
          <PostList posts={posts} />
        </section>
        <section id="about" className={styles.aboutSection}>
          <div className="layout">
            <h2>Our Mission</h2>
            <p>
              The Rwanda Nurture Organization was officially launched on November 4, 2024, with a
              mission to provide early childhood education and skills training for single mothers.
              The organization aims to foster both the intellectual and socio-economic development
              of young children and empower single mothers by equipping them with practical
              skills, such as sewing, to improve their livelihoods. With a strong focus on
              community needs, Rwanda Nurture focuses on single mothers eager to learn and gain
              important skills
            </p>
          </div>
        </section>
        <section id="donate" className={styles.donateSection}>
          <p>
            Your donations make our work possible.<br></br>
            Every contribution goes towards early childhood educational expenses<br></br>
            or professional development opportunities for single mothers.
          </p>
          <DonateButton />
        </section>
      </div>
    </RootLayout>
  )
}
