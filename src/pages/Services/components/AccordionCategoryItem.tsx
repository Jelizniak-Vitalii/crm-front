import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

import ServiceCard from './ServiceCard.tsx';
import { CategoryWithService } from '../../../modules/Categories/CategoriesApi.ts';

type AccordionCategoryItemProps = {
  expanded: string | false;
  onChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  categoryWithService: CategoryWithService;
};

const AccordionCategoryItem = ({ expanded, onChange, categoryWithService }: AccordionCategoryItemProps) => {
  const { services, id, categoryName } = categoryWithService;

  const categoryId = String(id);

  return (
    <Accordion expanded={expanded === categoryId} onChange={onChange(categoryId)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
        <Typography sx={{ width: '33%', flexShrink: 0 }}>{categoryName}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={3}>
          {services?.map(service => (
            <Grid item key={id}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionCategoryItem;
