import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { getSchools } from '../services/schoolService';
import { createDraft, saveDraft, DraftStoreError } from './storage/draftStore';
import { canEditScoresheets } from './permissions';
import DualSetup from './components/DualSetup';

const NewScoresheetContainer = () => {
    const history = useHistory();
    const allowed = canEditScoresheets();
    const [schools, setSchools] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadSchools = async () => {
        try {
            setIsLoading(true);
            const response = await getSchools();
            setSchools(response?.data || []);
        } catch (err) {
            // The directory is a convenience, not a requirement -- the opponent
            // can always be typed in, so this must not block starting a dual.
            console.error('Error fetching schools:', err);
            setSchools([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadSchools();
    }, []);

    const handleCreate = (setup) => {
        try {
            const draft = saveDraft(createDraft(setup));
            history.push(`/scoresheet/${draft.id}`);
        } catch (err) {
            setError(err instanceof DraftStoreError ? err.message : 'The scoresheet could not be started.');
        }
    };

    // Starting a dual is a write, so it needs the same account the submit will.
    // Better to say so now than after fourteen bouts have been entered.
    if (!allowed) {
        return <Redirect to="/scoresheet/login?next=/scoresheet/new" />;
    }

    return <DualSetup schools={schools} isLoading={isLoading} error={error} onCreate={handleCreate} />;
};

export default NewScoresheetContainer;
