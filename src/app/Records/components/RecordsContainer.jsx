import React, { useState, useEffect } from 'react';
import { getCareerStats } from '../../services/statisticsService';
import { getWrestlers } from '../../services/rosterService';
import Records from './Records';

const RecordsContainer = () => {
    const [records, setRecords] = useState([]);
    // Career stats carry no roster flag, so active/alumni has to come from the
    // roster and be joined on wrestler_id.
    const [activeWrestlerIds, setActiveWrestlerIds] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllRecords = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // The roster is what splits the tabs, but it is not worth failing
            // the whole page over: if it does not load, Records falls back to
            // one untabbed list rather than showing an empty Active tab.
            const [statsResponse, rosterResponse] = await Promise.all([
                getCareerStats(),
                getWrestlers().catch((rosterError) => {
                    console.error('Error fetching roster:', rosterError);
                    return null;
                }),
            ]);

            setRecords(statsResponse?.data || []);

            if (rosterResponse?.data) {
                setActiveWrestlerIds(
                    new Set(
                        rosterResponse.data
                            .filter((w) => w.active_roster === 1)
                            .map((w) => w.wrestler_id)
                    )
                );
            } else {
                setActiveWrestlerIds(null);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
            setError('Failed to load records. Please try again later.');
            setRecords([]);
            setActiveWrestlerIds(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllRecords();
    }, []);

    return (
        <Records
            records={records}
            activeWrestlerIds={activeWrestlerIds}
            isLoading={isLoading}
            error={error}
        />
    );
};

export default RecordsContainer;
