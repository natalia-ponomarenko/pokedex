type Props = {
  handleAction?: () => void;
};

export const ReturnButton: React.FC<Props> = ({ handleAction }) => {
  return (
    <button
      onClick={handleAction}
      className="text-center text-white py-2 px-2.5 rounded transition ease-in-out delay-100 bg-red-600 hover:bg-juicy-red"
    >
      <i className="fa-solid fa-house"></i>
    </button>
  );
};
