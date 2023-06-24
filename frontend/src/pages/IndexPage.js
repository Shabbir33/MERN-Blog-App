import React, { useEffect } from "react";
import Post from "../components/Post";
import postStore from "../stores/postStore";

const IndexPage = () => {
    const store = postStore()

    useEffect(() =>{
        store.fetchPosts();
    }, [])

    return (
        <div>
            {store.posts.length > 0 && store.posts.map(post => (
                <Post {...post} />
            ))}
        </div>
    );
}

export default IndexPage