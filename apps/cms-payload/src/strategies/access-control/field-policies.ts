import { Access, FieldAccess } from "payload";

export const FIELD_POLICIES = {
    canManageAPIKey: (): FieldAccess => ({ req: { user } }) => {
        // Seuls les utilisateurs (administrateurs) peuvent activer la clé API
        if (user?.collection === 'users') {
            return true;
        }
        return false;
    },
}