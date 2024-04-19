import Page from '../../shared/ui/Page.tsx';
import { makeStyles } from 'tss-react/mui';
import { Avatar, Card, CardMedia, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useGetCurrentUserQuery } from '../../modules/User/UserApi.ts';
import ProfileInformation from './components/ProfileInformation.tsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../Auth/slice/userSlice.ts';

const useStyles = makeStyles()(() => ({
  containerContent: {
    position: 'relative',
  },
  cardImage: {
    position: 'relative',
    height: '300px',
    borderRadius: '0.75rem',
    boxShadow: 'none',
  },
  paper: {
    color: 'inherit',
    overflow: 'visible',
    borderRadius: '0.75rem',
    position: 'relative',
    marginTop: '-64px',
    marginLeft: '24px',
    marginRight: '24px',
    padding: '25px',
    // backgroundColor: '#ffff',
    minHeight: '300px',
  },
}));

const Profile = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const user = {
    firstName: 'Vanya',
    lastName: 'moldovan',
    profession: 'Мастер по маникюру',
  };

  const { classes } = useStyles();
  const currentUser = useSelector(selectCurrentUser);

  const handleChangeTab = (_: unknown, value: number) => {
    setCurrentTabIndex(value);
  };

  return (
    <Page title="Профиль">
      <Box>
        <Card className={classes.cardImage}>
          <CardMedia
            component="img"
            height="300px"
            image="https://img.goodfon.com/original/1920x1080/f/42/zakat-oblaka-nebo-solntse-hangmoon-anime-art-sky-mirror-otra.jpg"
            alt="headBackGround"
          />
        </Card>

        <Paper className={classes.paper} elevation={3}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar alt="Remy Sharp" src="https://www.looper.com/img/gallery/the-ending-of-avatar-finally-explained/intro-1669817126.jpg" sx={{ width: 75, height: 75 }} />
                </Grid>

                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="h6">{`${user.firstName} ${user.lastName}`}</Typography>
                    </Grid>

                    <Grid item>
                      <Typography variant="subtitle1">{user.profession}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
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
