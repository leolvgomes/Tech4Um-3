// types.ts
export interface Participant {
  id: string;
  user_id: string;
  room_id: string;
  joined_at: string;
  user: {
    name: string;
    id: string;
  };
}

export interface Message {
  id: string;
  content: string;
  room_id: string;
  sender_id: string;
  receiver_id: string | null;
  created_at: string;
  sender: {
    name: string;
    email: string;
    id: string;
  };
}
