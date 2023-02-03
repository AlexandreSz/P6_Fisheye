function mediaFactory(data) {
  const { image, video, title, likes, id, date } = data

  const titre = `./assets/images/${title}`
  const coeur = `./assets/images/${likes}`

  function getMediaCardDOM() {
    const article = document.createElement('article')
    article.setAttribute('data-id', 'id')

    if (image) {
      const imageLien = `./assets/images/${image}`
      const photos = document.createElement('img')
      photos.setAttribute('src', imageLien)
      photos.setAttribute('alt', title)
      photos.setAttribute('scrset', `./assets/images/${image}`)
      photos.setAttribute('loading', 'lazy')
      photos.className = 'gallery-media'
      photos.setAttribute('data-id', id)
      photos.setAttribute('tabindex', '0')
      article.appendChild(photos)
    } else {
      const videoLien = `./assets/images/${video}`
      const videos = document.createElement('video')
      videos.setAttribute('title', title)
      videos.setAttribute('src', videoLien)
      videos.className = 'gallery-media'
      videos.setAttribute('data-id', id)
      videos.setAttribute('tabindex', '0')
      article.appendChild(videos)
    }
    const div = document.createElement('div')
    div.className = 'info-media'

    // Title
    const titre = document.createElement('h3')
    titre.className = 'title'
    titre.setAttribute('tabindex', '0')
    titre.textContent = title

    // Like
    const coeur = document.createElement('p')
    coeur.className = 'like'
    coeur.setAttribute('data-id', id)
    coeur.setAttribute('tabindex', '0')
    const like = document.createElement('span')
    like.className = 'like_number'
    like.setAttribute('data-like', likes)
    like.setAttribute('id', 'likes')
    like.textContent = likes

    const iconeCoeur = document.createElement('i')
    iconeCoeur.className = 'fa-solid fa-heart'
    iconeCoeur.setAttribute('aria-label', 'likes')
    iconeCoeur.setAttribute('role', 'button')
    iconeCoeur.setAttribute('id', 'coeur')
    iconeCoeur.setAttribute('tabindex', '0')

    article.appendChild(div)
    div.appendChild(titre)
    div.appendChild(coeur)
    coeur.appendChild(like)
    coeur.appendChild(iconeCoeur)
    return article
  }

  return { titre, coeur, video, image, date, getMediaCardDOM }
}
