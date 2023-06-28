export function showModal(title, titleClass, text, buttonClass, button){

  const content = `
  <h5 id="modal-title" class="${titleClass}">${title}</h5>
  <button type="button" class="close" aria-label="Close" onclick="document.querySelector('.modal').style.display = 'none'">
    <span aria-hidden="true">&times;</span>
  </button>
  <p id="modal__body">${text}</p>
  <div id="modal-footer">
    <button type="button" class="${buttonClass}" onclick="document.querySelector('.modal').style.display = 'none'">${button}</button>
  </div>`

  document.querySelector('.modal').style.display = 'flex';
  document.querySelector('.modal').innerHTML = content;
}