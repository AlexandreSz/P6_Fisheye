function mediaFactory(data) {
  const { image, video, title, likes, id, date } = data

  const picture = `./assets/images/${image}`
  const _video = `./assets/images/${video}`
  const titre = `./assets/images/${title}`
  const coeur = `./assets/images/${likes}`

  function getMediaCardDOM() {
    const div = document.createElement('div')
    div.setAttribute('class', 'photo')
    const lien = document.createElement('a')
    lien.setAttribute('aria-label', title)
    lien.setAttribute('alt', title)
    lien.setAttribute('tabindex', '0')
    const span = document.createElement('span')
    span.setAttribute('class', 'info')
    const titres = document.createElement('titres')
    titres.setAttribute('data-title', title)
    titres.textContent = title
    titres.setAttribute('tabindex', '0')
    const i = document.createElement('span')
    i.setAttribute('class', 'fa-solid fa-heart')
    i.setAttribute('id', 'coeur')
    i.setAttribute('tabindex', '0')
    const like = document.createElement('like')
    like.setAttribute('class', 'like')
    like.setAttribute('tabindex', '0')
    const nbLike = document.createElement('nbLike')
    nbLike.setAttribute('class', ' like_number')
    nbLike.setAttribute('id', likes)
    nbLike.setAttribute('data-like', likes)
    nbLike.setAttribute('aria-label', 'likes')
    nbLike.textContent = likes
    if (video) {
      const video = document.createElement('video')
      video.setAttribute('src', _video)
      lien.setAttribute('href', _video)
      lien.setAttribute('data-id', id)
      lien.setAttribute('data-title', title)
      lien.setAttribute('data-type', 'video/mp4')
      // video.setAttribute("controls", "true");
      video.setAttribute('class', 'media')
      video.setAttribute('alt', title)

      div.appendChild(lien)
      lien.appendChild(video)
      div.appendChild(span)
      span.appendChild(titres)
      span.appendChild(like)
      like.appendChild(nbLike)
      like.appendChild(i)
    } else {
      const img = document.createElement('img')
      img.setAttribute('src', picture)
      img.setAttribute('class', 'media')
      img.setAttribute('alt', title)
      lien.setAttribute('href', picture)
      lien.setAttribute('data-id', id)
      lien.setAttribute('data-title', title)
      lien.setAttribute('data-type', 'img')

      div.appendChild(lien)
      lien.appendChild(img)
      div.appendChild(span)
      span.appendChild(titres)
      span.appendChild(like)
      like.appendChild(nbLike)
      like.appendChild(i)
    }
    return div
  }
  return { titre, coeur, _video, picture, date, getMediaCardDOM }
}
