import Page from '../../shared/ui/Page.tsx';
import { Button, Grid } from '@mui/material';
import { Plus } from '@phosphor-icons/react';
import React, { useState } from 'react';
import CreateServiceModal from './components/CreateServiceModal.tsx';
import AccordionCategoryItem from './components/AccordionCategoryItem.tsx';
import { useGetAllCategoriesWithServicesQuery } from '../../modules/Categories/CategoriesApi.ts';

const Services = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | false>(false);

  const { data: categoriesWithServices, isFetching: isFetchingCategoriesWithServices } = useGetAllCategoriesWithServicesQuery();

  const handleChangeExpandedCategory = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedCategory(isExpanded ? panel : false);
  };

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

        <Grid item xs={12}>
          {isFetchingCategoriesWithServices ? (
            <Grid container justifyContent="center">
              {/* TODO: заменить на спиннер*/}
              <Grid item>Loading...</Grid>
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {categoriesWithServices?.map(categoryWithService => (
                <Grid item xs={12} key={categoryWithService.id}>
                  <AccordionCategoryItem categoryWithService={categoryWithService} expanded={expandedCategory} onChange={handleChangeExpandedCategory} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <CreateServiceModal isOpen={isOpenModal} changeModalState={handleChangeModalState} />
    </Page>
  );
};

export default Services;
