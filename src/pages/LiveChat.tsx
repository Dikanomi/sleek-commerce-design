import { useState, useRef, useEffect } from "react";
import { Send, Phone, Video, MoreVertical, ArrowLeft, Smile, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

const LiveChat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Halo! Selamat datang di ShopEase. Saya Sarah, customer service Anda hari ini. Ada yang bisa saya bantu?",
      sender: "agent",
      timestamp: new Date(Date.now() - 5 * 60000),
      status: "read"
    },
    {
      id: "2", 
      text: "Halo, saya ingin bertanya tentang produk iPhone 15 Pro Max",
      sender: "user",
      timestamp: new Date(Date.now() - 3 * 60000),
      status: "read"
    },
    {
      id: "3",
      text: "Tentu! iPhone 15 Pro Max tersedia dalam beberapa varian warna dan storage. Apakah ada spesifikasi tertentu yang ingin Anda ketahui?",
      sender: "agent", 
      timestamp: new Date(Date.now() - 2 * 60000),
      status: "read"
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
      status: "sent"
    };

    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Terima kasih atas pertanyaan Anda. Tim kami sedang memproses dan akan segera memberikan jawaban yang tepat.",
        sender: "agent",
        timestamp: new Date(),
        status: "delivered"
      };
      setMessages(prev => [...prev, agentReply]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Card className="rounded-none border-0 border-b">
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Customer Service</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="p-4 border-b">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            📱 Produk & Spesifikasi
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            🚚 Status Pengiriman
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            💳 Pembayaran & Refund
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            🔧 Dukungan Teknis
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-end space-x-2 max-w-[70%] ${
              msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}>
              {msg.sender === "agent" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
              )}
              
              <div className={`rounded-lg p-3 ${
                msg.sender === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}>
                <p className="text-sm">{msg.text}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs ${
                    msg.sender === "user" 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  }`}>
                    {formatTime(msg.timestamp)}
                  </span>
                  {msg.sender === "user" && msg.status && (
                    <span className="text-xs text-primary-foreground/70 ml-2">
                      {msg.status === "sent" && "✓"}
                      {msg.status === "delivered" && "✓✓"}
                      {msg.status === "read" && "✓✓"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2 max-w-[70%]">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>CS</AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Support Info */}
      <div className="border-t bg-muted/50 p-3">
        <div className="text-center text-sm text-muted-foreground">
          <p>⏰ Jam Operasional: Senin-Minggu 08:00-22:00 WIB</p>
          <p>📞 Telepon: 021-1234-5678 | 📧 Email: support@shopease.com</p>
        </div>
      </div>

      {/* Input */}
      <Card className="rounded-none border-0 border-t">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Ketik pesan Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={message.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveChat;