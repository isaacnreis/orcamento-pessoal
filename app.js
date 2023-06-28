import { Db } from "./js/Class/Db.js";
import { Expense } from "./js/Class/Expense.js";

import { showModal, carriesExpenses } from "./js/functions/function.js";

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
  body.addEventListener('load', carriesExpenses( undefined, undefined, db))

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
