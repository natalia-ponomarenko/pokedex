type Props ={
  handleAction: () => void;
  disabled: boolean;
  children: string;
}

export const Button: React.FC<Props> = ({ handleAction, disabled, children }) => {
  return (
    <button onClick={handleAction} disabled={disabled}>
      {children}
    </button>
  );
};
