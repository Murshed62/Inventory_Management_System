import Heading from '../../UI/Heading';
const Stat = ({ colorBg, title, value, icon }) => {
  return (
    <div
      className='bg-base-100 card card-compact 
     basis-full md:basis-[250px] lg:basis-auto flex-1  shadow-md'
    >
      <div className='card-body flex gap-3 items-center flex-row'>
        <div
          className={`p-3 rounded-full  flex justify-center items-center `}
          style={{ backgroundColor: colorBg }}
        >
          {icon}
        </div>
        <div>
          <Heading as='h4'>{title}</Heading>
          <span className=' text-xl'>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Stat;
