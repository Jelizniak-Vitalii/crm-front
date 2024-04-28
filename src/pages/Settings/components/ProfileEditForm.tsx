import { Form } from 'react-final-form';
import ProfileEditFormRender from './ProfileEditFormRender.tsx';
import { useUpdateUserProfileMutation } from '../../../modules/User/UserApi.ts';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Auth/slice/userSlice.ts';
import { useMemo } from 'react';
import { ProfileFormValues } from '../entities/ProfileEditForm.ts';

const ProfileEditForm = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [updateUserProfile, { isLoading: isLoadingUpdateUserProfile }] = useUpdateUserProfileMutation();

  const initialValues = useMemo<ProfileFormValues>(() => {
    if (currentUser) {
      return {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email,
        active: currentUser.active,
        image: currentUser.image,
      };
    }

    return {};
  }, [currentUser]);

  const handleSubmit = (newValues: ProfileFormValues) => {
    if (currentUser?.id) {
      if (newValues.email && newValues.firstName && newValues.lastName) {
        //TODO: добавить нотификацию после успешного апдейта "Данные пользователя успешно обновлены"
        updateUserProfile({ id: currentUser.id, ...newValues });
      }
    }
  };

  return <Form<ProfileFormValues> onSubmit={handleSubmit} initialValues={initialValues} render={props => <ProfileEditFormRender {...props} submitting={isLoadingUpdateUserProfile} />} />;
};

export default ProfileEditForm;
