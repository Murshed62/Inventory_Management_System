import Heading from '../UI/Heading';
import InfoChangeForm from '../features/Profile/InfoChangeForm';
import PasswordChangeForm from '../features/Profile/PasswordChangeForm';

const Profile = () => {
  return (
    <>
      <Heading as='h1'>My Profile</Heading>
      <div className='flex flex-col w-full gap-10'>
        <InfoChangeForm />
        <PasswordChangeForm />
      </div>
    </>
  );
};

export default Profile;
