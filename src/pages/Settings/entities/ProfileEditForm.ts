import { UpdateUserProfilePayload } from '../../../modules/User/UserApi.ts';

export type ProfileFormValues = Partial<UpdateUserProfilePayload> & {
  image?: string | null;
};
