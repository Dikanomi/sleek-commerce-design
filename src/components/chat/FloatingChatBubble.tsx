import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useChatStore } from '@/stores/chatStore';

interface FloatingChatBubbleProps {
  roomId: string;
  className?: string;
}

const FloatingChatBubble = ({ roomId, className }: FloatingChatBubbleProps) => {
  const { chatRooms, openFloatingChat } = useChatStore();
  const room = chatRooms[roomId];

  if (!room) return null;

  const { contact } = room;

  const handleClick = () => {
    openFloatingChat(roomId);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 ring-2 ring-background shadow-lg hover:shadow-xl transition-shadow duration-200">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {contact.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        {/* Online status indicator */}
        {contact.isOnline && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
        )}
        
        {/* Unread messages badge */}
        {contact.unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center min-w-5"
          >
            {contact.unreadCount > 99 ? '99+' : contact.unreadCount}
          </Badge>
        )}
      </div>
    </motion.div>
  );
};

export default FloatingChatBubble;