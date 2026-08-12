import { canEdit } from './services/scoresheetAuth';

/**
 * Who may change a scoresheet.
 *
 * Reading is public and stays public: anyone can open the list or look at a
 * dual. Only creating and scoring are restricted, to staff accounts.
 *
 * Every screen routes its edit affordances through here, so this is the single
 * place the frontend decides. It is not a security boundary -- the API enforces
 * the same rule on every write, and a hidden button is only a courtesy.
 */
export const canEditScoresheets = () => canEdit();

const permissions = { canEditScoresheets };

export default permissions;
