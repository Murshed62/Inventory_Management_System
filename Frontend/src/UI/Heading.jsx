const Heading = ({ as = 'h1', children }) => {
  const classNames = 'font-bold text-capitalize';
  if (as === 'h1')
    return <h1 className={`${classNames} text-4xl`}>{children}</h1>;
  if (as === 'h2')
    return <h2 className={`${classNames} text-3xl`}>{children}</h2>;
  if (as === 'h3')
    return <h3 className={`${classNames} text-2xl`}>{children}</h3>;
  if (as === 'h4')
    return <h4 className={`${classNames} text-xl`}>{children}</h4>;
  if (as === 'h5')
    return <h5 className={`${classNames} text-lg`}>{children}</h5>;
  if (as === 'h6')
    return <h6 className={`${classNames} text-md`}>{children}</h6>;
};

export default Heading;
