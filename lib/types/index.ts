export interface PostType {
  image: string;
  texto: string;
  likes: number;
}

export interface CreatePostType {
  image: string;
  texto?: string;
}

export type PostCreatedRes = {
  created: boolean;
  postId: string;
};
