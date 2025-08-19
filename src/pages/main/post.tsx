import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { PostData as IPost } from './main';
import "../../style/Post.css";




interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = ({ post }: Props) => {
  const likesRef = collection(db, "likes");
  const [user] = useAuthState(auth);
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const [likeCount, setLikeCount] = useState<Like[]>([]);

  const addLike = async () => {
    try {
      if (!user) return;

      const existingLikeQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );
      const existingLikeDocs = await getDocs(existingLikeQuery);

      if (!existingLikeDocs.empty) {
        console.log("User already liked this post!");
        return;
      }

      const newDoc = await addDoc(likesRef, {
        userId: user.uid,
        postId: post.id,
      });
      setLikeCount(prev => [...prev, { userId: user.uid, likeId: newDoc.id }]);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const removeLike = async () => {
    try {
      if (!user) return;
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      if (likeToDeleteData.empty) return;

      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);

      setLikeCount(prev => prev.filter(like => like.likeId !== likeId));
    } catch (error) {
      console.error("Error removing like:", error);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikeCount(data.docs.map(doc => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const hasUserLiked = likeCount.find(like => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post-card">
      <div className="post-title">
        <h1>{post.title}</h1>
      </div>
      <div className="post-body">
        <p>{post.description}</p>
      </div>
      <div className="post-footer">
        <p className="post-username">@{post.username}</p>
        <button 
          onClick={hasUserLiked ? removeLike : addLike} 
          className={`like-button ${hasUserLiked ? "liked" : "not-liked"}`}
        >
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        <p className="like-count">Likes: {likeCount.length}</p>
      </div>
    </div>
  );
};
