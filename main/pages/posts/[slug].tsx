import styles from './post.module.css'
import { DeepPost } from '../../components/posts'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import RootLayout from '../layout'
import { formatDate } from '@/logic/formatDate'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import { GetStaticPaths, GetStaticPropsContext } from 'next'



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

interface SocialIconsProps {
  className?: string
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

export const SocialIcons: React.FC<SocialIconsProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 10.5C20 4.9772 15.5228 0.5 10 0.5C4.4772 0.5 0 4.9772 0 10.5C0 15.1896 3.2288 19.1248 7.5844 20.2056V13.556H5.5224V10.5H7.5844V9.1832C7.5844 5.7796 9.1248 4.202 12.4664 4.202C13.1 4.202 14.1932 4.3264 14.6404 4.4504V7.2204C14.4044 7.1956 13.9944 7.1832 13.4852 7.1832C11.8456 7.1832 11.212 7.8044 11.212 9.4192V10.5H14.4784L13.9172 13.556H11.212V20.4268C16.1636 19.8288 20.0004 15.6128 20.0004 10.5H20Z"
          fill="#0866FF"
        />
      </svg>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2719 2.08659H18.0831L11.9414 9.10616L19.1667 18.6582H13.5094L9.07837 12.865L4.0083 18.6582H1.19537L7.76454 11.15L0.833344 2.08659H6.63427L10.6395 7.38186L15.2719 2.08659ZM14.2853 16.9756H15.843L5.78784 3.68086H4.11623L14.2853 16.9756Z"
          fill="black"
        />
      </svg>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20.5L1.40583 15.3641C0.538332 13.8608 0.0824998 12.1566 0.0833332 10.4091C0.0858331 4.94582 4.53166 0.5 9.99414 0.5C12.645 0.500833 15.1333 1.53333 17.005 3.40666C18.8758 5.27999 19.9058 7.76998 19.905 10.4183C19.9025 15.8825 15.4566 20.3283 9.99414 20.3283C8.33581 20.3275 6.70165 19.9116 5.25415 19.1216L0 20.5ZM5.49749 17.3275C6.89415 18.1566 8.22748 18.6533 9.99081 18.6541C14.5308 18.6541 18.2291 14.9591 18.2316 10.4166C18.2333 5.86499 14.5525 2.175 9.99748 2.17333C5.45415 2.17333 1.75833 5.86832 1.75666 10.41C1.75583 12.2641 2.29916 13.6525 3.21166 15.105L2.37916 18.145L5.49749 17.3275ZM14.9866 12.7741C14.925 12.6708 14.76 12.6091 14.5116 12.485C14.2641 12.3608 13.0466 11.7616 12.8191 11.6791C12.5925 11.5966 12.4275 11.555 12.2616 11.8033C12.0966 12.0508 11.6216 12.6091 11.4775 12.7741C11.3333 12.9391 11.1883 12.96 10.9408 12.8358C10.6933 12.7116 9.89498 12.4508 8.94915 11.6066C8.21331 10.95 7.71582 10.1391 7.57165 9.89081C7.42748 9.64331 7.55665 9.50915 7.67998 9.38581C7.79165 9.27498 7.92748 9.09665 8.05165 8.95165C8.17748 8.80831 8.21832 8.70498 8.30165 8.53915C8.38415 8.37415 8.34332 8.22915 8.28082 8.10498C8.21832 7.98165 7.72332 6.76249 7.51748 6.26665C7.31582 5.78415 7.11165 5.84915 6.95998 5.84165L6.48499 5.83332C6.31999 5.83332 6.05165 5.89499 5.82499 6.14332C5.59832 6.39165 4.95832 6.98999 4.95832 8.20915C4.95832 9.42831 5.84582 10.6058 5.96915 10.7708C6.09332 10.9358 7.71498 13.4375 10.1991 14.51C10.79 14.765 11.2516 14.9175 11.6108 15.0316C12.2041 15.22 12.7441 15.1933 13.1708 15.13C13.6466 15.0591 14.6358 14.5308 14.8425 13.9525C15.0491 13.3733 15.0491 12.8775 14.9866 12.7741Z"
          fill="#25D366"
        />
      </svg>
    </div>
  )
}

export default function PostPage({ post }: PostProps) {
  return (
    <RootLayout>
      <article className={styles.postPage}>
        <div className={styles.postHeading}>
          <div className={styles.postHeadingImage}>
            <Image src={post.featuredImage.url as string} width={1920} height={600} alt={post.featuredImage.alt} />
          </div>
          <h1>{post.title}</h1>
          <p>{formatDate(post.datePublished)}</p>
        </div>
        <hr />
        <div className={styles.postBody}>
          <div className={styles.postContent}>
            {<RichText data={post.content} />}
          </div>
          <div className={styles.postSocials}>
            <div>
              <h3>Share</h3>
              <SocialIcons className={styles.postSocialsIcons} />
            </div>
            <div>
              <h3>Contact</h3>
              <p>
                Email us at:
                <br />
                contact@rwandanurture.org
              </p>
            </div>
          </div>
        </div>
      </article>
    </RootLayout>
  )
}
