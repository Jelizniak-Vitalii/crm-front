import { Box, Grid, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  pageContent: {
    backgroundColor: '#f0f2f5',
    minHeight: '100%',
  },
}));

type PageProps = {
  children: ReactNode;
  title: string;
  goBack?: () => void;
  isLoading?: boolean;
  loader?: ReactNode;
};

const Page = ({ children, title, goBack, isLoading, loader }: PageProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.pageContent}>
      <Grid padding={3}>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
            {goBack && (
              <Grid item>
                <IconButton color="primary" aria-label="go_back" onClick={goBack} size="large">
                  <ArrowBackIosIcon fontSize="large" />
                </IconButton>
              </Grid>
            )}

            <Grid item marginBottom={3}>
              <Typography variant="h3">{title}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {isLoading ? loader : children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
