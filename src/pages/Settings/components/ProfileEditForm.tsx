import { Form } from 'react-final-form';
import ProfileEditFormRender from './ProfileEditFormRender.tsx';
import { User } from '../../../modules/User/types/user.ts';
import { UpdateUserProfilePayload, useUpdateUserProfileMutation } from '../../../modules/User/UserApi.ts';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Auth/slice/userSlice.ts';
import { useMemo } from 'react';

type ProfileFormValues = Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>>;

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
      };
    }

    return {};
  }, [currentUser]);

  const handleSubmit = (newValues: ProfileFormValues) => {
    if (currentUser?.id) {
      if (newValues.phone && newValues.email && newValues.firstName && newValues.lastName) {
        updateUserProfile({ ...currentUser, ...newValues } as UpdateUserProfilePayload);
      }
    }
  };

  return <Form onSubmit={handleSubmit} initialValues={initialValues} render={props => <ProfileEditFormRender {...props} submitting={isLoadingUpdateUserProfile} />} />;
};

export default ProfileEditForm;
