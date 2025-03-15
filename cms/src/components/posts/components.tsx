import styles from './components.module.css'
import Image from 'next/image'
import { Post, Media, PostCategory } from '@/payload-types'
import Link from 'next/link'

export interface DeepPost extends Omit<Post, 'category' | 'featuredImage' | 'datePublished'> {
  category: PostCategory
  featuredImage: Media
  datePublished: string
}

export interface PostCardProps {
  featuredImage: Media
  category: PostCategory
  urlSlug: string
  title: string
}

export interface PostListProps {
  posts: PostCardProps[]
  // o
}

export const PostCard: React.FC<PostCardProps> = ({ featuredImage, category, urlSlug, title }) => {
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

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className={styles.postList}>
      {posts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  )
}
