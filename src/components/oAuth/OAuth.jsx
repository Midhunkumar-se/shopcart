import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./OAuth.scss";
import React from "react";
import { auth, db } from "../../firebase/config";

const OAuth = React.memo(() => {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for the user

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
    }
  }
  return (
    <button
      onClick={onGoogleClick}
      type="button"
      className="form__btn --btn --bg-red"
    >
      <FcGoogle
        style={{
          marginRight: "4px",
          fontSize: "1.6rem",
          background: "white",
          borderRadius: "50%",
          width: "18px",
          height: "18px",
        }}
      />
      Continue with Google
    </button>
  );
});

export default OAuth;
