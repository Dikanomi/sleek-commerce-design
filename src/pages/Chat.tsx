import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore, ChatMessage } from '@/stores/chatStore';
import { cn } from '@/lib/utils';

const Chat = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { 
    chatRooms, 
    sendMessage,
    markAsRead,
    setMainChatPage
  } = useChatStore();
  
  const room = roomId ? chatRooms[roomId] : null;

  useEffect(() => {
    // Set main chat page state
    setMainChatPage(true, roomId);
    
    // Cleanup when leaving
    return () => {
      setMainChatPage(false);
    };
  }, [roomId, setMainChatPage]);

  useEffect(() => {
    if (room) {
      markAsRead(roomId!);
      scrollToBottom();
      // Focus input
      inputRef.current?.focus();
    }
  }, [room?.messages, roomId, markAsRead]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !roomId) return;
    
    sendMessage(roomId, message.trim());
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hari Ini';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Kemarin';
    } else {
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date);
    }
  };

  const renderMessage = (msg: ChatMessage, index: number, messages: ChatMessage[]) => {
    const isUser = msg.sender === 'user';
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showDate = !prevMessage || 
      msg.timestamp.toDateString() !== prevMessage.timestamp.toDateString();
    
    return (
      <div key={msg.id}>
        {/* Date divider */}
        {showDate && (
          <div className="flex justify-center my-4">
            <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
              {formatDate(msg.timestamp)}
            </span>
          </div>
        )}
        
        {/* Message */}
        <div className={cn(
          "flex mb-4",
          isUser ? "justify-end" : "justify-start"
        )}>
          {!isUser && (
            <Avatar className="h-8 w-8 mr-2 mt-1">
              <AvatarImage src={room?.contact.avatar} alt={room?.contact.name} />
              <AvatarFallback className="text-xs">
                {room?.contact.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          
          <div className={cn(
            "max-w-[70%] px-4 py-3 rounded-2xl",
            isUser 
              ? "bg-primary text-primary-foreground rounded-br-md" 
              : "bg-muted rounded-bl-md"
          )}>
            <p className="text-sm leading-relaxed">{msg.text}</p>
            <p className={cn(
              "text-xs mt-2 opacity-70",
              isUser ? "text-right" : "text-left"
            )}>
              {formatTime(msg.timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Chat tidak ditemukan</h2>
          <p className="text-muted-foreground mb-4">Room chat yang Anda cari tidak tersedia.</p>
          <Button onClick={handleBack}>Kembali</Button>
        </div>
      </div>
    );
  }

  const { contact } = room;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>
                {contact.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {contact.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-card rounded-full" />
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{contact.name}</h2>
            <p className="text-sm text-muted-foreground">
              {contact.isOnline ? 'Online' : 
                contact.lastSeen ? 
                `Terakhir dilihat ${formatTime(contact.lastSeen)}` : 'Offline'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {room.messages.map((msg, index) => 
            renderMessage(msg, index, room.messages)
          )}
          
          {room.isTyping && (
            <div className="flex justify-start mb-4">
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback className="text-xs">
                  {contact.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan..."
            className="flex-1"
            autoComplete="off"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;