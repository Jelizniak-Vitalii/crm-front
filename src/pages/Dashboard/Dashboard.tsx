import Page from '../../shared/ui/Page.tsx';
import { Paper } from '@mui/material';

const Dashboard = () => {
  const goBack = () => console.log('goBack');
  return (
    <Page title="Dashboard" goBack={goBack}>
      <Paper>Dashboard</Paper>
    </Page>
  );
};

export default Dashboard;
