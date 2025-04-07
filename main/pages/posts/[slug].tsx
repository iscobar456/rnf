import styles from '@/styles/post.module.css'
import { DeepPost } from '@/components/posts'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RootLayout from '../layout'
import { formatDate } from '@/logic/formatDate'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { SharePost } from '@/components/sharing/sharing'


interface PostStaticPropsContext extends GetStaticPropsContext {
  params: {
    slug: string
  }
}

interface SerializedPost extends Omit<DeepPost, 'content'> {
  content: SerializedEditorState
}

interface PostProps {
  post: SerializedPost
}


export const getStaticProps = async ({ params }: PostStaticPropsContext) => {
  const filePath = path.join(process.cwd(), 'payload-exports/posts.json')
  const fileData = await fs.readFile(filePath, 'utf8')
  const posts = JSON.parse(fileData).docs
  const post = posts.find((post: DeepPost) => (post.urlSlug == params.slug))

  return {
    props: {
      post: post
    }
  }

}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'payload-exports/posts.json')
  const fileData = await fs.readFile(filePath, 'utf8')
  const posts = JSON.parse(fileData)

  const paths = posts.docs.map((post: DeepPost) => ({
    params: {
      slug: post.urlSlug,
    },
  }))

  return { paths, fallback: false }
}


export default function PostPage({ post }: PostProps) {
  return (
    <RootLayout>
      <article className={styles.postPage}>
        <div className={styles.postHeading}>
          <div className={styles.postHeadingImage}>
            <Image src={post.featuredImage.url as string} width={1920} height={600} alt={post.featuredImage.alt} />
          </div>
          <div className={styles.postHeadingText}>
            <h1>{post.title}</h1>
            <p>{formatDate(post.datePublished)}</p>
          </div>
        </div>
        <div className={styles.postBody}>
          {<RichText data={post.content} />}
          <SharePost />
        </div>
      </article>
    </RootLayout>
  )
}
