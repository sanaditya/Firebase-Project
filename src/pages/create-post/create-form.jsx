import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateForm = () => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("*You must add a title."),
    description: yup.string().required("*You must add a description."),
  });

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async () => {
    await addDoc(postsRef, {
      title:title,
      description:description,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };
  return (
    <div className="form-container">
      <form onSubmit={onCreatePost}>
        <input
          className="title"
          type="text"
          placeholder="Title..."
          // {...register("title")}
          onChange={(e)=>setTitle(e.target.value)}

        />
        <br />
        <p style={{ color: "red", fontSize: 15 }}>{errors.title?.message}</p>
        <textarea
          className="textarea"
          type="text"
          placeholder="Description..."
          // {...register("description")}
          onChange={(e)=>setDescription(e.target.value)}
        />
        <br />
        <p style={{ color: "red", fontSize: 15 }}>
          {errors.description?.message}
        </p>
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};
