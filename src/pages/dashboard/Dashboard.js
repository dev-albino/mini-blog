import React from 'react'
import styles from "./Dashboard.module.css";

import { Link } from 'react-router-dom';
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from './../../hooks/UseFetchDocuments';
import { useDeleteDocument } from '../../hooks/UseDeleteDocument';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  // Posts do usuário
  const {documents: posts, loading} = useFetchDocuments("posts", null, uid);

  const {deleteDocument} = useDeleteDocument("posts");

  if (loading) return <p>Carregando...</p>

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts" className='btn'>Criar primeiro post</Link>
        </div>
      ) : (
        <div className={styles.postHeader}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

        {posts && posts.map((post) => (
          <div className={styles.postRow} key={post.id}>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/post/${post.id}`} className="btn btnOutline">
                Ver
              </Link>
              <Link to={`/post/edit/${post.id}`} className="btn btnOutline">
                Editar
              </Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btnOutline btnDanger"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}   
    </div>
  )
}

export default Dashboard