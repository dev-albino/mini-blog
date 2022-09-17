import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/UseUpdateDocument';
import { useFetchDocument } from './../../hooks/UseFetchDocument';

// CSS
import styles from "./Edit.module.css"

const Edit = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const {updateDocument, response} = useUpdateDocument("posts");
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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);

    // Redirect Homepage
    navigate("/dashboard");
  }

  return (
    <div className={styles.edit}>    
      {post && (
        <>
          <h2>Editar Post: {post.title}</h2>
          <p>Altere os dados do post como desejar!</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título:</span>
              <input type="text" name='title' required placeholder='Pense num bom título...' value={title} onChange={(e) => setTitle(e.target.value)}/>
            </label>

            <label>
              <span>URL da imagem:</span>
              <input type="text" name='image' required placeholder='Insira sua imagem...' value={image} onChange={(e) => setImage(e.target.value)}/>
            </label>

            <p className={styles.preview}>Preview da imagem atual:</p>
            <img className={styles.image} src={post.image} alt={post.title} />

            <label>
              <span>Conteúdo:</span>
              <textarea name='body' required placeholder='Insira o conteúdo do post...' value={body} onChange={(e) => setBody(e.target.value)}/>
            </label>

            <label>
              <span>Tags:</span>
              <input type="text" name='tags' required placeholder='Insira as tags separadas por vírgula...' value={tags} onChange={(e) => setTags(e.target.value)}/>
            </label>

            {!response.loading ? <button className='btn'>Editar post</button> : <button className='btn' disabled>Aguarde...</button>}
            {response.error || formError && <p className='error'>{response.error || formError}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default Edit;