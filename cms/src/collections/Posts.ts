import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import type { CollectionConfig } from 'payload'
import { slugify } from '@/logic/slugify'

const updateDatePublished: BeforeChangeHook = async ({ data, originalDoc }) => {
  if (originalDoc.isDraft && !data.isDraft) {
    data.datePublished = new Date().toDateString()
  }
  return data
}

const generateSlug: BeforeChangeHook = ({ data, originalDoc }) => {
  if (data.title && (!originalDoc || data.title !== originalDoc.title)) {
    data.urlSlug = slugify(data.title)
  }
  return data
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  fields: [
    {
      name: 'isDraft',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'text',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'postCategories',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      hooks: {
        beforeChange: [],
      },
    },
    {
      name: 'datePublished',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'urlSlug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
  ],
  hooks: {
    beforeChange: [updateDatePublished, generateSlug],
  },
  access: {
    read: ({ req: { user } }) => {
      return user
        ? true
        : {
          isDraft: {
            equals: false,
          },
        }
    },
  },
}
