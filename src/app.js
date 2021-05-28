const form = document.querySelector('.form');
const query = document.querySelector('.form__input');
const modal = document.querySelector('.main__modal');
const modalSection = document.querySelectorAll('.modal__section');
const map = document.querySelector('.map');
let dataList = [];

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
  console.log(data); // TODO
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
  console.log(lat, lon);
};

form.addEventListener('submit', handleSubmit);
