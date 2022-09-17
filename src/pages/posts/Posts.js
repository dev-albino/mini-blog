import React from 'react'

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/UseInsertDocument';

// CSS
import styles from "./Posts.module.css"

const Posts = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();
  const {insertDocument, response} = useInsertDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // Criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Checar todos os valores do Post
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    console.log(user);
    console.log(user.displayName);

    // Redirect Homepage
    navigate("/");
  }

  return (
    <div className={styles.posts}>
      <h2>Criar Post</h2>
      <p>Escreve sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name='title' required placeholder='Pense num bom título...' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </label>

        <label>
          <span>URL da imagem:</span>
          <input type="text" name='image' required placeholder='Insira sua imagem...' value={image} onChange={(e) => setImage(e.target.value)}/>
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea name='body' required placeholder='Insira o conteúdo do post...' value={body} onChange={(e) => setBody(e.target.value)}/>
        </label>

        <label>
          <span>Tags:</span>
          <input type="text" name='tags' required placeholder='Insira as tags separadas por vírgula...' value={tags} onChange={(e) => setTags(e.target.value)}/>
        </label>

        {!response.loading ? <button className='btn'>Criar post</button> : <button className='btn' disabled>Aguarde...</button>}
        {response.error || formError && <p className='error'>{response.error || formError}</p>}
      </form>
    </div>
  )
}

export default Posts;