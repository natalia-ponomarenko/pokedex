type Props = {
  text: string;
};

export const Error:React.FC<Props> = ({ text }) => {
  return (
    <div className="text-red-500 p-2 m-1">
      <span>{text}</span>
    </div>
  );
};
