import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../Auth/slice/userSlice.ts';
import ProfileInformationListItem from './ProfileInformationListItem.tsx';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ProfileInformation = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <List sx={{ bgcolor: 'background.paper' }}>
      <ProfileInformationListItem itemName="Электронная почта" text={currentUser?.email} icon={<EmailIcon />} />

      <ProfileInformationListItem itemName="Контактный телефон" text={currentUser?.phone} icon={<PhoneIcon />} />
    </List>
  );
};

export default ProfileInformation;
