import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import RegistrationFormRender from './RegistrationFormRender.tsx';

const BASE_URL = 'http://195.133.79.233';

type RegistrationFormValues = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};
const Registration = () => {
  const register = async (userData: RegistrationFormValues) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      return await response.json();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      throw error.message;
    }
  };

  const handleSubmit = async (values: RegistrationFormValues) => {
    await register(values);
    console.log('Успешно зарегался');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Card raised sx={{ minWidth: 350 }}>
        <CardContent>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="h5">Регистрация</Typography>
            </Grid>

            <Grid item xs={12}>
              <Form<RegistrationFormValues> onSubmit={handleSubmit} render={props => <RegistrationFormRender {...props} />} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Registration;
