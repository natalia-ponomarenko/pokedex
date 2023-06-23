type Props = {
  handleAction?: () => void;
  title: string;
  iconClassName: string;
  className: string;
};

export const NavigationButton: React.FC<Props> = ({
  handleAction,
  title,
  iconClassName,
  className,
}) => {
  return (
    <button
      onClick={handleAction}
      className={className}
      title={title}
    >
      <i className={`fa-solid ${iconClassName}`} />
    </button>
  );
};
