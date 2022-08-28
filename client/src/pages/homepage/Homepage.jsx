import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  // console.log(search);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  // console.log(posts, "posts");
  const { user } = useContext(Context);

  return (
    <>
      <Header />
      <div className="home">
        {user ? (
          <>
            <Posts posts={posts} />
            <Sidebar />
          </>
        ) : null}
      </div>
    </>
  );
}
