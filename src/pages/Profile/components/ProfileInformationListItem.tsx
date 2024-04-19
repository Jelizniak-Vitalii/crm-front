import ListItem from '@mui/material/ListItem';
import { ReactNode } from 'react';
import { Grid, Typography } from '@mui/material';

type ProfileInformationListItemProps = {
  icon: ReactNode;
  itemName: string;
  text: string | undefined;
};

const ProfileInformationListItem = ({ icon, text, itemName }: ProfileInformationListItemProps) => {
  return (
    <ListItem sx={{ paddingLeft: 0 }}>
      <Grid container spacing={1}>
        <Grid item> {icon}</Grid>

        <Grid item>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="subtitle1">{`${itemName}:`}</Typography>
            </Grid>

            <Grid item>
              <Typography variant="subtitle2">{text ?? '-'}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ProfileInformationListItem;
