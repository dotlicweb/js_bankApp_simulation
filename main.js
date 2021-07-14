window.addEventListener('beforeunload', save);

let mainTable = document.querySelector('#main-table');
let editTable = document.querySelector('#edit-table');
let index;

//buttons
let accountsBtn = document.querySelector('#accountsBtn');
let addAccountsBtn = document.querySelector('#addAccountsBtn');
let editAccountsBtn = document.querySelector('#editAccountsBtn');
let saveAccountBtn = document.querySelector('#saveAccountBtn');
let editAccountBtn = document.querySelector('#editAccountBtn');

//views
let accountsView = document.querySelector('#accounts-view');
let addAccountsView = document.querySelector('#add-accounts-view');
let editAccountsView = document.querySelector('#edit-accounts-view');
let editFormView = document.querySelector('#edit-form-view');

//inputs
let nameInput = document.querySelector('[name="name"]');
let lastNameInput = document.querySelector('[name="lastName"]');
let emailInput = document.querySelector('[name="email"]');
let phoneInput = document.querySelector('[name="phone"]');
let enameInput = document.querySelector('[name="ename"]');
let elastNameInput = document.querySelector('[name="elastName"]');
let eemailInput = document.querySelector('[name="eemail"]');
let ephoneInput = document.querySelector('[name="ephone"]');

// listeners
addAccountsBtn.addEventListener('click', displayAddAccountsView);
accountsBtn.addEventListener('click', displayAccountsView);
saveAccountBtn.addEventListener('click', saveNewAccount);
editAccountsBtn.addEventListener('click', createEditTable);
editAccountBtn.addEventListener('click', editAccount);

createTable()

function createTable(){
    let text = ``;
    db.forEach(account => {
        text += `
            <tr>
                <td>${account.name}</td>
                <td>${account.lastName}</td>
                <td>${account.email}</td>
                <td>${account.phone}</td>
            </tr>
        `;
        })
        mainTable.innerHTML = text;
}


function displayAddAccountsView() {
    accountsView.style.display = 'none';
    addAccountsView.style.display = 'block';
    editAccountsView.style.display = 'none';
    editFormView.style.display = 'none';
}
function displayAccountsView() {
    accountsView.style.display = 'block';
    addAccountsView.style.display = 'none';
    editAccountsView.style.display = 'none';
    editFormView.style.display = 'none';
}
function displayEditView() {
    accountsView.style.display = 'none';
    addAccountsView.style.display = 'none';
    editFormView.style.display = 'none';
    editAccountsView.style.display = 'block';
}

function displayEditForm() {
    editFormView.style.display = 'block';
    accountsView.style.display = 'none';
    addAccountsView.style.display = 'none';
    editAccountsView.style.display = 'none';

    index = this.getAttribute('data-id');

    enameInput.value = db[index].name;
    elastNameInput.value = db[index].lastName;
    eemailInput.value = db[index].email;
    ephoneInput.value = db[index].phone;
}

function saveNewAccount() {
    let newAccount = {
            name : nameInput.value,
            lastName : lastNameInput.value,
            email : emailInput.value,
            phone : phoneInput.value
    }

    if(validate(newAccount)){
        db.push(newAccount);
        createTable();
        displayAccountsView();
        nameInput.value = lastNameInput.value = emailInput.value = phoneInput.value = '';
    } else {
        alert("Forma nije ok");
    }
}

function editAccount() {
    db[index] = {
        name: enameInput.value,
        lastName: elastNameInput.value,
        email: eemailInput.value,
        phone: ephoneInput.value
    }
    createTable();
    displayAccountsView();
}

function validate(account) {
    if(account.name.length < 3 || account.lastName.length < 3 || account.email.length < 3 || account.phone.length < 3){
        return false;
    } else {
        return true;
    }
}

function createEditTable(){
    let text = ``;
    db.forEach((account, index) => {
        text += `
            <tr>
                <td>${account.name}</td>
                <td>${account.lastName}</td>
                <td>${account.email}</td>
                <td>${account.phone}</td>
                <td><button data-id="${index}" class="btn btn-warning btn-sm form-control edit">Edit</button></td>
                <td><button data-id="${index}" class="btn btn-danger btn-sm delete">Delete</button></td>
            </tr>
        `;
        })
        editTable.innerHTML = text;

        let deleteBtns = document.querySelectorAll('.delete');
        let editBtns = document.querySelectorAll('.edit');
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].addEventListener('click', deleteAccount);
            editBtns[i].addEventListener('click', displayEditForm);
        }

        displayEditView();
}

function deleteAccount() {
    let index = this.getAttribute('data-id');
    let sure = confirm(`Da li ste sigurni da zelite da obrisete ${db[index].name}`);

    if(sure) {
        db.splice(index,1);
        createTable();
        displayAccountsView();
    }
}



function save() {
    localStorage.db = JSON.stringify(db);
}