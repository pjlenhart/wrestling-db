import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { getSchools } from '../services/schoolService';
import { getWrestlers } from '../services/rosterService';
import { getTournamentNames } from '../services/matchService';
import { createTournamentDraft, saveDraft, DraftStoreError } from './storage/draftStore';
import { readCachedRoster, writeCachedRoster } from './storage/rosterCache';
import { canEditScoresheets } from './permissions';
import TournamentSetup from './components/TournamentSetup';

const NewTournamentContainer = () => {
    const history = useHistory();
    const allowed = canEditScoresheets();
    const [tournaments, setTournaments] = useState([]);
    const [roster, setRoster] = useState(readCachedRoster);
    const [schools, setSchools] = useState([]);
    const [error, setError] = useState(null);

    // Each list is a convenience, not a requirement -- everything can be
    // typed -- so none of them failing may block starting a bout.
    useEffect(() => {
        getTournamentNames()
            .then((response) => setTournaments(response?.data || []))
            .catch((err) => console.error('Error fetching tournaments:', err));
        getSchools()
            .then((response) => setSchools(response?.data || []))
            .catch((err) => console.error('Error fetching schools:', err));
        getWrestlers()
            .then((response) => {
                const fetched = response?.data || [];
                if (fetched.length) {
                    setRoster(fetched);
                    writeCachedRoster(fetched);
                }
            })
            .catch((err) => console.error('Error fetching roster:', err));
    }, []);

    const handleCreate = (setup) => {
        try {
            const draft = saveDraft(createTournamentDraft(setup));
            history.push(`/scoresheet/tournament/${draft.id}`);
        } catch (err) {
            setError(err instanceof DraftStoreError ? err.message : 'The scoresheet could not be started.');
        }
    };

    // Starting a bout is a write, so it needs the same account the submit will.
    if (!allowed) {
        return <Redirect to="/scoresheet/login?next=/scoresheet/tournament/new" />;
    }

    return (
        <TournamentSetup
            tournaments={tournaments}
            roster={roster}
            schools={schools}
            error={error}
            onCreate={handleCreate}
        />
    );
};

export default NewTournamentContainer;
