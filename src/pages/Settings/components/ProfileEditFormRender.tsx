import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Field, FormRenderProps } from 'react-final-form';
import { Box } from '@mui/system';
import ImageDropzoneField from '../../../shared/components/ImageDropzoneFormField.tsx';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';

const ProfileEditFormRender = ({ handleSubmit }: FormRenderProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Box maxWidth="300px">
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <Field name="userImg" component={ImageDropzoneField} />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="firstName"
              render={props => (
                <TextField name={props.input.name} label="Имя" placeholder="Введите имя" size="small" fullWidth value={props.input.value} onChange={props.input.onChange} {...props} />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="lastName"
              render={props => (
                <TextField name={props.input.name} label="Фамилия" placeholder="Введите фамилию" size="small" fullWidth value={props.input.value} onChange={props.input.onChange} {...props} />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="email"
              render={props => (
                <TextField
                  name={props.input.name}
                  label="Электронная почта"
                  placeholder="Введите email"
                  size="small"
                  fullWidth
                  value={props.input.value}
                  onChange={props.input.onChange}
                  {...props}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="phone"
              render={props => (
                <TextField
                  name={props.input.name}
                  label="Контактный номер"
                  placeholder="Введите номер телефона"
                  inputProps={{
                    maxLength: 10, // Максимальная длина ввода
                    pattern: '[0-9]*', // Шаблон для ограничения ввода только цифрами
                    inputMode: 'numeric', // Режим ввода, чтобы отображать числовую клавиатуру на мобильных устройствах
                  }}
                  size="small"
                  fullWidth
                  value={props.input.value}
                  onChange={props.input.onChange}
                  {...props}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              name="password"
              render={props => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">Новый пароль</InputLabel>
                  <OutlinedInput
                    label="Новый пароль"
                    placeholder="Введите новый пароль"
                    id="outlined-adornment-password"
                    name={props.input.name}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              <Grid item>
                <Button variant="contained" type="submit">
                  Сохранить
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default ProfileEditFormRender;
