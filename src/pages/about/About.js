import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import styles from "./About.module.css"

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>BLOG</span></h2>
      <p>Este projeto consiste em um blog feito com React no Front-end e Firebase no Back-end, validando autenticações de usuários e permitindo a criação de posts após feito o login no sistema.</p>
      <Link to="/posts" className='btn'>
        Criar um Post
      </Link>
    </div>
  )
}

export default About