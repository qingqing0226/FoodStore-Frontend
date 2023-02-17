import React from 'react';
import './Footer.css';
import GitHub from './github.png';

const Footer = () => {
  return (
    <footer>
      <div className='github-box'>
        <a href="https://github.com/qingqing0226">
          <img className='github' src={GitHub} alt="github logo" />
        </a>
      </div>
      <div className='author-info'>
        <div>&#169; Qingqing Dai</div>
        <div>Developer at Salt</div>
        <div>Lustgårdsgatan 19, 11251 Stockholm</div>
      </div>
    </footer>
  )
}

export default Footer