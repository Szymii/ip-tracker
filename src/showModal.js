export const showModal = (status) => {
  const template = document.querySelector('#error__modal');
  const clone = template.content.cloneNode(true);
  const info = clone.querySelector('p');
  info.innerText =
    status === 200
      ? 'Incorrect IP or domain name.'
      : 'Something went wrong. Please try again later.';
  document.body.appendChild(clone);
  setTimeout(() => {
    const modal = document.querySelector('.modal__wrapper');
    document.body.removeChild(modal);
  }, 6000);
};
