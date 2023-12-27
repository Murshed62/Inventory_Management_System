import React from 'react';
import {
  HiMiniCheck,
  HiOutlineXMark,
  HiOutlineTrash,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import moment from 'moment';
import Heading from '../../UI/Heading';
import Tag from '../../UI/Tag';
import useAuth from '../../hooks/useAuth';
import Modal from '../../UI/Modal';
import AcceptConfirm from './AcceptConfirm';
import RejectConfirm from './RejectConfirm';
import RequestForm from './RequestForm';
import ConfirmDelete from '../../UI/ConfirmDelete';
import useDeleteRequest from './useDeleteRequest';

const tagCol = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'accepted':
      return 'success';
    default:
      return 'error';
  }
};

const RequestItem = ({ request }) => {
  const { isSuperAdmin, isDeptAdmin } = useAuth();
  const {
    _id,
    description,
    user: { fullName, department },
    status,
    createdAt,
    updatedAt,
    quantityAsk,
    product,
    quantityProvide,
  } = request;
  const { category, inStock, name } = product || {};
  const { isLoading, deleteRequest } = useDeleteRequest();
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 mb-4 card card-compact'>
      <div className='card-body bg-base-100 mx-2 shadow-md rounded-md'>
        <Heading as='h5'>
          <section className='flex justify-between items-center'>
            <span>{category?.title}</span>
            <small className=' text-muted text-xs font-normal'>
              {moment(createdAt).format('hh:mm A - DD MMM YYYY')}
            </small>
          </section>
        </Heading>
        <Heading as='h6'>
          {product ? (
            name
          ) : (
            <span className='text-error'>Product is deleted</span>
          )}
        </Heading>
        <div className=' text-muted my-2'>
          {product && <p>Available quantity: {inStock}</p>}

          <p>Required product quantity: {quantityAsk}</p>
          {status === 'accepted' && (
            <p>Provided product quantity: {quantityProvide}</p>
          )}
          <p>
            Requested by: {fullName}, {department}
          </p>
        </div>
        <p>
          Status:{' '}
          <Tag type={tagCol(status)} size='lg'>
            {status}
          </Tag>
        </p>
        {description && (
          <div>
            <Heading as='h6'>Description:</Heading>
            <p>{description}</p>
          </div>
        )}

        <div className='flex gap-2 justify-end'>
          {status !== 'pending' && (
            <p className=' capitalize text-xs text-muted text-right'>
              {status} date: {moment(updatedAt).format('hh:mm A - DD MMM YYYY')}
            </p>
          )}

          {isSuperAdmin && status === 'pending' && (
            <>
              <Modal id={`${_id}_accept`}>
                <Modal.Open>
                  {inStock === 0 ? (
                    <div
                      className='tooltip'
                      data-tip='Update stock then accept'
                    >
                      <button
                        disabled={inStock === 0}
                        className=' btn btn-primary flex-1'
                      >
                        <HiMiniCheck size={25} />
                        Accept
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={!product}
                      className=' btn btn-primary flex-1'
                    >
                      <HiMiniCheck size={25} />
                      Accept
                    </button>
                  )}
                </Modal.Open>
                <Modal.Window>
                  <AcceptConfirm request={request} />
                </Modal.Window>
              </Modal>
              <Modal id={`${_id}_reject`}>
                <Modal.Open>
                  <button className=' btn btn-secondary flex-1'>
                    <HiOutlineXMark size={25} />
                    Reject
                  </button>
                </Modal.Open>
                <Modal.Window>
                  <RejectConfirm request={request} />
                </Modal.Window>
              </Modal>
            </>
          )}
          {isDeptAdmin && status === 'pending' && (
            <>
              <Modal id={`${_id}_edit_req`}>
                <Modal.Open>
                  <button
                    disabled={!product}
                    className=' btn btn-primary flex-1'
                  >
                    <HiOutlinePencilSquare size={25} />
                    Edit
                  </button>
                </Modal.Open>
                <Modal.Window>
                  <RequestForm request={request} inventory={product} />
                </Modal.Window>
              </Modal>
              <Modal id={`${_id}_delete_req`}>
                <Modal.Open>
                  <button className=' btn btn-secondary flex-1'>
                    {' '}
                    <HiOutlineTrash size={25} />
                    Delete
                  </button>
                </Modal.Open>
                <Modal.Window>
                  <ConfirmDelete
                    isLoading={isLoading}
                    resourceName='request'
                    confirmAction={() => deleteRequest(_id)}
                  />
                </Modal.Window>
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
