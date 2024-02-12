import React from 'react';
import RosterTable from '../../Home/components/RosterTable';
import '../styles/wrestlerStyles.css';
import PageHeader from '../../common/Header/PageHeader';

const Wrestlers = (props) => {
    const { roster } = props;

    return (
        <>
            <PageHeader header="Wrestler Directory" />
            <div className="wrestler-table">
                <RosterTable data={roster} sortColumn="wrestler_name" />
            </div>
        </>
    );
};

export default Wrestlers;
