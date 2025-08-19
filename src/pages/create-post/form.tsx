import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import "../../style/Form.css";



interface CreateFormData {
  title: string;
  description: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Title must be added."),
  description: yup.string().required("You must add a description."),
});

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const postRef = collection(db, "posts");

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });

  const onCreatePost = async (data: CreateFormData) => {
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    console.log("🔍 User object:", user); 
    console.log("🔍 UID:", user?.uid); 
    console.log("🔍 Data to save:", {
      title: data.title,
      description: data.description,
      username: user.displayName,
      userId: user.uid,
      createdAt: new Date(),
    });

    try {
      await addDoc(postRef, {
        title: data.title,
        description: data.description,
        username: user.displayName,
        userId: user.uid,
        createdAt: new Date(),
      });
      console.log("✅ Post saved successfully");
      reset();
      navigate("/");
    } catch (error) {
      console.error("❌ Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onCreatePost)} className="post-form">
      <label className="form-label">
        Title:
        <input 
          placeholder="Title..." 
          {...register("title")} 
          className="form-input"
        />
        <p className="error-text">{errors.title?.message}</p>
      </label>

      <label className="form-label">
        Description:
        <textarea 
          placeholder="Description..." 
          {...register("description")} 
          className="form-textarea"
        />
        <p className="error-text">{errors.description?.message}</p>
      </label>

      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="submit-btn"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};
