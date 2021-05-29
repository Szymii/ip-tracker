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
  const res = await fetch(`http://ip-api.com/json/${query}`);
  const data = await res.json();
  dataList = data;
};

const displayData = (dataList) => {
  modal.classList.add('main__modal--active');
  modalSection.forEach((section) => {
    const sectionData = section.querySelector('.section__data');
    const dataSet = section.dataset.index;
    sectionData.innerText = dataList[dataSet].replace(/\//g, ' ');
  });
};

const showOnMap = ({ lat, lon }) => {
  L.marker([lat, lon], { icon: customMarker }).addTo(map);
  map.setView([lat, lon], 12);
};

const handleModalClick = () => {
  modal.classList.toggle('main__modal--short');
};

form.addEventListener('submit', handleSubmit);
modal.addEventListener('click', handleModalClick);
