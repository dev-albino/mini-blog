import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./PostDetails.module.css";

const PostDetails = ({post}) => {
  return (
    <div className={styles.postDetails}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={styles.createdBy}>por: {post.createdBy}</p>
        <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
                <p key={tag}>
                    <span>#</span>{tag}
                </p>
            ))}
        </div>
        <Link to={`/post/${post.id}`} className='btn btnOutline'>Ler</Link>
    </div>
  )
}

export default PostDetails;