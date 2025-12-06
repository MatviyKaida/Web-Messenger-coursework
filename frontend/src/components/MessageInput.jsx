import { useRef, useState } from "react"
import { useChatStore } from "../store/UseChatStore.js";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [textContent, setTextContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { createMessage } = useChatStore();
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
  const removeImage = async () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  const handleCreateMessage = async (event) => {
    event.preventDefault();
    if(!textContent.trim() && !imagePreview){
      return;
    }
    try {
      await createMessage({
        textContent: textContent.trim(),
        AttachedPicUrl: imagePreview
      })
      setTextContent("");
      setImagePreview(null);
      if(fileInputRef.current){
        fileInputRef.current.value = "";
      }
    }
    catch(err) {
      console.log(`Handle create message error: ${err}`);
    }
  }
  return (
     <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleCreateMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!textContent.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput