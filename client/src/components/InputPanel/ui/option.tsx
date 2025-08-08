export const Option = ({ value, color }: React.ComponentProps<"option">) => {
  return (
    <option
      value={value}
      style={{ color: color }}
      className="
        h-8.75 w-22.5
        mr-2.5 p-[flex]
        bg-[#1a1a1a]
        border rounded-lg border-solid border-transparent
        transition-all
        duration-[0.25s] ease-[ease] hover:border-[aqua] active:border-[aqua]
      "
    ></option>
  );
};
