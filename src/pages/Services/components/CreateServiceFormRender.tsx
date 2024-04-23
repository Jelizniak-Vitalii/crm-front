import { Field, FormRenderProps } from 'react-final-form';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { CreateServiceFormValues } from '../entities/FormValues.ts';
import ImageDropzoneField from '../../../shared/components/FormFields/ImageDropzoneFormField.tsx';
import React from 'react';
import NumericField from '../../../shared/components/FormFields/NumericField.tsx';
import { Spinner } from '@phosphor-icons/react';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

type CreateServiceFormRenderProps = FormRenderProps<CreateServiceFormValues>;

const CreateServiceFormRender = ({ handleSubmit, form, submitting }: CreateServiceFormRenderProps) => {
  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
            <Field name="img" component={ImageDropzoneField} />

            <Button variant="outlined" size="small" onClick={() => form.change('image', undefined)}>
              Удалить
            </Button>
          </Stack>

          <Field
            name="serviceName"
            render={props => (
              <TextField
                name={props.input.name}
                label="Название"
                placeholder="Введите название услуги"
                size="small"
                fullWidth
                value={props.input.value}
                onChange={props.input.onChange}
                {...props}
              />
            )}
          />

          <Field
            name="categoryId"
            render={props => (
              <TextField
                name={props.input.name}
                InputProps={{
                  inputComponent: NumericField as never,
                }}
                label="Временная категория"
                placeholder="Введите айди категории"
                size="small"
                fullWidth
                value={props.input.value}
                onChange={props.input.onChange}
                {...props}
              />
            )}
          />

          <Field
            name="price"
            render={props => (
              <TextField
                name={props.input.name}
                InputProps={{
                  inputComponent: NumericField as never,
                }}
                label="Стоимость"
                placeholder="Введите цену услуги"
                size="small"
                fullWidth
                value={props.input.value}
                onChange={props.input.onChange}
                // TODO: понять почему нет префикса
                prefix="$"
                {...props}
              />
            )}
          />

          <Field
            name="duration"
            render={props => (
              <TextField
                name={props.input.name}
                label="Время оказания"
                placeholder="Введите время оказания услуги"
                size="small"
                fullWidth
                value={props.input.value}
                onChange={props.input.onChange}
                {...props}
              />
            )}
          />

          <Field
            name="active"
            type="checkbox"
            render={props => (
              <FormControlLabel
                label="Активность"
                control={<Checkbox checked={Boolean(props.input.value)} name={props.input.name} color="success" onChange={props.input.onChange} {...props} />}
              />
            )}
          />

          {/* TODO: Допилить стиль текстэрии под общий стиль*/}
          <Field
            name="description"
            render={props => <Textarea name={props.input.name} minRows={3} placeholder="Опишите услугу" value={props.input.value} onChange={props.input.onChange} {...props} />}
          />
        </Stack>

        <Stack spacing={3} justifyContent="flex-start" direction="row">
          <Button type="submit" variant="contained" startIcon={submitting ? <Spinner /> : undefined} disabled={submitting}>
            Создать
          </Button>

          <Button variant="outlined">Отменить</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default CreateServiceFormRender;
