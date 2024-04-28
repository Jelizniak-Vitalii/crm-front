import { Field, FormRenderProps } from 'react-final-form';
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { CreateServiceFormValues } from '../entities/FormValues.ts';
import ImageDropzoneField from '../../../shared/components/FormFields/ImageDropzoneFormField.tsx';
import React, { useMemo, useState, useRef } from 'react';
import NumericField from '../../../shared/components/FormFields/NumericField.tsx';
import { Spinner } from '@phosphor-icons/react';
import { Autocomplete } from '@mui/lab';

import { kepple } from '../../../styles/theme/colors.ts';
import { ClearIcon } from '@mui/x-date-pickers';
import { useGetAllCategoriesQuery } from '../../../modules/Categories/CategoriesApi.ts';

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

type CreateServiceFormRenderProps = FormRenderProps<CreateServiceFormValues> & {
  changeModalState: () => void;
};

const CreateServiceFormRender = ({ handleSubmit, form, submitting, changeModalState }: CreateServiceFormRenderProps) => {
  const [isNewCategoryCreating, setIsNewCategoryCreating] = useState(false);
  const categoryNameRef = useRef<HTMLDivElement | null>(null);
  const categorySelectRef = useRef<HTMLDivElement | null>(null);

  const { active: activeValue, onlineBooking: onlineBookingValue, image, categoryId } = form.getState().values;

  const { data: categories, isFetching: isFetchingCategories } = useGetAllCategoriesQuery();
  const categoriesOptions = useMemo(() => {
    const mapcategoriesOptions = categories?.map(({ categoryName, id }) => ({ label: categoryName, value: id })) ?? [];
    return [{ label: '+ Создать свою категорию', value: 0 }, ...mapcategoriesOptions];
  }, [categories]);

  const handleClearNewCategory = () => {
    setIsNewCategoryCreating(false);
    form.change('categoryName', undefined);
    setTimeout(() => {
      categorySelectRef?.current?.focus();
    }, 0);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <Stack spacing={3}>
          <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
            <Field name="image" component={ImageDropzoneField} variant="square" />

            <Button variant="outlined" size="small" disabled={!image} onClick={() => form.change('image', undefined)}>
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

          {isNewCategoryCreating ? (
            <Field
              name="categoryName"
              render={props => (
                <TextField
                  inputRef={categoryNameRef}
                  name={props.input.name}
                  label="Категория"
                  placeholder="Введите название новой категории"
                  size="small"
                  fullWidth
                  value={props.input.value}
                  onChange={props.input.onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClearNewCategory} edge="end">
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...props}
                />
              )}
            />
          ) : (
            <Field
              name="categoryId"
              render={props => (
                <Autocomplete
                  value={categoriesOptions.find(option => option.value === categoryId) ?? null}
                  freeSolo
                  options={categoriesOptions}
                  disabled={isFetchingCategories}
                  loading={isFetchingCategories}
                  openOnFocus
                  fullWidth
                  size="small"
                  renderInput={params => <TextField inputRef={categorySelectRef} {...params} label="Категория" />}
                  renderOption={(props, option) => {
                    if (option.value === 0) {
                      return (
                        <Box component="li" color={kepple[600]} fontWeight="bolder" {...props}>
                          {option.label}
                        </Box>
                      );
                    }

                    return (
                      <Box component="li" {...props}>
                        {option.label}
                      </Box>
                    );
                  }}
                  onChange={(_, value) => {
                    if (typeof value === 'object' && value?.value === 0) {
                      setIsNewCategoryCreating(true);
                      setTimeout(() => {
                        categoryNameRef?.current?.focus();
                      }, 0);

                      form.change('categoryId', undefined);
                      return;
                    } else if (typeof value === 'object' && value?.value) {
                      form.change('categoryId', value.value);
                    }
                  }}
                  {...props}
                />
              )}
            />
          )}

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

          <Stack direction="row" spacing={2}>
            <Field
              name="active"
              type="checkbox"
              render={props => (
                <FormControlLabel
                  label="Активность"
                  name="active"
                  control={<Checkbox checked={Boolean(activeValue)} name={props.input.name} color="success" onChange={props.input.onChange} {...props} />}
                />
              )}
            />

            <Field
              name="onlineBooking"
              type="checkbox"
              render={props => (
                <FormControlLabel
                  label="Запись онлайн"
                  name="onlineBooking"
                  control={<Checkbox checked={Boolean(onlineBookingValue)} name={props.input.name} color="primary" onChange={props.input.onChange} {...props} />}
                />
              )}
            />
          </Stack>

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

          <Button variant="outlined" onClick={changeModalState}>
            Отменить
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default CreateServiceFormRender;
