function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data

  const picture = `./assets/photographers/Photographers ID Photos/${portrait}`

  function getUserPicture() {
    const div = document.createElement('div')
    div.setAttribute('class', 'photoProfil')
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    div.appendChild(img)
    return div
  }
  function getUserInfo() {
    const div = document.createElement('div')
    div.setAttribute('class', 'info')
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    const h2 = document.createElement('h2')
    h2.textContent = name
    const h3 = document.createElement('h3')
    h3.textContent = city + ',' + ' ' + country
    const tag = document.createElement('h4')
    tag.textContent = tagline
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(tag)

    return div
  }

  function getUserPriceDom() {
    const div = document.createElement('div')
    div.setAttribute('class', 'prix')
    const prix = document.createElement('prix')
    prix.textContent = price + '€' + '/' + 'jour'

    div.appendChild(prix)
    return div
  }
  return { name, picture, getUserPicture, getUserInfo, getUserPriceDom }
}
