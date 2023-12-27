const Tag = ({ type, children, size = 'md' }) => {
  if (size === 'sm')
    return (
      <span
        className={`badge border border-${type} shadow-md badge-sm`}
        style={{
          color: `var(--color-${type})`,
          backgroundColor: `var(--color-${type}-100)`,
        }}
      >
        {children}
      </span>
    );
  if (size === 'md')
    return (
      <span
        className={`badge border border-${type} shadow-md badge-md`}
        style={{
          color: `var(--color-${type})`,
          backgroundColor: `var(--color-${type}-100)`,
        }}
      >
        {children}
      </span>
    );
  if (size === 'lg')
    return (
      <span
        className={`badge border border-${type} shadow-md badge-lg`}
        style={{
          color: `var(--color-${type})`,
          backgroundColor: `var(--color-${type}-100)`,
        }}
      >
        {children}
      </span>
    );
  if (size === 'xl')
    return (
      <span
        className={`badge border border-${type} shadow-md badge-xl`}
        style={{
          color: `var(--color-${type})`,
          backgroundColor: `var(--color-${type}-100)`,
        }}
      >
        {children}
      </span>
    );
};

export default Tag;
