import { POLICIES } from '@/strategies/access-control/policies';
import { GROUPS } from '../content-groups/groups';
import { CollectionConfig } from 'payload';

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
        read: POLICIES.canReadReports(),
        create: POLICIES.canEditReports(),
        update: POLICIES.canEditReports(),
        delete: POLICIES.canEditReports(),
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
                
            ]
        }
    ],
    versions: {
        drafts: true,
    }
};