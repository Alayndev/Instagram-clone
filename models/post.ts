import type { AddPrefixToKeys, DocumentData } from "firebase/firestore";
import { firestore } from "lib/connections/firebase/admin";

const collection = firestore.collection("posts");

import { PostType, CreatePostType, PostCreatedRes } from "lib/types";

class Post {
  ref: FirebaseFirestore.DocumentReference;

  data: PostType | DocumentData;

  id: string;

  constructor(id: string) {
    this.id = id;
    this.ref = collection.doc(id);
  }

  private async postExists(): Promise<FirebaseFirestore.DocumentData> {
    const snapshot = await this.ref.get();

    if (snapshot.exists) {
      return snapshot;
    } else {
      throw `Post not found: ${this.id}`;
    }
  }

  async pullPost(): Promise<FirebaseFirestore.DocumentData> {
    const snapshot = await this.postExists();

    this.data = { ...snapshot.data(), id: snapshot.id };

    return this.data;
  }

  pushPost() {
    this.ref.update(this.data as AddPrefixToKeys<string, any>);

    return { updated: true };
  }

  async deletePost() {
    await this.postExists();

    this.ref.delete();

    return { deleted: true };
  }

  static async createNewPost(data: CreatePostType): Promise<PostCreatedRes> {
    const res = await collection.add(data);

    return { created: true, postId: res.id };
  }

  static async getAllPosts() {
    const snapshot = await collection.get();

    const initialPosts: PostType[] = [];

    snapshot.forEach((doc: DocumentData) => {
      const post: PostType = { ...doc.data(), id: doc.id };

      initialPosts.push(post);
    });

    return initialPosts;
  }
}

export { Post };
