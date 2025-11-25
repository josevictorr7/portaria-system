import { Search } from "lucide-react";

function InputSearch({ value, onChange, placeholder }) {
  return (
    <div className="relative w-full mb-4">

      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      <input
        type="text" 
        placeholder={placeholder}
        className="w-full p-2 pl-10 rounded-3xl bg-white focus:outline-none focus:ring-2 shadow focus:ring-blue-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputSearch;
