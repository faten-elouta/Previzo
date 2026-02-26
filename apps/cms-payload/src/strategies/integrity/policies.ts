import { Access } from "payload";
import SELECT_REPORT_WITH_CHART from "./queries/select-report-with-chart";

export const INTEG_POLICIES = {
    canDeleteChart: (): Access => async ({ req: { payload }, id }) => {
        if (!id) return false; // Si aucun ID n'est fourni, on refuse la suppression
        const db = payload.db.drizzle;
        try {
            const attachedReports = await db.execute(SELECT_REPORT_WITH_CHART(String(id)));
            return attachedReports.rowCount === 0; // Permet de supprimer le graphique seulement s'il n'est attaché à aucun rapport
        } catch (error) {
            console.error('Error checking chart usage in reports:', error);
            return false; // En cas d'erreur, on refuse la suppression par précaution
        }
    },
}