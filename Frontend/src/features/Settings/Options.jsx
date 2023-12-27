import Option from './Option';
import useSettings from './useSettings';
import Spinner from '../../UI/Spinner';

const Options = () => {
  const { isLoading, settings } = useSettings();
  return (
    <div className='card my-5 shadow-md rounded-md bg-base-100 w-full md:max-w-[800px] min-h-[400px]'>
      {isLoading && (
        <div className=' card-body justify-center items-center'>
          <Spinner />
        </div>
      )}
      {settings && (
        <div className='card-body flex-col flex gap-10'>
          <Option
            title='Request'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas tenetur
          facilis quibusdam soluta'
            field='request'
            isChecked={settings['request']}
            id={settings._id}
          />

          <Option
            title='Change Password'
            description='Department admin can change their password by themself'
            field='passwordChange'
            isChecked={settings['passwordChange']}
            id={settings._id}
          />
          <Option
            title='Notification'
            description='Get up-to date with recent activity'
            field='notification'
            isChecked={settings['notification']}
            id={settings._id}
          />
          <Option
            title='Maximum Product Request'
            description='Maximum number of product request a admin can.'
            field='maxProductRequest'
            value={settings['maxProductRequest']}
            id={settings._id}
          />
        </div>
      )}
    </div>
  );
};

export default Options;
