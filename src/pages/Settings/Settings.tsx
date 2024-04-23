import { useState } from 'react';
import { Card, Grid, Tab, Tabs } from '@mui/material';

import Page from '../../shared/ui/Page.tsx';
import ProfileEditForm from './components/ProfileEditForm.tsx';

const Settings = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const handleChangeTab = (_: unknown, value: number) => {
    setCurrentTabIndex(value);
  };

  return (
    <Page title="Настройки">
      <Card>
        <Grid container spacing={4} padding={{ xs: 2, md: 5 }}>
          <Grid item xs={12}>
            <Tabs value={currentTabIndex} onChange={handleChangeTab}>
              <Tab label="Профиль" value={0} />
              <Tab label="Тариф" value={1} />
              <Tab label="Уведомления" value={2} />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            {currentTabIndex === 0 && <ProfileEditForm />}
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};

export default Settings;
