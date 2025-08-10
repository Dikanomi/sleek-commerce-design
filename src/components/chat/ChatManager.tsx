import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/stores/chatStore';
import FloatingChatBubble from './FloatingChatBubble';
import FloatingChatWindow from './FloatingChatWindow';

const ChatManager = () => {
  const location = useLocation();
  const { 
    chatRooms, 
    floatingChats, 
    isMainChatPage,
    setMainChatPage,
    initializeChats 
  } = useChatStore();

  // Initialize chats on mount
  useEffect(() => {
    if (Object.keys(chatRooms).length === 0) {
      initializeChats();
    }
  }, [chatRooms, initializeChats]);

  // Handle main chat page detection
  useEffect(() => {
    const isOnChatPage = location.pathname.startsWith('/chat/');
    const roomId = isOnChatPage ? location.pathname.split('/chat/')[1] : undefined;
    
    if (isOnChatPage !== isMainChatPage) {
      setMainChatPage(isOnChatPage, roomId);
    }
  }, [location.pathname, isMainChatPage, setMainChatPage]);

  // Don't render floating elements on main chat page
  if (isMainChatPage) {
    return null;
  }

  const availableContacts = Object.values(chatRooms).slice(0, 4); // Show max 4 bubbles
  const openFloatingChatIds = floatingChats.map(chat => chat.roomId);
  const closedContacts = availableContacts.filter(room => !openFloatingChatIds.includes(room.id));

  return (
    <>
      {/* Floating Chat Bubbles - Only show contacts not currently in floating windows */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <AnimatePresence>
          {closedContacts.map((room) => (
            <FloatingChatBubble
              key={room.id}
              roomId={room.id}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Chat Windows */}
      <AnimatePresence>
        {floatingChats.map((chat) => (
          <FloatingChatWindow
            key={chat.roomId}
            roomId={chat.roomId}
            position={chat.position}
            isMinimized={chat.isMinimized}
          />
        ))}
      </AnimatePresence>
    </>
  );
};

export default ChatManager;