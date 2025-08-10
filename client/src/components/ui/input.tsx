export const Input = ({ type = "text", ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      className="
        h-8.75 w-75
        mr-2.5
        bg-[#3B3B3B]
        pl-2
        pr-2
        rounded-xl border border-transparent
        transition-all
        duration-250 ease-in-out hover:border-[aqua] active:border-[aqua] focus:outline-[aqua] focus-visible:outline-[aqua] focus:outline-none
      "
      {...props}
    ></input>
  );
};
