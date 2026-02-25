import { AC_POLICIES } from '@/strategies/access-control/policies';
import { GROUPS } from '../content-groups/groups';
import { CollectionConfig } from 'payload';
import { ReportBlock } from './components/ReportBlock';

export const Reports: CollectionConfig = {
    slug: 'reports',
    labels: {
        singular: {
            en: 'Report',
            fr: 'Rapport',
        },
        plural: {
            en: 'Reports',
            fr: 'Rapports',
        },
    },
    admin: {
        useAsTitle: 'title',
        group: GROUPS.Content
    },
    access: {
        read: AC_POLICIES.canReadReports(),
        create: AC_POLICIES.canEditReports(),
        update: AC_POLICIES.canEditReports(),
        delete: AC_POLICIES.canEditReports(),
        readVersions: AC_POLICIES.canReadReports()
    },
    fields: [
        {
            name: 'title',
            label: {
                en: 'Title',
                fr: 'Titre',
            },
            type: 'text',
            required: true,
        },
        {
            name: 'abstract',
            label: {
                en: 'Abstract',
                fr: 'Résumé',
            },
            type: 'richText',
        },
        {
            name: 'content',
            label: {
                en: 'Content',
                fr: 'Contenu',
            },
            type: 'blocks',
            blocks: [
                ReportBlock
            ]
        }
    ],
    versions: {
        drafts: true,
        maxPerDoc: 10
    }
};