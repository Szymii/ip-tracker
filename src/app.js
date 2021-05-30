import L from 'leaflet';
import markerImg from 'url:../images/icon-location.svg';

const form = document.querySelector('.form');
const query = document.querySelector('.form__input');
const modal = document.querySelector('.main__modal');
const modalSection = document.querySelectorAll('.modal__section');
const mapContainer = document.querySelector('.map');
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
  await getData(query.value);
  if (dataList.status === 'fail') return;
  displayData(dataList);
  showOnMap(dataList);
};

const getData = async (query) => {
  const API_KEY = 'at_oO02sjZoO4J9AZGBytJ7b0AjN1343';
  const querryType = setQueryType(query);

  const res = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=${API_KEY}&${querryType}=${query}`
  );

  const data = await res.json();
  dataList = data;
};
const setQueryType = (guery) => {
  const ipReg =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipReg.test(guery)) return 'ipAddress';
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
