import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ChatBubble = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        onClick={() => navigate("/live-chat")}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ChatBubble;