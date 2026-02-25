import type { CollectionConfig } from 'payload'
import { GROUPS } from '../content-groups/groups'
import { AC_POLICIES } from '@/strategies/access-control/policies'
import { INTEG_POLICIES } from '@/strategies/integrity/policies'

export const SupersetCharts: CollectionConfig = {
  slug: 'superset-charts',
  access: {
    read: AC_POLICIES.canReadMedia(),
    create: AC_POLICIES.canManageMedia(),
    update: AC_POLICIES.canManageMedia(),
    delete: AC_POLICIES.canManageMedia() && INTEG_POLICIES.canDeleteChart(),
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
  ]
}
