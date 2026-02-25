import { FIELD_POLICIES } from '@/strategies/access-control/field-policies';
import { POLICIES } from '@/strategies/access-control/policies';
import { CollectionConfig } from 'payload';
import { GROUPS } from './content-groups/groups';

export const Apps: CollectionConfig = {
    slug: 'apps',
    auth: {
        useAPIKey: true,
        disableLocalStrategy: true,
    },
    admin: {
        useAsTitle: 'appName',
        group: GROUPS.Admin
    },
    access: {
        read: POLICIES.canManageApps(),
        create: POLICIES.canManageApps(),
        update: POLICIES.canManageApps(),
        delete: POLICIES.canManageApps(),  
    },
    fields: [
        {
            name: 'appName',
            label: {
                en: 'Application Name',
                fr: 'Nom de l\'application',
            },
            type: 'text',
            required: true,
        },
        {
            name: 'apiKey',
            type: 'text',
            admin: {
                readOnly: true,
            },
            access: {
                read: () => false, // Masque le champ en lecture pour des raisons de sécurité. Affichable uniquement lors de la création d'une nouvelle application, ou de la réinitialisation de la clé API.
            },
            hidden: true, // Masque le champ dans l'interface d'administration pour des raisons de sécurité. Affichable uniquement lors de la création d'une nouvelle application, ou de la réinitialisation de la clé API.
        },
        {
            name: 'enableAPIKey',
            type: 'checkbox',
            admin: {
                description: {
                    en: 'Enable API Key authentication for this app',
                    fr: 'Activer l\'authentification par clé API pour cette application',
                }
            },
            access: {
                read: () => false, // Empêche la lecture via l'API pour des raisons de sécurité
                update: FIELD_POLICIES.canManageAPIKey(), // Seuls les utilisateurs (administrateurs) peuvent activer ou désactiver la clé API
            }
        },
        {
            name: 'permissions',
            label: {
                en: 'Permissions',
                fr: 'Autorisations',
            },
            type: 'group',
            fields: [
                {
                    name: 'admin',
                    label: {
                        en: 'Admin Access',
                        fr: 'Accès administrateur',
                    },
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: {
                            en: 'Grants full access to administrative settings',
                            fr: 'Accorde un accès complet aux paramètres administratifs',
                        }
                    }
                },
                {
                    name: 'readOnly',
                    label: {
                        en: 'Read-Only Access',
                        fr: 'Accès en lecture seule',
                    },
                    type: 'checkbox',
                    defaultValue: true,
                    admin: {
                        description: {
                            en: 'Grants read-only access to all data',
                            fr: 'Accorde un accès en lecture seule à toutes les données',
                        }
                    }
                },
                {
                    name: 'readWrite',
                    label: {
                        en: 'Read-Write Access',
                        fr: 'Accès en lecture et écriture',
                    },
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: {
                            en: 'Grants read and write access to all data (excluding admin settings)',
                            fr: 'Accorde un accès en lecture et écriture à toutes les données (à l\'exception des paramètres administratifs)',
                        }
                    }
                },
                {
                    name: 'contentReadWrite',
                    label: {
                        en: 'Content Read-Write Access',
                        fr: 'Accès en lecture et écriture au contenu',
                    },
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: {
                            en: 'Grants read and write access to content data',
                            fr: 'Accorde un accès en lecture et écriture aux données de contenu',
                        }
                    }
                },
                {
                    name: 'contentReadOnly',
                    label: {
                        en: 'Content Read-Only Access',
                        fr: 'Accès en lecture seule au contenu',
                    },
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: {
                            en: 'Grants read-only access to content data',
                            fr: 'Accorde un accès en lecture seule aux données de contenu',
                        }
                    }
                }
            ]
        }
    ]
}