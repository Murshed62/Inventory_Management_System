import { useEffect, useRef, useState } from 'react';
import { HiChevronUpDown, HiOutlineXMark } from 'react-icons/hi2';
import Highlighter from 'react-highlight-words';

const Select = ({
  isDisabled,
  options,
  placeholder,
  onSelect,
  onClear,
  defaultValue,
  width,
}) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([...options]);

  // set default value
  useEffect(() => {
    setValue(options?.find((opt) => opt.value === defaultValue)?.label || '');
  }, [defaultValue, options]);

  useEffect(() => {
    const handler = (e) => {
      const isSelectElement = e.target.closest('#select');
      const isItemElement = e.target.closest('.menu a');
      const isClearBtnElement = e.target.closest('#clear-btn');

      if (!isSelectElement && !isItemElement && !isClearBtnElement) {
        setShowMenu(false);
      }
    };
    // const handleKeyUp = (e) => {
    //   if (e.key === 'Tab' && document.activeElement === inputRef.current) {
    //     setShowMenu(false);
    //   }
    // };
    window.addEventListener('click', handler);
    // window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.addEventListener('click', handler);
      //   window.removeEventListener('keyup', handleKeyUp);
    };
  }, [showMenu]);

  const onChangeHandler = (e) => {
    let filteredItems = [...options];
    const val = e.target.value;
    setValue(val);
    if (val.length > 0) {
      filteredItems = filteredItems.filter(
        (item) => item?.label?.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    }
    setItems(filteredItems);
  };
  const onSelectHandler = (item) => {
    setValue(item.label);
    setShowMenu(false);
    onSelect(item);
  };
  const onClearHandler = () => {
    setValue('');
    inputRef.current.focus();
    setItems([...options]);
    setShowMenu(true);
    if (onClear) onClear();
  };

  return (
    <div
      id='select'
      className={`w-full md:w-[${width}px] relative`}
      ref={containerRef}
      style={{ width: `${width}px` }}
    >
      {value ? (
        <button
          id='clear-btn'
          onClick={onClearHandler}
          className='bg-[var(--color-error-100)] flex justify-center 
        items-center cursor-pointer w-6 h-6 rounded-full bg-red-300 absolute -translate-y-1/2 top-1/2 right-2 z-10'
        >
          <HiOutlineXMark size={20} className='text-error font-bold' />
        </button>
      ) : (
        <HiChevronUpDown
          size={30}
          className=' absolute -translate-y-1/2 top-1/2 right-2 z-10'
        />
      )}

      <input
        disabled={isDisabled}
        type='text'
        placeholder={placeholder}
        className='input input-bordered input-primary w-full pr-10'
        value={value}
        onChange={onChangeHandler}
        onFocus={(e) => setShowMenu(true)}
        ref={inputRef}
      />
      {showMenu && (
        <ul
          className='menu flex-nowrap bg-base-100 w-full rounded-box 
        shadow-md mt-1 absolute z-10 overflow-y-auto max-h-[250px]'
        >
          {items.map((item) => (
            <li key={item.value}>
              <a onClick={() => onSelectHandler(item)}>
                <Highlighter
                  highlightClassName='bg-primary text-white'
                  searchWords={[value]}
                  autoEscape={true}
                  textToHighlight={item.label || ''}
                />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.defaultProps = {
  options: [],
  placeholder: 'Select',
  isDisabled: false,
  width: 200,
};

export default Select;
