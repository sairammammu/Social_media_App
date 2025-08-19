import { collection,onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";
import '../../style/Main.css'

export interface PostData {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const postRef = collection(db, "posts");
  const [postsList, setPostsList] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      setPostsList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostData[]);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postRef]);

  return (
    <div className="main-feed">
      {loading ? (
        <p className="loading-message">Loading posts...</p>
      ) : postsList.length > 0 ? (
        <div className="posts-container">
          {postsList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="no-posts">No posts yet.</p>
      )}
    </div>
  );
};
