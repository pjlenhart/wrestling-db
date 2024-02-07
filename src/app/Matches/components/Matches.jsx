import React, { useState, useEffect } from 'react';

import MatchTable from './MatchTable';
import '../styles/matchStyles.css';

const Matches = (props) => {
    const { seasons, teamMatchData } = props;
    const orderSeasons = seasons.reverse();

    return (
        <div className="container">
            <h1 className="h1-match">Team Match Results</h1>
            {orderSeasons.map((season) => {
                return (
                    <>
                        <h2>
                            <b>Season {season}</b>
                        </h2>
                        <MatchTable
                            data={teamMatchData.filter(
                                (match) => match.season === season
                            )}
                            sortColumn="match_date"
                        />
                    </>
                );
            })}
        </div>
    );
};

export default Matches;
