import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Apps } from './collections/Apps'
import { Media } from './collections/assets/Media'
import { Reports } from './collections/content/Reports'
import { Users } from './collections/Users'
import { SupersetCharts } from './collections/assets/SupersetCharts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Reports, Apps, SupersetCharts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: (process.env.PAYLOAD_DB_PUSH === 'true'),
    schemaName: process.env.PAYLOAD_DB_SCHEMA,
  }),
  sharp,
  plugins: [],
  i18n: {
    fallbackLanguage: "fr",
    supportedLanguages: {
      en, fr
    }
  }
})
