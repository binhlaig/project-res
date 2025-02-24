import { MessageType } from "@/lib/models/User.model";

export interface ApiResponse{
     success: boolean;
     message: string;
     messages?: Array<MessageType>;
     isAcceptingMessages?: boolean
}