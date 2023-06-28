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

  recoverAllData(){

    // Array das despesas
    let expenses = [];

    let id = localStorage.getItem('id');

    // Recupera todas as despesas
    for(let i = 1; i <= id; i++){

      // Recupera a despesa
      let expense = JSON.parse(localStorage.getItem(i));

      // Caso exista o caso da despesa ter sido removida e valor null
      // Vamos pular
      if(expense == null){
        continue
      }

      expenses.push(expense);
    }
    
    return expenses;
  }

  search(expense){
    let filteredExpenses = Array()

    filteredExpenses = this.recoverAllData();

    // ano
    if(expense.year != ''){
      filteredExpenses = filteredExpenses.filter(f => f.year == expense.year);
    }

    // mês
    if(expense.month != ''){
      filteredExpenses = filteredExpenses.filter(f => f.month == expense.month);
    }

    // dia
    if(expense.day != ''){
      filteredExpenses = filteredExpenses.filter(f => f.day == expense.day);
    }

    // tipo
    if(expense.type != ''){
      filteredExpenses = filteredExpenses.filter(f => f.type == expense.type);
    }

    // descrição
    if(expense.description != ''){
      filteredExpenses = filteredExpenses.filter(f => f.description == expense.description);
    }

    // valor
    if(expense.value != ''){
      filteredExpenses = filteredExpenses.filter(f => f.value == expense.value);
    }

    return filteredExpenses;
  }


}

const db = new Db();

if(location.href == 'http://127.0.0.1:5500/index.html'){

  const formAdd = document.getElementById('formAdd');

  formAdd.addEventListener('submit', (event) => {
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
    );

    if(!expense.validateData()){
      showModal(
        'Erro na inclusão do registro',
        'text__danger',
        'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!',
        'btn__danger',
        'Voltar e corrigir'
      );

      return;
    }

    showModal(
      'Registro inserido com sucesso',
      'text__success',
      'Despesa foi cadastrada com sucesso!',
      'btn__success',
      'Voltar'
    );

   db.record(expense);

    year.value = '';
    month.value = '';
    day.value = '';
    type.value = '';
    description.value = '';
    value.value = '';
  });
}

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

function carriesExpenses(expenses = [], filter = false){

  if(expenses.length == 0 && filter == false){
    // Recuperando um array com todas as despesas registradas
    expenses = db.recoverAllData();
  }

  // Elemento tbody html
  const expenseRecord = document.getElementById('expenseRecord');
  expenseRecord.innerHTML = ''; 

  // Passando por cada elemento do array de despesas
  // Colocando no hmtl em seus respectivos campos
  expenses.forEach(expense => {
    
    // Inserindo tr
    let line = expenseRecord.insertRow();

    // Inserindo th
    line.insertCell(0).innerHTML = `${expense.day}/${expense.month}/${expense.year}`; //Data

    // Ajustando valor do tipo da despesa
    switch(expense.type){
      case '1': expense.type = 'Alimentção'
        break
      case '2': expense.type = 'Educação'
        break
      case '3': expense.type = 'Lazer'
        break
      case '4': expense.type = 'Saúde'
        break
      case '5': expense.type = 'Transporte'
        break
    }

    line.insertCell(1).innerHTML = expense.type; //Tipo
    line.insertCell(2).innerHTML = expense.description; //Descrição
    line.insertCell(3).innerHTML = parseFloat(expense.value).toFixed(2); //Valor
  })
}

const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', (event) => {
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
  );

  let expenses = db.search(expense)

  carriesExpenses(expenses, true);

})