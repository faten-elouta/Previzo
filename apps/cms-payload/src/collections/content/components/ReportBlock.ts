import { Block } from "payload";

export const ReportBlock: Block = {
    slug: 'report',
    labels: {
        singular: {
            en: 'Report Block',
            fr: 'Bloc de rapport',
        },
        plural: {
            en: 'Report Blocks',
            fr: 'Blocs de rapport',
        },
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
            name: 'headText',
            label: {
                en: 'Head Text',
                fr: 'Texte d\'en-tête',
            },
            type: 'text',
        },
        {
            name: 'chart',
            label: {
                en: 'Chart',
                fr: 'Graphique',
            },
            type: 'relationship',
            relationTo: 'superset-charts',
        }
    ]
}
