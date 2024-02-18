import React from 'react';
import '../styles/styles.css';
import PageHeader from '../../common/Header/PageHeader';
import Subheader from '../../common/Header/Subheader';

const SeasonTitle = (props) => {
    return (
        <>
            <PageHeader header="Season Stats" />
            <Subheader
                label="One stop shop for individual statistics by match"
                minWidth={600}
                paddingLeft={5}
                paddingBottom={5}
            />
        </>
    );
};

export default SeasonTitle;
