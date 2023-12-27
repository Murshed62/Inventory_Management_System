import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi2';

const context = createContext();

const Dropdown = ({ children, id }) => {
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const closeDropDown = () => {
    dropDownRef.current?.removeAttribute('open');
    setIsOpen(false);
  };
  useEffect(() => {
    const clickOutside = (e) => {
      if (e.target.closest(`#${id}`) !== dropDownRef.current) {
        closeDropDown();
      }
    };
    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [id]);

  const toggle = () => {
    setIsOpen((prevS) => !prevS);
  };

  return (
    <context.Provider value={{ close: closeDropDown, isOpen, toggle }}>
      <details id={id} ref={dropDownRef} className='dropdown dropdown-end'>
        {children}
      </details>
    </context.Provider>
  );
};

const Label = ({ children, classNames, showArrow = false }) => {
  const { isOpen, toggle } = useContext(context);
  return (
    <summary onClick={toggle} className={`btn ${classNames} relative`}>
      {children}
      {showArrow && (
        <HiOutlineChevronDown
          className={`absolute top-1/2 duration-200
      -translate-y-1/2 z-10 -right-1 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      )}
    </summary>
  );
};

const Body = ({ children }) => {
  const ulRef = useRef();
  const { close } = useContext(context);
  const onClickHandler = (e) => {
    // not click on the body
    if (e.currentTarget !== e.target) {
      close();
    }
  };
  return (
    <ul
      ref={ulRef}
      onClick={onClickHandler}
      tabIndex={-1}
      className='mt-3 z-[1] p-2 shadow menu menu-sm 
      dropdown-content bg-base-100 rounded-box w-52'
    >
      {children}
    </ul>
  );
};

Dropdown.Label = Label;
Dropdown.Body = Body;

export default Dropdown;
