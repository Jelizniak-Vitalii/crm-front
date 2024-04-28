import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { RegistrationPayload, useRegisterMutation } from '../../../../modules/Auth/AuthApi.ts';
import RegistrationFormRender from './RegistrationFormRender.tsx';
import CustomNavLink from '../../../../shared/ui/CustomNavLink.tsx';
import { useNavigate } from 'react-router-dom';
import { RegistrationFormValues } from '../entities/RegistrationFormValues.ts';

const Registration = () => {
  const navigate = useNavigate();

  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation();

  const handleSubmit = async (values: RegistrationFormValues) => {
    if (values.email && values.password) {
      await register(values as RegistrationPayload)
        .unwrap()
        .then(() => {
          navigate('/login', { replace: true });
        });
    }
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
              <Form<RegistrationFormValues> onSubmit={handleSubmit} render={props => <RegistrationFormRender {...props} submitting={isLoadingRegister} />} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Typography variant="inherit">Уже есть аккаунт?</Typography>
                </Grid>

                <Grid item>
                  <CustomNavLink to="/login" linkText="Войти" underline="hover" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Registration;
