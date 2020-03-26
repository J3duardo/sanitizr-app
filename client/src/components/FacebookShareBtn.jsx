import React from 'react';

const FacebookShareBtn = () => {
  return (
    <div
      class="fb-share-button"
      data-href="https://sanitizr-app.herokuapp.com/"
      data-size="large"
      data-layout="button"
    >
      <a
        className="fb-xfbml-parse-ignore"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsanitizr-app.herokuapp.com%2F&amp;src=sdkpreparse"
      >
        Compartir
      </a>
    </div>
  );
}

export default FacebookShareBtn;
