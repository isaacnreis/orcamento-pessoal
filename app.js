import { Db } from "./js/Class/Db.js";
import { Expense } from "./js/Class/Expense.js";

import { showModal } from "./js/functions/function.js";

const db = new Db();

if(location.href == 'https://isaacnreis.github.io/orcamento-pessoal/index.html' || location.href == 'https://isaacnreis.github.io/orcamento-pessoal/'){

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

if(location.href == 'https://isaacnreis.github.io/orcamento-pessoal/consulta.html'){

  const body = document.querySelector('body');
  body.addEventListener('load', carriesExpenses())

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

    // Criando botão de exclusão
    let btnRemove = document.createElement('button');
    btnRemove.innerText = 'X';
    btnRemove.className = 'btn__remove';
    btnRemove.id = `id__expense-${expense.id}`
    line.insertCell(4).append(btnRemove);

    btnRemove.onclick = function(){
      let id = btnRemove.id.replace('id__expense-', '');

      db.remove(id)

      window.location.reload()
    }

  })
}

