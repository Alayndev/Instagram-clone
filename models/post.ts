import { firestore } from "lib/connections/firebase/admin";

const collection = firestore.collection("posts");

import { PostType, CreatePostType, PostCreatedRes } from "lib/types";

class Post {
  ref: FirebaseFirestore.DocumentReference;

  data: any;

  id: string;

  constructor(id: string) {
    this.id = id;
    this.ref = collection.doc(id);
  }

  async pullOrder(): Promise<FirebaseFirestore.DocumentData> {
    const snapshot = await this.ref.get();

    if (snapshot.exists) {
      this.data = snapshot.data();

      return this.data;
    } else {
      throw `Post not found: ${this.id}`;
    }
  }

  pushOrder() {
    this.ref.update(this.data);
  }

  static async createNewPost(data: CreatePostType): Promise<PostCreatedRes> {
    const res = await collection.add(data);

    return { created: true, postId: res.id };
  }

  static async getAllPosts() {
    const snapshot = await collection.get();

    const initialPosts: PostType[] = [];

    snapshot.forEach((doc: any) => {
      const post: PostType = { ...doc.data(), id: doc.id };

      initialPosts.push(post);
    });

    return initialPosts;
  }
}

export { Post };