import { tri } from '../../scripts/utils/tri.js'
import { manageLikes } from '../../scripts/utils/like.js'

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  let url = './data/photographers.json'
  try {
    let res = await fetch(url)
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

async function displayData(photographers, medias) {
  //Récupération de la chaine de requête dans l'url
  const queryString_url_id = window.location.search
  //Extraction de l'id
  const urlsearchParams = new URLSearchParams(queryString_url_id)
  const _id = urlsearchParams.get('id')
  const filteredPhotographers = photographers.filter((obj) => obj.id == _id)
  const filteredMedia = medias.filter((obj) => obj.photographerId == _id)
  const photographersSection = document.querySelector('.photograph-header')
  const mediaSection = document.querySelector('.gallery')

  // tri du media par popularité car c'est l'option de base
  filteredMedia.sort((a, b) => a.likes - b.likes)
  filteredMedia.reverse()

  const selectTri = document.getElementById('tri-select')

  filteredPhotographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userPicture = photographerModel.getUserPicture()
    photographersSection.appendChild(userPicture)
    const userInfo = photographerModel.getUserInfo()
    const info2 = document.querySelector('.infos__price')
    photographersSection.appendChild(userInfo)
    const userPriceDOM = photographerModel.getUserPriceDom()
    info2.appendChild(userPriceDOM)
    filteredMedia.forEach((medias) => {
      const mediaModel = mediaFactory(medias)
      const mediaCardDom = mediaModel.getMediaCardDOM()
      mediaSection.append(mediaCardDom)
    })
    selectTri.addEventListener('change', manageSort)

    function manageSort(event) {
      tri(event, filteredMedia)
      mediaSection.innerHTML = ''
      filteredMedia.forEach((medias) => {
        const mediaModel = mediaFactory(medias)
        const userCardDOM3 = mediaModel.getMediaCardDOM()
        mediaSection.append(userCardDOM3)
      })
      manageLikes()
    }
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographers()
  displayData(photographers, media)
  manageLikes()
  sortMedia(media)
}

init()
