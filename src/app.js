import L from 'leaflet';
import markerImg from 'url:../images/icon-location.svg';
import { ipRegex } from './ipRegex';
import { showModal } from './showModal';

const form = document.querySelector('.form');
const query = document.querySelector('.form__input');
const modal = document.querySelector('.main__modal');
const modalSection = document.querySelectorAll('.modal__section');
const mapContainer = document.querySelector('.map');
const loader = document.querySelector('.loader');
let dataList = [];

const customMarker = L.icon({
  iconUrl: markerImg,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

const map = L.map(mapContainer).setView([51.505, -0.09], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

map.zoomControl.remove();

L.control
  .zoom({
    position: 'bottomleft',
  })
  .addTo(map);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (query.value.trim() === '') return;
  loader.classList.add('loader--active');
  const status = await getData(query.value);
  loader.classList.remove('loader--active');
  if (status !== 200) {
    showModal(status);
    return;
  }
  displayData(dataList);
  showOnMap(dataList);
};

const getData = async (query) => {
  try {
    const API_KEY = 'at_oO02sjZoO4J9AZGBytJ7b0AjN1343';
    const querryType = setQueryType(query);
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&${querryType}=${query}`
    );
    const data = await res.json();
    dataList = data;
    return res.status;
  } catch (error) {
    return null;
  }
};

const setQueryType = (guery) => {
  if (ipRegex.test(guery)) return 'ipAddress';
  return 'domain';
};

const displayData = (dataList) => {
  modal.classList.add('main__modal--active');
  modalSection.forEach((section) => {
    const sectionData = section.querySelector('.section__data');
    const key = section.dataset.index;
    setData(sectionData, key, dataList);
  });
};

const setData = (element, key, { ip, location, isp }) => {
  switch (key) {
    case 'ip':
      element.innerText = ip;
      break;
    case 'country':
      element.innerText = `${location.country} ${location.city}`;
      break;
    case 'timezone':
      element.innerText = location.timezone;
      break;
    case 'isp':
      element.innerText = isp;
      break;
  }
};

const showOnMap = ({ location }) => {
  const { lat, lng } = location;
  L.marker([lat, lng], { icon: customMarker }).addTo(map);
  map.setView([lat, lng], 12);
};

const handleModalClick = () => {
  modal.classList.toggle('main__modal--short');
};

form.addEventListener('submit', handleSubmit);
modal.addEventListener('click', handleModalClick);
