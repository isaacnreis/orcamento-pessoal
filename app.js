class Expense {
  constructor(year, month, day, type, description, value){
    this.year = year;
    this.month = month;
    this.day = day;
    this.type = type;
    this.description = description;
    this.value = value;
  }

  validateData(){
    for(let i in this){
      if(this[i] == undefined || this[i] == null || this[i] == ''){
        return false
      }
    }
    return true
  }

}

class Db {
  constructor(){
    let id = localStorage.getItem('id');

    if(id == null){
      localStorage.setItem('id', 0);
    }
  }

  getNextId(){
    let nextId = localStorage.getItem('id');
    return parseInt(nextId) + 1;
  }

  record(e){
    let id = this.getNextId();

    localStorage.setItem(id, JSON.stringify(e))

    localStorage.setItem('id', id)
  }

}

const db = new Db()

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const year = document.getElementById('year');
  const month = document.getElementById('month');
  const day = document.getElementById('day');
  const type = document.getElementById('type');
  const description = document.getElementById('description');
  const value = document.getElementById('value');

  const expense = new Expense(
    year.value, 
    month.value, 
    day.value, 
    type.value, 
    description.value, 
    value.value
  )

  if(!expense.validateData()){
    showModal(
      'Erro na inclusão do registro',
      'text__danger',
      'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!',
      'btn__danger',
      'Voltar e corrigir'
    )
    return
  }

  showModal(
    'Registro inserido com sucesso',
    'text__success',
    'Despesa foi cadastrada com sucesso!',
    'btn__success',
    'Voltar'
  )

  db.record(expense)

});

function showModal(title, titleClass, text, buttonClass, button){

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