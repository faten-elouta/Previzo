import { Access } from "payload";

export const POLICIES = {
    canReadReports: (): Access => ({ req: { user } }) => {
        // Apps with read-only or read-write access can read reports
        if (user?.collection === 'apps') {
            if (user?.permissions?.readOnly === true || user?.permissions?.contentReadOnly === true) {
                return true;
            }
        }

        if (user?.collection === 'users') {
            // Les utilisateurs sont considérés comme des administrateurs et peuvent lire les rapports
            return true;
        }
        return false;
    },
    canEditReports: (): Access => ({ req: { user } }) => {
        // Apps with read-write access can edit reports
        if (user?.collection === 'apps') {
            if (user?.permissions?.readWrite === true || user?.permissions?.contentReadWrite === true) {
                return true;
            }
        }
        return false;
    },
    canReadMedia: (): Access => ({ req: { user } }) => {
        // Apps with read-only or read-write access can read media
        if (user?.collection === 'apps') {
            if (user?.permissions?.readOnly === true || user?.permissions?.contentReadOnly === true) {
                return true;
            }
        }

        if (user?.collection === 'users') {
            // Les utilisateurs sont considérés comme des administrateurs et peuvent lire les graphiques Superset
            return true;
        }
        return false;
    },
    canManageMedia: (): Access => ({ req: { user } }) => {
        // Apps with read-write access can manage media
        if (user?.collection === 'apps') {
            if (user?.permissions?.readWrite === true || user?.permissions?.contentReadWrite === true) {
                return true;
            }
        }

        if (user?.collection === 'users') {
            // Les utilisateurs sont considérés comme des administrateurs et peuvent gérer les graphiques Superset
            return true;
        }
        return false;
    },
    canManageApps: (): Access => ({ req: { user } }) => {
        // Seuls les utilisateurs (administrateurs) peuvent gérer les applications
        if (user?.collection === 'users') {
            return true;
        }
        return false;
    },
    canManageUsers: (): Access => ({ req: { user } }) => {
        // Seuls les utilisateurs (administrateurs) peuvent gérer les utilisateurs
        if (user?.collection === 'users') {
            return true;
        }
        return false;
    },
}