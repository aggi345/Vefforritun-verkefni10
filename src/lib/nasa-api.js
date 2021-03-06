import { randomDate } from './helpers';

/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = '9PBqktqINNmd92czFv1Qh95Ig3GpZd4Y6VwE2Hk0';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const DATE = randomDate();
  const response = await fetch(`${URL}?api_key=${API_KEY}&date=${DATE}`);
  if (response.status !== 200) {
    throw new Error('Villa kom upp');
  } else {
    const data = await response.json();
    return data;
  }
}
