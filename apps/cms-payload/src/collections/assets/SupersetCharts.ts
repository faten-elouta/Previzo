import type { CollectionConfig } from 'payload'
import { GROUPS } from '../content-groups/groups'
import { POLICIES } from '@/strategies/access-control/policies'

export const SupersetCharts: CollectionConfig = {
  slug: 'superset-charts',
  access: {
    read: POLICIES.canReadMedia(),
    create: POLICIES.canManageMedia(),
    update: POLICIES.canManageMedia(),
    delete: POLICIES.canManageMedia(),
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
    {
      name: 'supersetChartId',
      type: 'text',
      required: true,
    }
  ],
  upload: true,
}
