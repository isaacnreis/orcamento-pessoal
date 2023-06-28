export class Db {
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

      expense.id = i;
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

  remove(id){
    localStorage.removeItem(id)
  }
}