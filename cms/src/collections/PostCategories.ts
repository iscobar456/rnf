import { CollectionConfig } from 'payload'

export const PostCategories: CollectionConfig = {
  slug: 'postCategories',
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
}
