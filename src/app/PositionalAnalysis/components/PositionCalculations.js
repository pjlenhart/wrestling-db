/**
 * Utility functions for calculating positional wrestling analysis
 * Uses per-match analysis for accurate position strength metrics
 */

/**
 * Filter out forfeit matches from the analysis
 * @param {array} matches - Array of match objects
 * @returns {array} Matches excluding forfeits
 */
export const filterForfeitMatches = (matches) => {
    if (!matches || !Array.isArray(matches)) return [];
    
    return matches.filter(match => {
        const method = (match.match_stats?.method_of_result || '').toLowerCase();
        const isForfeit = method.includes('forfeit') || 
                          method.includes('ff') || 
                          method.includes('dq') || 
                          method.includes('default') ||
                          method.includes('medical');
        return !isForfeit;
    });
};

/**
 * Calculate per-match metrics for positional analysis
 * @param {object} match - Single match object with match_stats
 * @returns {object} Per-match positional metrics
 */
export const calculatePerMatchMetrics = (match) => {
    const ms = match.match_stats || {};
    const result = match.match_result?.toString().toUpperCase().trim() || '';
    const method = (ms.method_of_result || '').toLowerCase();
    const period = (ms.period || '').toString().toLowerCase();
    
    const tdFor = Number(ms.takedowns_for) || 0;
    const tdAgainst = Number(ms.takedowns_against) || 0;
    const escFor = Number(ms.escapes_for) || 0;
    const escAgainst = Number(ms.escapes_against) || 0;
    const revFor = Number(ms.reversals_for) || 0;
    const revAgainst = Number(ms.reversals_against) || 0;
    const nfFor = Number(ms.nearfall_for) || 0;
    const nfAgainst = Number(ms.nearfall_against) || 0;
    
    const isWin = result === 'W' || result === 'WIN';
    const isLoss = result === 'L' || result === 'LOSS';
    const isPin = method.includes('pin');
    const isFirstPeriod = period.includes('1st') || period === 'first' || period === '1';

    return {
        // Neutral metrics
        neutralWon: tdFor > tdAgainst,
        neutralLost: tdFor < tdAgainst,
        neutralEven: tdFor === tdAgainst,
        scoredTakedown: tdFor >= 1,
        takedownsFor: tdFor,
        takedownsAgainst: tdAgainst,
        takedownDifferential: tdFor - tdAgainst,
        
        // Bottom metrics
        wasPutOnBottom: tdAgainst > 0 || revAgainst > 0,
        escapedFromBottom: (escFor + revFor) >= 1,
        timesOnBottom: tdAgainst + revAgainst,
        escapesAndReversals: escFor + revFor,
        gotTurned: nfAgainst > 0,
        gotPinned: isLoss && isPin,
        
        // Top metrics
        wasOnTop: tdFor > 0 || revFor > 0,
        timesOnTop: tdFor + revFor,
        opponentEscaped: escAgainst > 0 || revAgainst > 0,
        opponentEscapes: escAgainst + revAgainst,
        keptControl: (tdFor + revFor) > (escAgainst + revAgainst),
        scoredTurns: nfFor > 0,
        nearFallsFor: nfFor,
        gotPin: isWin && isPin,
        // Quick pin: won by pin in 1st period with minimal TD and no escapes against
        isQuickPin: isWin && isPin && isFirstPeriod && tdFor <= 1 && escAgainst === 0,
        
        // Match outcome
        isWin,
        isLoss,
        method,
        period
    };
};

/**
 * Calculate neutral position analysis from match data
 * @param {array} matches - Array of match objects
 * @returns {object} Neutral position analysis
 */
export const calculateNeutralFromMatches = (matches) => {
    const validMatches = filterForfeitMatches(matches);
    
    if (validMatches.length === 0) {
        return {
            matchCount: 0,
            neutralWinRate: 0,
            takedownRate: 0,
            firstScoreRate: 0,
            totalTakedowns: 0,
            totalTakedownsAgainst: 0,
            neutralWins: 0,
            neutralLosses: 0,
            neutralEven: 0,
            rating: 'No Data'
        };
    }

    const metrics = validMatches.map(calculatePerMatchMetrics);
    
    const neutralWins = metrics.filter(m => m.neutralWon).length;
    const neutralLosses = metrics.filter(m => m.neutralLost).length;
    const neutralEven = metrics.filter(m => m.neutralEven).length;
    const scoredTakedown = metrics.filter(m => m.scoredTakedown).length;
    const totalTakedowns = metrics.reduce((sum, m) => sum + m.takedownsFor, 0);
    const totalTakedownsAgainst = metrics.reduce((sum, m) => sum + m.takedownsAgainst, 0);
    
    // Win or tie neutral = success
    const neutralWinRate = (neutralWins + neutralEven) / validMatches.length;
    const takedownRate = totalTakedowns / validMatches.length;
    const firstScoreRate = scoredTakedown / validMatches.length;

    return {
        matchCount: validMatches.length,
        neutralWinRate,
        takedownRate,
        firstScoreRate,
        totalTakedowns,
        totalTakedownsAgainst,
        neutralWins,
        neutralLosses,
        neutralEven,
        rating: getRatingFromRate(neutralWinRate)
    };
};

/**
 * Calculate bottom position analysis from match data
 * @param {array} matches - Array of match objects
 * @returns {object} Bottom position analysis
 */
export const calculateBottomFromMatches = (matches) => {
    const validMatches = filterForfeitMatches(matches);
    
    if (validMatches.length === 0) {
        return {
            matchCount: 0,
            matchesOnBottom: 0,
            escapeRate: 0,
            matchesEscaped: 0,
            matchesTurned: 0,
            matchesPinned: 0,
            totalEscapes: 0,
            totalReversals: 0,
            damageRate: 0,
            neverTakenDown: false,
            rating: 'No Data'
        };
    }

    const metrics = validMatches.map(calculatePerMatchMetrics);
    
    const matchesOnBottom = metrics.filter(m => m.wasPutOnBottom).length;
    const matchesEscaped = metrics.filter(m => m.wasPutOnBottom && m.escapedFromBottom).length;
    const matchesTurned = metrics.filter(m => m.gotTurned).length;
    const matchesPinned = metrics.filter(m => m.gotPinned).length;
    const totalEscapes = metrics.reduce((sum, m) => sum + (m.escapesAndReversals || 0), 0);
    
    // Escape rate: % of matches where you got off bottom when put there
    const escapeRate = matchesOnBottom > 0 ? matchesEscaped / matchesOnBottom : 0;
    
    // Damage rate: % of matches where you gave up near falls or got pinned
    const damageRate = validMatches.length > 0 
        ? (matchesTurned + matchesPinned) / validMatches.length 
        : 0;

    return {
        matchCount: validMatches.length,
        matchesOnBottom,
        escapeRate,
        matchesEscaped,
        matchesTurned,
        matchesPinned,
        totalEscapes,
        totalReversals: metrics.reduce((sum, m) => sum + (m.escapesAndReversals - (Number(m.escFor) || 0)), 0),
        damageRate,
        neverTakenDown: matchesOnBottom === 0,
        rating: matchesOnBottom === 0 ? 'Excellent' : getRatingFromRate(escapeRate, 'bottom')
    };
};

/**
 * Calculate top position analysis from match data
 * @param {array} matches - Array of match objects
 * @returns {object} Top position analysis
 */
export const calculateTopFromMatches = (matches) => {
    const validMatches = filterForfeitMatches(matches);
    
    if (validMatches.length === 0) {
        return {
            matchCount: 0,
            matchesOnTop: 0,
            controlRate: 0,
            matchesKeptControl: 0,
            matchesScoredTurns: 0,
            totalNearFalls: 0,
            totalPins: 0,
            quickPins: 0,
            topPins: 0,
            turningRate: 0,
            opponentEscapes: 0,
            neverOnTop: false,
            rating: 'No Data'
        };
    }

    const metrics = validMatches.map(calculatePerMatchMetrics);
    
    const matchesOnTop = metrics.filter(m => m.wasOnTop).length;
    const matchesKeptControl = metrics.filter(m => m.wasOnTop && m.keptControl).length;
    const matchesScoredTurns = metrics.filter(m => m.scoredTurns).length;
    const totalNearFalls = metrics.reduce((sum, m) => sum + m.nearFallsFor, 0);
    const totalPins = metrics.filter(m => m.gotPin).length;
    const quickPins = metrics.filter(m => m.isQuickPin).length;
    const topPins = totalPins - quickPins;
    const opponentEscapedMatches = metrics.filter(m => m.wasOnTop && m.opponentEscaped).length;
    const totalOpponentEscapes = metrics.reduce((sum, m) => sum + m.opponentEscapes, 0);
    
    // Control rate: % of matches where you kept control when on top
    const controlRate = matchesOnTop > 0 ? matchesKeptControl / matchesOnTop : 0;
    
    // Turning rate: % of matches where you scored near falls
    const turningRate = matchesOnTop > 0 ? matchesScoredTurns / matchesOnTop : 0;

    return {
        matchCount: validMatches.length,
        matchesOnTop,
        controlRate,
        matchesKeptControl,
        matchesScoredTurns,
        totalNearFalls,
        totalPins,
        quickPins,
        topPins,
        turningRate,
        opponentEscapedMatches,
        opponentEscapes: totalOpponentEscapes,
        neverOnTop: matchesOnTop === 0,
        rating: matchesOnTop === 0 ? 'Needs Work' : getRatingFromRate(controlRate)
    };
};

/**
 * Convert success rate to rating label
 * @param {number} rate - Success rate (0-1)
 * @param {string} position - Position type for custom thresholds
 * @returns {string} Rating label
 */
export const getRatingFromRate = (rate, position = 'default') => {
    if (position === 'bottom') {
        // Bottom has slightly different thresholds
        if (rate >= 0.80) return 'Excellent';
        if (rate >= 0.65) return 'Good';
        if (rate >= 0.50) return 'Average';
        if (rate >= 0.35) return 'Needs Work';
        return 'Weak';
    }
    
    // Default thresholds
    if (rate >= 0.75) return 'Excellent';
    if (rate >= 0.60) return 'Good';
    if (rate >= 0.45) return 'Average';
    if (rate >= 0.30) return 'Needs Work';
    return 'Weak';
};

/**
 * Calculate complete positional analysis from match data
 * @param {array} matches - Array of match objects for a wrestler/season
 * @returns {object} Complete positional analysis
 */
export const calculatePositionalAnalysisFromMatches = (matches) => {
    if (!matches || matches.length === 0) {
        return null;
    }

    const neutral = calculateNeutralFromMatches(matches);
    const bottom = calculateBottomFromMatches(matches);
    const top = calculateTopFromMatches(matches);

    // Determine strongest position based on ratings
    const ratingScores = {
        'Excellent': 5,
        'Good': 4,
        'Average': 3,
        'Needs Work': 2,
        'Weak': 1,
        'No Data': 0
    };

    const positions = [
        { 
            name: 'Neutral', 
            rating: neutral.rating, 
            score: ratingScores[neutral.rating] || 0,
            rate: neutral.neutralWinRate || 0
        },
        { 
            name: 'Bottom', 
            rating: bottom.rating, 
            score: ratingScores[bottom.rating] || 0,
            rate: bottom.escapeRate || 0
        },
        { 
            name: 'Top', 
            rating: top.rating, 
            score: ratingScores[top.rating] || 0,
            rate: top.controlRate || 0
        }
    ].sort((a, b) => {
        // First sort by rating score
        if (b.score !== a.score) return b.score - a.score;
        // Tiebreaker: use actual success rate
        return b.rate - a.rate;
    });

    return {
        neutral,
        bottom,
        top,
        strongestPosition: positions[0].name,
        positionRanking: positions.map(p => p.name),
        totalMatches: filterForfeitMatches(matches).length
    };
};

/**
 * Generate coaching insights based on positional analysis
 * @param {object} analysis - Complete positional analysis
 * @returns {array} Array of insight strings
 */
export const generateInsights = (analysis) => {
    if (!analysis) return [];

    const insights = [];
    const { neutral, bottom, top } = analysis;

    // Neutral insights
    if (neutral.rating === 'Excellent') {
        insights.push(`Dominant in neutral - won TD battle in ${Math.round(neutral.neutralWinRate * 100)}% of matches`);
    } else if (neutral.rating === 'Weak') {
        insights.push('Focus on neutral position - losing too many takedown exchanges');
    }
    
    if (neutral.takedownRate >= 2.0) {
        insights.push(`High volume scorer: ${neutral.takedownRate.toFixed(1)} takedowns per match`);
    } else if (neutral.takedownRate < 0.5 && neutral.matchCount > 0) {
        insights.push('Low takedown output - work on shot setups and finishes');
    }

    // Bottom insights
    if (bottom.neverTakenDown) {
        insights.push('Never taken down - exceptional takedown defense!');
    } else if (bottom.rating === 'Excellent') {
        insights.push('Excellent bottom wrestler - escapes quickly when taken down');
    } else if (bottom.rating === 'Weak' || bottom.rating === 'Needs Work') {
        insights.push('Work on bottom position - escaping after being taken down');
    }
    
    if (bottom.matchesPinned > 0) {
        insights.push(`Pinned in ${bottom.matchesPinned} match${bottom.matchesPinned > 1 ? 'es' : ''} - work on defensive positioning`);
    }
    
    if (bottom.matchesTurned > 2) {
        insights.push('Giving up too many near falls from bottom');
    }

    // Top insights
    if (top.neverOnTop) {
        insights.push('No top position time - need to score takedowns first');
    } else if (top.rating === 'Excellent') {
        insights.push('Strong on top - maintains control and works for turns');
    } else if (top.rating === 'Weak' || top.rating === 'Needs Work') {
        insights.push('Work on riding - opponents escaping too easily');
    }
    
    if (top.topPins >= 3) {
        insights.push(`Excellent finisher: ${top.topPins} pins from top position`);
    }
    
    if (top.quickPins >= 2) {
        insights.push(`${top.quickPins} quick pins from neutral - explosive attack style`);
    }
    
    if (top.totalNearFalls > 5 && top.topPins < 2) {
        insights.push('Creates back exposure but needs to work on finishing pins');
    }

    // Strategic insights based on strongest position
    if (analysis.strongestPosition === 'Neutral') {
        insights.push('Strategy: Keep matches on feet, push the pace');
    } else if (analysis.strongestPosition === 'Top') {
        insights.push('Strategy: Choose top when possible, work for pins');
    } else if (analysis.strongestPosition === 'Bottom') {
        insights.push('Strategy: Can safely defer in overtime situations');
    }

    return insights;
};
