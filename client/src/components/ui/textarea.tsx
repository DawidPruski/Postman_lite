export const TextArea = ({ ...props }: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      placeholder="Body goes here..."
      className="
        w-125 h-62.5
        border rounded-xl border-solid border-transparent
        transition-[border]
        p-2
        bg-[#3B3B3B]
        duration-[0.25s] ease-[ease] hover:border-[aqua] active:border-[aqua] focus:outline-[aqua] focus-visible:outline-[aqua] focus:outline-none
        "
      {...props}
    />
  );
};
