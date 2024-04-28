import Page from '../../shared/ui/Page.tsx';
import { makeStyles } from 'tss-react/mui';
import { Avatar, capitalize, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ProfileInformation from './components/ProfileInformation.tsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slice/userSlice.ts';

const useStyles = makeStyles()(() => ({
  paper: {
    color: 'inherit',
    overflow: 'visible',
    borderRadius: '0.75rem',
    padding: '25px',
    minHeight: '300px',
  },
}));

const Profile = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const { classes } = useStyles();
  const currentUser = useSelector(selectCurrentUser);

  const handleChangeTab = (_: unknown, value: number) => {
    setCurrentTabIndex(value);
  };

  return (
    <Page title="Профиль">
      <Box>
        <Paper className={classes.paper} elevation={3}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              {currentUser && (
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar alt="avatar" src={currentUser.image ?? '/assets/avatar.png'} sx={{ width: 75, height: 75 }} />
                  </Grid>

                  <Grid item>
                    <Grid container direction="column">
                      <Grid item>
                        <Typography variant="h6">{`${capitalize(currentUser?.firstName)} ${capitalize(currentUser.lastName)}`}</Typography>
                      </Grid>

                      <Grid item>
                        <Typography variant="subtitle1">Here will be your profession</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid item xs={12}>
              <Tabs value={currentTabIndex} onChange={handleChangeTab}>
                <Tab label="Информация профиля" value={0} />
                <Tab label="Item One" value={1} />
                <Tab label="Item Two" value={2} />
              </Tabs>
            </Grid>

            {currentTabIndex === 0 && (
              <Grid item xs={12}>
                <ProfileInformation />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </Page>
  );
};

export default Profile;
