import Logo from '../UI/Logo';
import Heading from '../UI/Heading';
import LoginForm from '../features/Authentication/LoginForm';

const Login = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-base-200 w-screen h-screen'>
      <Logo />
      <Heading as='h3'>Login to your account</Heading>
      <LoginForm />
    </div>
  );
};

export default Login;
