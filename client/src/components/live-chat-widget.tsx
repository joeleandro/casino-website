import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Minus } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "support";
  text: string;
  timestamp: Date;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "support",
      text: "Hi there! 👋 How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const supportMessage: Message = {
        id: `support-${Date.now()}`,
        sender: "support",
        text: "Thanks for your message! Our support team will get back to you shortly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="w-80 overflow-hidden mb-4 shadow-xl">
          <div className="bg-primary p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-white font-semibold ml-3">Live Support</h3>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:text-gray-200 hover:bg-transparent"
                onClick={toggleChat}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-white hover:text-gray-200 hover:bg-transparent"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="p-4 max-h-80 overflow-y-auto" style={{ height: "320px" }}>
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex mb-4 ${message.sender === "user" ? "justify-end" : ""}`}
              >
                {message.sender === "support" && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white font-medium text-sm">EC</span>
                  </div>
                )}
                <div className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === "user" 
                    ? "bg-primary text-white" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 block ${
                    message.sender === "user" ? "text-white/70" : "text-gray-500"
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-3">
            <div className="relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="pr-10"
              />
              <Button 
                type="submit"
                size="icon"
                variant="ghost" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary/80"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      <Button
        onClick={toggleChat}
        size="icon"
        className="w-14 h-14 rounded-full shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
