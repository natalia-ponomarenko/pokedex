type Props = {
  handleAction?: () => void;
};

export const ReturnButton: React.FC<Props> = ({ handleAction }) => {
  return (
    <button
      onClick={handleAction}
      className="text-center text-white p-2 m-2 rounded bg-red-600 hover:bg-juicy-red"
    >
      <i className="fa-solid fa-house pr-1"></i>
      Back to list
    </button>
  );
};
