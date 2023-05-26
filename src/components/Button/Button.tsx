type Props ={
  handleAction: () => void;
  disabled: boolean;
  children: string;
}

export const Button: React.FC<Props> = ({ handleAction, disabled, children }) => {
  return (
    <button 
      onClick={handleAction} 
      disabled={disabled}
      className="text-center text-white py-2 px-4 my-2 mx-1 w-40 rounded bg-red-600 disabled:bg-red-200"
    >
      {children}
    </button>
  );
};
