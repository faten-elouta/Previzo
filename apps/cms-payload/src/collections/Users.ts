import type { CollectionConfig } from 'payload'
import { GROUPS } from './content-groups/groups'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: GROUPS.Admin
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
