const RequestCard = ({ showImage = true }) => {
  return (
    <div className='shadow-md p-2 rounded-md bg-base-100'>
      <div className='flex'>
        {showImage && (
          <div className=' basis-1/3 flex items-center'>
            <img
              src='illustration-category/stationary.jpg'
              alt='Illustration Image'
            />
          </div>
        )}

        <div className='flex-1 p-4'>
          <h2 className=' font-bold text-xl flex justify-between items-center'>
            Stationary
            <time className=' font-normal text-sm text-muted'>
              12:30AM - 3 Aug 2023
            </time>
          </h2>
          <h3 className=' font-semibold'>Marker Pen</h3>
          <div className=' text-muted flex flex-col gap-2 mt-4'>
            <p>Available Quantity: 34</p>
            <p>Required Product Quantity: 30</p>
            <p>Requested By: Jahangir Alam, CSE</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <button className='btn flex-1 btn-primary'>Confirm</button>
        <button className='btn flex-1 btn-secondary'>Reject</button>
      </div>
    </div>
  );
};

export default RequestCard;
