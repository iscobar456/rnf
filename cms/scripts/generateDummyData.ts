// filepath: /home/isaac/Projects/rnf/scripts/generateDummyData.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { faker } from '@faker-js/faker'
import fs from 'fs'
import path from 'path'

async function getAllPathsInPublicFolder(): Promise<string[]> {
  const publicFolderPath = path.join(__dirname, '../public/')
  const files: string[] = []

  function readDirectory(directory: string) {
    const items = fs.readdirSync(directory)
    items.forEach((item) => {
      const fullPath = path.join(directory, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        readDirectory(fullPath)
      } else {
        files.push(fullPath)
      }
    })
  }

  readDirectory(publicFolderPath)
  return files
}

async function generateDummyData() {
  const payload = await getPayload({ config })
  const imagePaths = await getAllPathsInPublicFolder()

  const articleCategory = await payload.create({
    collection: 'postCategories',
    data: {
      name: 'Article',
    },
  })
  const newsletterCategory = await payload.create({
    collection: 'postCategories',
    data: {
      name: 'Newsletter',
    },
  })
  const categories = [articleCategory, newsletterCategory]

  for (let i = 0; i < 10; i++) {
    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)]
    const mediaUpload = await payload.create({
      collection: 'media',
      data: {
        alt: 'test image',
      },
      filePath: randomImagePath,
    })

    const title = faker.lorem.sentence()
    const content = faker.lorem.paragraphs(3)
    const datePublished = faker.date.past().toISOString()
    const urlSlug = faker.helpers.slugify(title)
    const category = categories[Math.floor(Math.random() * categories.length)]

    await payload.create({
      collection: 'posts',
      data: {
        isDraft: false,
        title: title,
        author: null, // Replace with a valid user ID if needed
        category: category, // Replace with a valid category ID if needed
        featuredImage: mediaUpload, // Replace with a valid media ID if needed
        content: {
          root: {
            type: 'root',
            children: [
              {
                version: 1,
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: content,
                  },
                ],
              },
              {
                version: 1,
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: content,
                  },
                ],
              },
              {
                version: 1,
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: content,
                  },
                ],
              },
              {
                version: 1,
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: content,
                  },
                ],
              },
            ],
            direction: 'ltr',
            format: 'left',
            indent: 0,
            version: 1,
          },
        },
        datePublished,
        urlSlug,
      },
    })
  }

  console.log('Dummy data generated successfully.')
}

generateDummyData().catch((err) => {
  console.error('Error generating dummy data:', err)
})
