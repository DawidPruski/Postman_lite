export const Select = ({ ...props }: React.ComponentProps<"select">) => {
  return (
    <select
      id="methodSelect"
      defaultValue="GET"
      className="
        h-8.75 w-22.5
        mr-2.5 p-[flex]
        text-center text-inherit
        bg-[#1a1a1a]
        border rounded-lg border-solid border-transparent
        transition-all
        duration-[0.25s] ease-[ease] hover:border-[aqua] active:border-[aqua] focus-visible:outline-[aqua] focus:outline-none
      "
      {...props}
    >
      <option value="GET" style={{ color: "green" }}>
        GET
      </option>
      <option value="POST" style={{ color: "yellow" }}>
        POST
      </option>
      <option value="PUT" style={{ color: "cyan" }}>
        PUT
      </option>
      <option value="PATCH" style={{ color: "white" }}>
        PATCH
      </option>
      <option value="DELETE" style={{ color: "red" }}>
        DELETE
      </option>
    </select>
  );
};
