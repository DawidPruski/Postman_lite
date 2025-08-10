export const Button = ({ type, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      type={type}
      className="
        h-8.75
        px-[1.2em] py-[0.4em]
        bg-[#1a1a1a]
        border rounded-lg border-solid border-transparent
        cursor-pointer transition-[border-color]
        duration-[0.25s] hover:border-[aqua]
      "
      {...props}
    />
  );
};
