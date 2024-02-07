import React from 'react';
import WrestlerPageTable from './WrestlerPageTable';
import WrestlerStatBox from './WrestlerStatBox';
import Accolades from './Accolades';
import '../styles/wrestlerStyles.css';
import RadarChart from './RadarCharts';

const WrestlerPage = (props) => {
    const { regularSeasonData, individualData, wrestlerData, careerStats } =
        props;
    const wrestlerName = wrestlerData ? wrestlerData.wrestler_name : null;
    console.log('stats', careerStats);
    const careerArr = careerStats.filter((stats) => stats.season === 'Career');
    const seasons = [...new Set(careerStats.map((stat) => stat.season))];
    const seasonList = seasons
        .filter((season) => season !== 'Career')
        .reverse();
    const career = careerArr[0] ? careerArr[0] : null;

    return regularSeasonData ? (
        <div className="container-fluid">
            <h1 className="h-home">{wrestlerName}</h1>
            <Accolades accolades={wrestlerData} />
            <div className="row">
                <div className="col-8">
                    <h2 className="h2-wrestler">Regular Season - Career</h2>
                    <WrestlerPageTable
                        data={regularSeasonData}
                        type="regularSeason"
                    />
                    <br />
                    <br />
                    <h2 className="h2-wrestler">
                        Individual/Postseason - Career
                    </h2>
                    <WrestlerPageTable
                        data={individualData}
                        type="individual"
                    />
                </div>
                <div className="col-4">
                    <h2 className="h2-wrestler">Wrestler Statistics</h2>
                    <p className="notes">
                        *Note: some statistics are only counted in the regular
                        season, wins/losses, match times, and periods are
                        counted in regular and post season.
                    </p>
                    <WrestlerStatBox data={career} />
                </div>
            </div>
            <div>
                <h2 className="h2-wrestler">
                    Scoring Actions Breakdown Compared to Opponents, by Season
                </h2>
                {seasonList.map((season) => {
                    return (
                        <>
                            <h2>Season {season}</h2>
                            <RadarChart
                                chartData={careerStats.filter(
                                    (sea) => sea.season === season
                                )}
                            />
                        </>
                    );
                })}
            </div>
        </div>
    ) : null;
};

export default WrestlerPage;
