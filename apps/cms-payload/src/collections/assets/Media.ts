import type { CollectionConfig } from 'payload'
import { GROUPS } from '../content-groups/groups'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    group: GROUPS.Assets
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
