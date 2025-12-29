export interface Comment {
  commentId: number;
  postId: number;
  authorUsername: string;
  content: string;
  timestamp: Date;
}

export interface Post {
  id: number;
  authorUsername: string;
  content: string;
  photoUrl?: string; // Soru işareti (?) bu alanın zorunlu olmadığını belirtir
  likes: string[]; // Beğenen kişilerin kullanıcı adlarını tutacağız
  comments: Comment[];
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  bio?: string;
  profilePhotoUrl?: string;
  followers?: string[]; // Takipçi sistemi opsiyonel ama ekleyelim [cite: 48]
  following?: string[];
}