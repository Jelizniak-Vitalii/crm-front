import { Backdrop, Card, CardContent, Fade, Modal, Stack, Typography } from '@mui/material';
import { Form } from 'react-final-form';
import { Dispatch, SetStateAction } from 'react';
import CreateServiceFormRender from './CreateServiceFormRender.tsx';
import { CreateServiceFormValues } from '../entities/FormValues.ts';
import { useCreateServiceMutation } from '../../../modules/Services/ServicesApi.ts';

// TODO: переделать на makeStyle
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type CreateServiceModalProps = {
  isOpen: boolean;
  changeModalState: Dispatch<SetStateAction<boolean>>;
};

const CreateServiceModal = ({ isOpen, changeModalState }: CreateServiceModalProps) => {
  const [createService, { isLoading: isLoadingCreateService }] = useCreateServiceMutation();
  const handleSubmit = (values: CreateServiceFormValues) => {
    if (values.serviceName) {
      createService({ ...values, categoryId: Number(values.categoryId) });
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={changeModalState}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={isOpen}>
        <Card sx={{ ...style, width: 500 }} elevation={1}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h4">Создание новой услуги</Typography>

              <Form<CreateServiceFormValues>
                onSubmit={handleSubmit}
                render={props => <CreateServiceFormRender submitting={isLoadingCreateService} changeModalState={changeModalState} {...props} />}
              />
            </Stack>
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default CreateServiceModal;
