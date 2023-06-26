//Login.jsx
import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getDoc, setDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user data exists in Firestore
      const userDocRef = doc(collection(db, "users"), user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // User data already exists, no need to create a new document
        const userData = userDocSnapshot.data();

        // Update the user data in the context
        dispatch({ type: "LOGIN", payload: { currentUser: user, ...userData } });

        navigate("/");
      } else {
        // User data does not exist
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const auth= getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a new user document in Firestore
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        cash: 2000000,
        company: "",
        stockCount: 0,
        sum: 0,
        data: [],
        img: null,
        progress: 0,
        score: 0,
      };

      const userDocRef = doc(collection(db, "users"), user.uid);
      await setDoc(userDocRef, userData);

      // Update the user data in the context
      dispatch({ type: "LOGIN", payload: { currentUser: user, ...userData } });

      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="login">
      <form onSubmit={isSigningUp ? handleSignUp : handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSigningUp ? "Sign Up" : "Login"}</button>
        {error && <span>Wrong email or password!</span>}
      
      {!isSigningUp && (
        <div>
        <button className="signupBtn" onClick={() => setIsSigningUp(true)}>
          Sign Up
        </button>
        </div>
      )}</form>
    </div>
  );
};

export default Login;

