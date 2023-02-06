export function lightbox() {
  const modale = document.querySelector('#Lmodal')
  const close = document.querySelector('.close')
  const links = Array.from(document.querySelectorAll('.gallery a'))
  const titles = Array.from(document.querySelectorAll('.info titres'))
  const types = Array.from(document.querySelectorAll('data-type'))
  let prev = document.getElementById('prev')
  let next = document.getElementById('next')

  // On ajoute l'écouteur click sur les liens
  for (let link of links) {
    link.addEventListener('click', function (e) {
      trapFocus(modale)
      // On désactive le comportement des liens
      e.preventDefault()
      //on ajoute l'image du lien cliqué dans la modale
      const content = modale.querySelector('.content-modal')
      content.src = this.href
      let type = this.dataset.type
      let titre = this.dataset.title

      if (type == 'img') {
        imgLightBox(content, titre)
      } else {
        vidLightBox(content, titre)
      }

      // ************
      // slide ******
      // ************
      const imageBox = document.getElementById('lightbox-media')
      const titleBox = document.getElementById('title-media')

      let index = links.indexOf(link)

      next.addEventListener('click', function () {
        let __return
        ;({ __return, index } = nextFunction(index, links, titles, content))
        return __return
      })

      prev.addEventListener('click', function () {
        let __return
        ;({ __return, index } = prevFunction(index, links, titles, content))
        return __return
      })

      //fleches clavier
      window.addEventListener('keydown', checkKeyPress, false) //on initialise l'écoute du clavier
      function checkKeyPress(key) {
        if (key.keyCode == '37') {
          //si fleche de gauche
          let __return
          ;({ __return, index } = prevFunction(index, links, titles, content))
          return __return
        } else if (key.keyCode == '39') {
          //idem droite
          let __return
          ;({ __return, index } = nextFunction(index, links, titles, content))
          return __return
        } else if (key.keyCode == '27') {
          closeLigthBox(modale)
        }
      }

      //test affichage modale
      modale.classList.add('show')
      modale.setAttribute('active', '')
      prev.focus()
      const foot = document.querySelector('.infos')
      foot.style.display = 'none'

      // On active le bouton close
      close.addEventListener('click', function () {
        closeLigthBox(modale)
        foot.style.display = 'flex'
      })
    })
  }
}

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

//Fonction fermeture lightbox
function closeLigthBox(modale) {
  modale.classList.remove('show')
}

function imgLightBox(content, titre) {
  let img = document.createElement('img')
  img.src = content.src
  img.setAttribute('id', 'lightbox-media')
  img.setAttribute('data-type', 'img')
  img.setAttribute('alt', titre)
  img.setAttribute('aria-label', titre)
  let title = document.createElement('span')
  title.setAttribute('class', 'titre')
  title.setAttribute('id', 'title-media')
  title.innerHTML = titre

  while (content.firstChild) {
    content.removeChild(content.lastChild)
  }
  content.appendChild(img)
  content.appendChild(title)
}

function vidLightBox(content, titre) {
  let vid = document.createElement('video')
  vid.src = content.src
  vid.type = 'video/mp4'
  vid.controls = true
  vid.setAttribute('id', 'lightbox-media')
  vid.setAttribute('data-type', 'video/mp4')
  vid.setAttribute('alt', titre)
  vid.setAttribute('aria-label', titre)
  let title = document.createElement('span')
  title.setAttribute('class', 'titre')
  title.setAttribute('id', 'title-media')
  title.innerHTML = titre
  while (content.firstChild) {
    content.removeChild(content.lastChild)
  }
  content.appendChild(vid)
  content.appendChild(title)
}

function nextFunction(index, links, titles, content) {
  index += 1
  if (index < links.length) {
    slideFunction(links, index, titles, content)
  } else {
    index = 0
    slideFunction(links, index, titles, content)
  }
  return { __return: index, index }
}

function prevFunction(index, links, titles, content) {
  index -= 1
  if (index >= 0) {
    slideFunction(links, index, titles, content)
  } else {
    index = links.length - 1
    slideFunction(links, index, titles, content)
  }
  return { __return: index, index }
}

function slideFunction(links, index, titles, content) {
  if (links[index].dataset.type == 'img') {
    let img = document.createElement('img')
    img.src = links[index]
    let title = document.createElement('span')
    title.setAttribute('class', 'titre')
    title.setAttribute('id', 'title-media')
    title.innerHTML = titles[index].innerHTML
    while (content.firstChild) {
      content.removeChild(content.lastChild)
    }
    content.appendChild(img)
    content.appendChild(title)
  } else {
    let vid = document.createElement('video')
    vid.src = links[index]
    vid.controls = true
    let title = document.createElement('span')
    title.setAttribute('class', 'titre')
    title.setAttribute('id', 'title-media')
    title.innerHTML = titles[index].innerHTML
    while (content.firstChild) {
      content.removeChild(content.lastChild)
    }
    content.appendChild(vid)
    content.appendChild(title)
  }
}

function trapFocus(element) {
  var focusableEls = element.querySelectorAll('button')
  var firstFocusableEl = focusableEls[0]
  var lastFocusableEl = focusableEls[focusableEls.length - 1]
  var KEYCODE_TAB = 9

  element.addEventListener('keydown', function (e) {
    var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB

    if (!isTabPressed) {
      return
    }

    if (e.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus()
        e.preventDefault()
      }
    } /* tab */ else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus()
        e.preventDefault()
      }
    }
  })
}
