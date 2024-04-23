import Page from '../../shared/ui/Page.tsx';
import { Button, Grid, Paper } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import { useState } from 'react';
import CreateServiceModal from './components/CreateServiceModal.tsx';

const Services = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleChangeModalState = () => {
    setIsOpenModal(prevState => !prevState);
  };

  return (
    <Page title="Услуги">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button variant="contained" startIcon={<Plus />} onClick={handleChangeModalState}>
            Создать услугу
          </Button>
        </Grid>

        <Grid item>
          <Paper>Здесь будет список услуг</Paper>
        </Grid>
      </Grid>

      <CreateServiceModal isOpen={isOpenModal} changeModalState={handleChangeModalState} />
    </Page>
  );
};

export default Services;
