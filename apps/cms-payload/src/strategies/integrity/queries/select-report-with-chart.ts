import { sql } from "@payloadcms/db-postgres"

const TABLE_NAME = 'reports_blocks_report'

/**
 * Vérifie si un graphique est utilisé dans au moins un rapport
 * 
 * @param chartId 
 */
const SELECT_REPORT_WITH_CHART = (chartId: string) => sql`
SELECT id
FROM ${sql.identifier(TABLE_NAME)}
WHERE chart_id = ${chartId}
LIMIT 1
`

export default SELECT_REPORT_WITH_CHART;