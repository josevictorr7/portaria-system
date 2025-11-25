import { useState, useRef } from "react";
import { Camera, User } from "lucide-react";

function PhotoInput({ onChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        onClick={handleClick}
        className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative hover:ring-2 hover:ring-blue-400 transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <User size={48} className="text-gray-400" />
        )}
        <div className="absolute bottom-1 right-1 bg-gray-200 text-white p-1 rounded-full">
          <Camera />
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default PhotoInput;
