import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import LoginFormRender from './LoginFormRender.tsx';
import { LoginPayload, useLoginMutation } from '../../../modules/Auth/AuthApi.ts';
import CustomNavLink from '../../../shared/ui/CustomNavLink.tsx';
import { useNavigate } from 'react-router-dom';

type LoginFormValues = {
  email?: string;
  password?: string;
};

const Login = () => {
  const navigate = useNavigate();


  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();

  const handleSubmit = async (values: LoginFormValues) => {
    if (values.password !== undefined && values.email !== undefined) {
      await login(values as LoginPayload)
        .unwrap()
        .then(() => {
          navigate('/dashboard', { replace: true });
        });
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Card raised sx={{ minWidth: 400 }}>
        <CardContent>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="h5">Вход</Typography>
            </Grid>

            <Grid item xs={12}>
              <Form<LoginFormValues> onSubmit={handleSubmit} render={props => <LoginFormRender {...props} submitting={isLoadingLogin} />} />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Typography variant="inherit">Еще нет аккаунта?</Typography>
                </Grid>

                <Grid item>
                  <CustomNavLink to={'/registration'} linkText="Зарегистрироваться" underline="hover" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
