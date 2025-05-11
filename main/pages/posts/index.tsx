import { DeepPost, PostList } from '@/components/posts'
import styles from '@/styles/posts.module.css'
import Link from 'next/link'
import { Media } from '@/payload-exports/types'
import RootLayout from '../layout'
import path from 'path'
import { promises as fs } from 'fs'
import Image from 'next/image'

interface FeaturedSectionProps {
    title: string
    excerpt: string
    featuredImage: Media
    urlSlug: string
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'payload-exports/posts.json')
    const fileData = await fs.readFile(filePath, 'utf8')
    const posts = JSON.parse(fileData).docs as DeepPost[]

    return {
        props: {
            posts: posts,
        },
    }
}

function FeaturedSection({ urlSlug, featuredImage, excerpt, title }: FeaturedSectionProps) {
    return (
        <div className={styles.featuredSection}>
            <div className={styles.featuredInfo}>
                {/* <p className={styles.featuredLabel}>Featured</p> */}
                <Link href={`/posts/${urlSlug}`}>
                    <h1 className={styles.featuredTitle}>{title}</h1>
                </Link>
                <p className={styles.featuredExcerpt}>{excerpt}</p>
            </div>
            <Link href={`/posts/${urlSlug}`} className={styles.featuredImage}>
                <Image src={featuredImage.url as string} width={featuredImage.width as number} height={featuredImage.height as number} alt={featuredImage.alt} />
            </Link>
        </div>
    )
}

export default function PostIndex({ posts }: { posts: DeepPost[] & FeaturedSectionProps[] }) {
    const featuredPost = posts[0]
    const remainingPosts = posts.slice(1)

    return (
        <RootLayout>
            <div className={styles.postIndex}>
                <FeaturedSection {...featuredPost} />
                <PostList posts={remainingPosts} />
            </div>
        </RootLayout>
    )
}
