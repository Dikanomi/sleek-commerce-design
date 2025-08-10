import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Send, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useChatStore, ChatMessage } from '@/stores/chatStore';
import { cn } from '@/lib/utils';

interface FloatingChatWindowProps {
  roomId: string;
  position: number;
  isMinimized: boolean;
}

const FloatingChatWindow = ({ roomId, position, isMinimized }: FloatingChatWindowProps) => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    chatRooms, 
    closeFloatingChat, 
    minimizeFloatingChat, 
    maximizeFloatingChat,
    sendMessage,
    markAsRead,
    setTyping
  } = useChatStore();
  
  const room = chatRooms[roomId];

  useEffect(() => {
    if (room && !isMinimized) {
      markAsRead(roomId);
      scrollToBottom();
    }
  }, [room?.messages, isMinimized, roomId, markAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    sendMessage(roomId, message.trim());
    setMessage('');
    
    // Focus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    closeFloatingChat(roomId);
  };

  const handleMinimize = () => {
    if (isMinimized) {
      maximizeFloatingChat(roomId);
    } else {
      minimizeFloatingChat(roomId);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.sender === 'user';
    
    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex mb-3",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        <div className={cn(
          "max-w-[70%] px-3 py-2 rounded-2xl text-sm",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-md" 
            : "bg-muted rounded-bl-md"
        )}>
          <p>{msg.text}</p>
          <p className={cn(
            "text-xs mt-1 opacity-70",
            isUser ? "text-right" : "text-left"
          )}>
            {formatTime(msg.timestamp)}
          </p>
        </div>
      </motion.div>
    );
  };

  if (!room) return null;

  const { contact } = room;

  // Calculate position from right
  const rightPosition = position * 330 + 20; // 320px width + 10px gap

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 56 : 400
      }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed bottom-4 z-50 w-80 bg-card border border-border rounded-lg shadow-2xl overflow-hidden"
      style={{ right: `${rightPosition}px` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-card border-b border-border">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative">
            <Avatar className="h-8 w-8">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="text-xs">
                {contact.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border border-card rounded-full" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{contact.name}</p>
            <p className="text-xs text-muted-foreground">
              {contact.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          
          {contact.unreadCount > 0 && !isMinimized && (
            <Badge variant="destructive" className="h-5 text-xs">
              {contact.unreadCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted"
            onClick={handleMinimize}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted"
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-muted hover:text-destructive"
            onClick={handleClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Messages Area */}
            <ScrollArea className="h-80 p-3">
              <div className="space-y-1">
                {room.messages.map(renderMessage)}
                
                {room.isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mb-3"
                  >
                    <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan..."
                  className="flex-1 text-sm"
                  autoComplete="off"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FloatingChatWindow;