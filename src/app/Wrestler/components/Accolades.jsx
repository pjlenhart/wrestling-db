import React from 'react';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { EmojiEvents } from '@mui/icons-material';
import Subheader from '../../common/Header/Subheader';

const Accolades = (props) => {
    const { accolades } = props;
    return (
        <Box
            sx={{
                fontFamily: 'Baloo',
            }}
        >
            <Subheader label="Career Accoaldes" paddingBottom={2} />
            <Stack>
                {accolades
                    ? accolades.map((acc) => (
                          <>
                              <span key={_.uniqueId()}>
                                  <EmojiEvents
                                      sx={{
                                          color: 'goldenrod',
                                          height: 15,
                                      }}
                                  />
                                  {` ${acc.place} place, ${acc.season} ${acc.tournament}`}
                              </span>
                          </>
                      ))
                    : null}
            </Stack>
        </Box>
    );
};

export default Accolades;
