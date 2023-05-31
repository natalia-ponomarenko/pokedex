import Select, { SingleValue, Theme } from "react-select";
import { URL10, options } from "../../helpers/constants";
import { SelectOption } from "../../types/SelectOption";

type Props = {
  handleChange: (update?: string, option?: SingleValue<SelectOption>) => void;
};

export const PokemonPerPageSelect: React.FC<Props> = ({ handleChange }) => {
  const handleSelectChange = (selectedOption: SingleValue<SelectOption>) => {
    handleChange(undefined, selectedOption);
  };

  return (
    <div className="w-56">
      <Select
        options={options}
        onChange={handleSelectChange}
        theme={(theme: Theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "lightgrey",
            primary: "red",
          },
        })}
        defaultValue={{ label: "10", value: URL10 }}
      />
    </div>
  );
};
