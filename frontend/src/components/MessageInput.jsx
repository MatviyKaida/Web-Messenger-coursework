import { useState } from "react"
import { useChatStore } from "../store/UseChatStore.js";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [textContent, setTextContent] = useState("");
  const { createMessage } = useChatStore();
  const handleCreateMessage = async (event) => {
    event.preventDefault();
    if(!textContent.trim()){
      return;
    }
    try {
      await createMessage({
        textContent: textContent.trim()
      })
      setTextContent("");
    }
    catch(err) {
      console.log(`Handle create message error: ${err}`);
    }
  }
  return (
     <div className="p-4 w-full">
      <form onSubmit={handleCreateMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
          />
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