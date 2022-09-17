import styles from "./Search.module.css";
 
import React from 'react'

import { useFetchDocuments } from "../../hooks/UseFetchDocuments";
import { useQuery } from "../../hooks/UseQuery";
import PostDetails from "../../components/postDetails/PostDetails";
import { Link } from "react-router-dom";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");

    const {documents:posts} = useFetchDocuments("posts", search);

  return (
    <div className={styles.searchContainer}>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Infelizmente não foram encontrados posts a partir da sua busca...</p>
                    <Link to="/" className="btn btnDark">Página inicial</Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetails key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search