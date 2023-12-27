import React from 'react';
import RequestItem from './RequestItem';

const RequestList = ({ isLoading, requests = [] }) => {
  if (isLoading)
    return (
      <div className='w-full min-h-[400px] mt-5 flex justify-center items-center'>
        <span
          className='loading loading-infinity 
    loading-lg text-4xl'
        ></span>
      </div>
    );
  return (
    <div className='flex flex-wrap -mx-2 mt-5'>
      {requests.map((request) => (
        <RequestItem key={request._id} request={request} />
      ))}

      {/* <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem />
      <RequestItem /> */}
    </div>
  );
};

export default RequestList;
