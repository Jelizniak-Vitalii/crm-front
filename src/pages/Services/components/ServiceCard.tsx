import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';

import { Service } from '../../../modules/Services/ServicesApi.ts';
import { Money } from '@phosphor-icons/react';

type ServiceCardProps = {
  service: Service;
};

const ServiceCard = ({ service: { image, serviceName, price, duration, description } }: ServiceCardProps) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: '250px' }}>
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={image ?? ''} variant="square" />
          </Box>
          <Stack spacing={1}>
            <Typography align="center" variant="h6">
              {serviceName}
            </Typography>
            <Typography align="center" variant="body1">
              {description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <ClockIcon fontSize="var(--icon-fontSize-md)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            {duration} минут
          </Typography>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <Money fontSize="var(--icon-fontSize-md)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            {price} $
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ServiceCard;
