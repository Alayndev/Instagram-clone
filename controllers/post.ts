import { Post } from "models/post";
import {
  PostType,
  CreatePostType,
  PostCreatedRes,
  UpdatedRes,
} from "lib/types";
import type { DocumentData } from "firebase/firestore";

export async function getAllPosts(): Promise<PostType[]> {
  const initialPosts: PostType[] = await Post.getAllPosts();

  return initialPosts;
}

export async function getPostById(
  postId: string
): Promise<PostType | DocumentData> {
  const postRef = new Post(postId);
  await postRef.pullOrder();

  return postRef.data;
}

export async function createNewPost(
  data: CreatePostType
): Promise<PostCreatedRes> {
  const postCreated: PostCreatedRes = await Post.createNewPost(data);

  return postCreated;
}

export async function updatePostLikes(postId: string): Promise<UpdatedRes> {
  const postRef = new Post(postId);
  await postRef.pullOrder();

  postRef.data.likes = !postRef.data.likes ? 1 : postRef.data.likes + 1;

  await postRef.pushOrder();

  return { updated: true };
}

export async function updatePostText(
  postId: string,
  text: string
): Promise<UpdatedRes> {
  const postRef = new Post(postId);
  await postRef.pullOrder();

  postRef.data.texto = text;

  await postRef.pushOrder();

  return { updated: true };
}
