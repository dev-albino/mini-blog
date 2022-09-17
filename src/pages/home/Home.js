import React from 'react'

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/UseFetchDocuments';
import PostDetails from '../../components/postDetails/PostDetails';


// CSS
import styles from "./Home.module.css"

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents:posts, loading} = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
        <h1>Posts mais recentes</h1>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <input type="text" placeholder='Ou busque por tags...' value={query} onChange={(e) => setQuery(e.target.value.toLowerCase())} />
          <button className='btn btnDark'>Pesquisar</button>
        </form>

        <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Não foram encontrados posts</p>
              <Link to="/posts" className='btn'>Criar primeiro post</Link>
            </div>
          )}
          {posts && posts.map((post) => <PostDetails key={post.id} post={post} />)}
        </div>
    </div>
  )
}

export default Home;