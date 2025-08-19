import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../../style/Login.css'

export const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/');
    }

    return (
        <div className="login-container">
            <p className="login-text">Sign in with Google</p>
            <button className="login-button" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
        </div>
    );
}
