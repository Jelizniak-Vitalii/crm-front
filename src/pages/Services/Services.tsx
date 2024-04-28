import Page from '../../shared/ui/Page.tsx';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import { useState } from 'react';
import CreateServiceModal from './components/CreateServiceModal.tsx';
import { useGetAllCategoriesWithServicesQuery } from '../../modules/Services/ServicesApi.ts';

const Services = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: categoriesWithServices, isFetching: isFetchingCategoriesWithServices } = useGetAllCategoriesWithServicesQuery();

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
          {isFetchingCategoriesWithServices ? (
            <Grid container justifyContent="center">
              {/* TODO: заменить на спиннер*/}
              <Grid item>Loading...</Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {/*{services?.map(({ id, serviceName, price }) => (*/}
              {/*  <Grid item key={id}>*/}
              {/*    <Card>*/}
              {/*      <CardContent>*/}
              {/*        <Grid container>*/}
              {/*          <Grid item>*/}
              {/*            <Typography>{serviceName}</Typography>*/}
              {/*          </Grid>*/}

              {/*          <Grid item>*/}
              {/*            <Typography>{price}</Typography>*/}
              {/*          </Grid>*/}
              {/*        </Grid>*/}
              {/*      </CardContent>*/}
              {/*    </Card>*/}
              {/*  </Grid>*/}
              {/*))}*/}
            </Grid>
          )}
        </Grid>
      </Grid>

      <CreateServiceModal isOpen={isOpenModal} changeModalState={handleChangeModalState} />
    </Page>
  );
};

export default Services;
