// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { PostCategories } from './collections/PostCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const mediaPrefix = process.env.S3_MEDIA_PREFIX || 'media'


export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: [
        '/components/BuildManager.tsx#BuildManager'
      ]
    }
  },
  collections: [Users, Media, Posts, PostCategories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
    push: false,
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: mediaPrefix,
          generateFileURL: ({ filename }) => process.env.MEDIA_BASE_URL + `/${mediaPrefix}/` + filename
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
        region: process.env.AWS_DEFAULT_REGION,
        // ... Other S3 configuration
      },
    }),
  ],
})
