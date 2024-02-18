import { Typography } from '@mui/material';
import React from 'react';

const AboutFAQImageSection = (props) => {
    const { img, alt, className, caption } = props;

    return (
        <figure>
            <img src={img} alt={alt} className={className ? className : ''} />
            <figcaption>
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                        width: '175%',
                        fontFamily: 'Baloo',
                    }}
                >
                    {caption}
                </Typography>
            </figcaption>
        </figure>
    );
};

export default AboutFAQImageSection;
