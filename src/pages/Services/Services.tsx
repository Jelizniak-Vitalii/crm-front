import Page from '../../shared/ui/Page.tsx';
import { Button, Grid, Paper } from '@mui/material';
import { Plus } from '@phosphor-icons/react';

const Services = () => {
  return (
    <Page title="Услуги">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" startIcon={<Plus />}>
            Создать услугу
          </Button>
        </Grid>

        <Grid item>
          <Paper>Services</Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Services;
