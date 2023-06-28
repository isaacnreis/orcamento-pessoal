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

export function carriesExpenses(expenses = [], filter = false, db){

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
