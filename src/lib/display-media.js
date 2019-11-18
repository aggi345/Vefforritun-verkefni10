// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import { load, save } from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let iframe; // video spilari

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  getRandomImage().then((response) => {
    image = response;
    if (response.media_type === 'image') {
      img.src = response.url;
      iframe.src = '';
      iframe.className = ('video--inactive');
    } else {
      img.src = '';
      iframe.src = response.url;
      iframe.className = ('video--active');
    }
    title.textContent = response.title;
    text.textContent = response.explanation;
  }).catch((error) => {
    console.error(error);
  });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.media_type, image.url, image.explanation, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  const newImageButton = apod.querySelector('#new-image-button');
  const saveImageButton = apod.querySelector('#save-image-button');

  newImageButton.addEventListener('click', getNewImage);
  saveImageButton.addEventListener('click', saveCurrentImage);

  title = apod.querySelector('.apod__title');
  text = apod.querySelector('.apod__text');
  img = apod.querySelector('.apod__image');
  iframe = apod.querySelector('#video-player');

  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const items = load();
  const main = document.querySelector('.apod');

  for (let item of items) {/* eslint-disable-line */
    const titleElement = document.createElement('h2');
    titleElement.setAttribute('class', 'apod__title');
    titleElement.textContent = item.title;
    main.appendChild(titleElement);

    if (item.type === 'image') {
      const imgElement = document.createElement('img');
      imgElement.setAttribute('class', 'apod__image');
      imgElement.src = item.mediaUrl;
      main.appendChild(imgElement);
    } else {
      const iframeElement = document.createElement('iframe');
      iframeElement.setAttribute('width', 960);
      iframeElement.setAttribute('height', 540);
      iframeElement.src = item.mediaUrl;
      main.appendChild(iframeElement);
    }
  }
}
