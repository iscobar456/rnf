import styles from './posts.module.css'
import Image from 'next/image'
import { Post, Media, PostCategory } from '../payload-exports/types'
import Link from 'next/link'

export interface DeepPost extends Omit<Post, 'category' | 'featuredImage' | 'datePublished' | 'urlSlug' | 'title'> {
    category: PostCategory
    featuredImage: Media
    datePublished: string
    urlSlug: string
    title: string
}

export interface PostListProps {
    posts: DeepPost[]
    // o
}

export const CompactPostCard: React.FC<DeepPost> = ({ featuredImage, category, urlSlug, title }) => {
    return (
        <div className={styles.postCard}>
            <Link href={`/posts/${urlSlug}`} className={styles.postCardImage}>
                <Image src={featuredImage.url as string} width={260} height={360} alt={featuredImage.alt} />
            </Link>
            <div className={styles.postCardInfo}>
                <p>{category.name}</p>
                <Link href={`/posts/${urlSlug}`}>
                    <h3>{title}</h3>
                </Link>
            </div>
        </div>
    )
}

export const PostCard: React.FC<DeepPost> = ({ featuredImage, category, urlSlug, title, datePublished, excerpt }) => {
    return (
        <div className={styles.postCard}>
            <Image src={featuredImage.url as string} width={300} height={210} className={styles.postCardImage} alt={featuredImage.alt} />
            <div className={styles.postCardInfo}>
                <Link href={`/posts/${urlSlug}`}>
                    <h3>{title}</h3>
                </Link>
                <div>
                    <p>{category.name}</p>
                    <p>•</p>
                    <p>
                        {
                            new Date(datePublished).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })
                        }
                    </p>
                </div>
                <p>{excerpt}</p>
            </div>
        </div>
    )
}

export const CompactPostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className={styles.compactPostList}>
            {posts.map((post, index) => (
                <CompactPostCard key={index} {...post} />
            ))}
        </div>
    )
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <div className={styles.postList}>
            {posts.map((post, index) => (
                <>
                    <PostCard key={index} {...post} />
                    <hr />
                </>
            ))}
        </div>
    )
}

