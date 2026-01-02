import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../styles/schoolStyles.css';

const SchoolRegionTable = (props) => {
    const { header, data, color } = props;

    return (
        <Paper className="school-region-card" elevation={0}>
            <Box 
                className="school-region-header" 
                style={{ backgroundColor: color || '#800000' }}
            >
                <Typography className="school-region-title">
                    {header}
                </Typography>
            </Box>
            <List className="school-region-list" disablePadding>
                {data && data.length > 0 ? (
                    data.map((school, index) => (
                        <ListItem 
                            key={index} 
                            className={`school-region-item ${index % 2 === 0 ? 'even' : ''}`}
                            disablePadding
                        >
                            <ListItemText
                                primary={school.school_name}
                                secondary={school.county}
                                className="school-region-text"
                                primaryTypographyProps={{
                                    className: 'school-name'
                                }}
                                secondaryTypographyProps={{
                                    className: 'school-county'
                                }}
                            />
                        </ListItem>
                    ))
                ) : (
                    <ListItem className="school-region-item" disablePadding>
                        <ListItemText 
                            primary="No schools listed"
                            className="school-region-text"
                        />
                    </ListItem>
                )}
            </List>
        </Paper>
    );
};

export default SchoolRegionTable;
