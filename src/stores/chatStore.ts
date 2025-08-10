import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
  unreadCount: number;
}

export interface ChatRoom {
  id: string;
  contact: ChatContact;
  messages: ChatMessage[];
  isTyping: boolean;
  lastMessage?: ChatMessage;
}

export interface FloatingChat {
  roomId: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: number; // 0, 1, 2 for max 3 chats
}

interface ChatState {
  // Chat rooms data
  chatRooms: Record<string, ChatRoom>;
  
  // Floating chat states
  floatingChats: FloatingChat[];
  activeChatId: string | null;
  maxFloatingChats: number;
  
  // Main chat page state
  isMainChatPage: boolean;
  mainChatRoomId: string | null;
  
  // Actions
  initializeChats: () => void;
  openFloatingChat: (roomId: string) => void;
  closeFloatingChat: (roomId: string) => void;
  minimizeFloatingChat: (roomId: string) => void;
  maximizeFloatingChat: (roomId: string) => void;
  setActiveChatId: (roomId: string | null) => void;
  setMainChatPage: (isMainPage: boolean, roomId?: string) => void;
  sendMessage: (roomId: string, text: string) => void;
  markAsRead: (roomId: string) => void;
  setTyping: (roomId: string, isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  subscribeWithSelector((set, get) => ({
    chatRooms: {},
    floatingChats: [],
    activeChatId: null,
    maxFloatingChats: 3,
    isMainChatPage: false,
    mainChatRoomId: null,

    initializeChats: () => {
      // Initialize with some sample data
      const sampleContacts: ChatContact[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          isOnline: true,
          unreadCount: 2,
        },
        {
          id: '2',
          name: 'Mike Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
          isOnline: false,
          lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          unreadCount: 0,
        },
        {
          id: '3',
          name: 'Emma Davis',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
          isOnline: true,
          unreadCount: 1,
        },
      ];

      const chatRooms: Record<string, ChatRoom> = {};
      
      sampleContacts.forEach((contact) => {
        chatRooms[contact.id] = {
          id: contact.id,
          contact,
          messages: [
            {
              id: `${contact.id}-1`,
              text: `Hello! How are you doing?`,
              sender: 'contact',
              timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
              status: 'read',
            },
            {
              id: `${contact.id}-2`,
              text: 'Hi there! I\'m doing great, thanks for asking!',
              sender: 'user',
              timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
              status: 'delivered',
            },
          ],
          isTyping: false,
        };
        
        if (chatRooms[contact.id].messages.length > 0) {
          chatRooms[contact.id].lastMessage = chatRooms[contact.id].messages[chatRooms[contact.id].messages.length - 1];
        }
      });

      set({ chatRooms });
    },

    openFloatingChat: (roomId: string) => {
      const { floatingChats, maxFloatingChats, isMainChatPage } = get();
      
      // If on main chat page, don't open floating chats
      if (isMainChatPage) return;
      
      // Check if chat is already open
      const existingChat = floatingChats.find(chat => chat.roomId === roomId);
      if (existingChat) {
        if (existingChat.isMinimized) {
          set({
            floatingChats: floatingChats.map(chat =>
              chat.roomId === roomId 
                ? { ...chat, isMinimized: false }
                : chat
            ),
          });
        }
        return;
      }

      // Remove oldest chat if max limit reached
      let updatedFloatingChats = [...floatingChats];
      if (updatedFloatingChats.length >= maxFloatingChats) {
        updatedFloatingChats = updatedFloatingChats.slice(1);
        // Reposition remaining chats
        updatedFloatingChats = updatedFloatingChats.map((chat, index) => ({
          ...chat,
          position: index,
        }));
      }

      // Add new chat
      const newChat: FloatingChat = {
        roomId,
        isOpen: true,
        isMinimized: false,
        position: updatedFloatingChats.length,
      };

      set({
        floatingChats: [...updatedFloatingChats, newChat],
        activeChatId: roomId,
      });
    },

    closeFloatingChat: (roomId: string) => {
      const { floatingChats } = get();
      const updatedFloatingChats = floatingChats
        .filter(chat => chat.roomId !== roomId)
        .map((chat, index) => ({ ...chat, position: index }));
      
      set({
        floatingChats: updatedFloatingChats,
        activeChatId: updatedFloatingChats.length > 0 ? updatedFloatingChats[updatedFloatingChats.length - 1].roomId : null,
      });
    },

    minimizeFloatingChat: (roomId: string) => {
      const { floatingChats } = get();
      set({
        floatingChats: floatingChats.map(chat =>
          chat.roomId === roomId 
            ? { ...chat, isMinimized: true }
            : chat
        ),
      });
    },

    maximizeFloatingChat: (roomId: string) => {
      const { floatingChats } = get();
      set({
        floatingChats: floatingChats.map(chat =>
          chat.roomId === roomId 
            ? { ...chat, isMinimized: false }
            : chat
        ),
      });
    },

    setActiveChatId: (roomId: string | null) => {
      set({ activeChatId: roomId });
    },

    setMainChatPage: (isMainPage: boolean, roomId?: string) => {
      set({ 
        isMainChatPage: isMainPage,
        mainChatRoomId: roomId || null,
      });
      
      // Close all floating chats when entering main chat page
      if (isMainPage) {
        set({ floatingChats: [] });
      }
    },

    sendMessage: (roomId: string, text: string) => {
      const { chatRooms } = get();
      const room = chatRooms[roomId];
      if (!room) return;

      const newMessage: ChatMessage = {
        id: `${roomId}-${Date.now()}`,
        text,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
      };

      const updatedRoom = {
        ...room,
        messages: [...room.messages, newMessage],
        lastMessage: newMessage,
      };

      set({
        chatRooms: {
          ...chatRooms,
          [roomId]: updatedRoom,
        },
      });

      // Simulate contact response after 1-3 seconds
      setTimeout(() => {
        const responses = [
          'That sounds great!',
          'I see, tell me more about it.',
          'Interesting! What do you think?',
          'Thanks for letting me know.',
          'How are things going on your end?',
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage: ChatMessage = {
          id: `${roomId}-${Date.now()}-response`,
          text: randomResponse,
          sender: 'contact',
          timestamp: new Date(),
          status: 'delivered',
        };

        const currentState = get();
        const currentRoom = currentState.chatRooms[roomId];
        if (currentRoom) {
          const updatedRoomWithResponse = {
            ...currentRoom,
            messages: [...currentRoom.messages, responseMessage],
            lastMessage: responseMessage,
            isTyping: false,
          };

          set({
            chatRooms: {
              ...currentState.chatRooms,
              [roomId]: updatedRoomWithResponse,
            },
          });
        }
      }, Math.random() * 2000 + 1000);
    },

    markAsRead: (roomId: string) => {
      const { chatRooms } = get();
      const room = chatRooms[roomId];
      if (!room) return;

      const updatedRoom = {
        ...room,
        contact: {
          ...room.contact,
          unreadCount: 0,
        },
      };

      set({
        chatRooms: {
          ...chatRooms,
          [roomId]: updatedRoom,
        },
      });
    },

    setTyping: (roomId: string, isTyping: boolean) => {
      const { chatRooms } = get();
      const room = chatRooms[roomId];
      if (!room) return;

      set({
        chatRooms: {
          ...chatRooms,
          [roomId]: {
            ...room,
            isTyping,
          },
        },
      });
    },
  }))
);