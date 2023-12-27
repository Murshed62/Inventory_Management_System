import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Link to='/' className=' flex justify-center my-4'>
      <img src='/logo.svg' alt='Logo' width={200} />
    </Link>
  );
};

export default Logo;
