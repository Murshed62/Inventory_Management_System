import { cloneElement, createContext, useContext, useRef } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const ModalContext = createContext();

const Modal = ({ children, id }) => {
  const closeBtn = useRef();

  const close = () => {
    closeBtn.current.click();
  };
  const open = () => {
    document.getElementById(id).showModal();
  };

  return (
    <ModalContext.Provider value={{ close, open, id, closeBtn }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: open });
};

const Window = ({ children }) => {
  const { close, id, closeBtn } = useContext(ModalContext);

  return (
    <>
      <dialog id={id} className='modal backdrop-blur-sm'>
        <div className='modal-box relative'>
          <form method='dialog' className=' absolute top-3 right-3'>
            <button className='btn btn-circle btn-sm' ref={closeBtn}>
              <HiOutlineXMark size={20} />
            </button>
          </form>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </div>

        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
