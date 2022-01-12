const billInput = document.querySelector('.bill__input');
const buttons = document.querySelectorAll('.porcen');
const custom = document.querySelector('.custom');
const errorBill = document.querySelector('.error__bill');
const errorPeople = document.querySelector('.error__people');
const peopleInput = document.querySelector('.people__input');
const tipAmount = document.querySelector('.output--tip');
const total = document.querySelector('.output--total');
const reset = document.querySelector('.calc__reset');

let bill, tip, people;

rst();

billInput.addEventListener("input", () => {
    bill = Number(billInput.value);
    if(bill <= 0 && bill != ""){
        errorBill.innerHTML = 'Not a positive number';
        errorBill.style.visibility = "visible";
        billInput.classList.add('bill-error');
    }else{
        errorBill.style.visibility = "hiddden";
        billInput.classList.remove('bill-error');
        calc();
    }
});

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        tip = btn.value;
        if(btn.classList.contains("selected")){
            btn.classList.add("unselected");
            btn.classList.remove("selected");
            tip = 0;
        }else{
            buttons.forEach(e => {
                e.classList.remove("selected");
            })
            btn.classList.remove("unselected");
            btn.classList.add("selected");
            tip = btn.value;
            calc();            
        }
    })
});

custom.addEventListener("input", () => {
    if(custom.value <= 0){
        custom.classList.add("custom-error");
        custom.value = 0;
    }else{
        buttons.forEach(e => {
            e.classList.remove("selected");
        })
        tip = custom.value;
        custom.classList.remove("custom-error");
        calc();
    }
})

peopleInput.addEventListener("input", () => {
    people = Number(peopleInput.value);
    if(people <= 0 && people != ""){
        errorPeople.innerHTML = 'Not a positive number';
        errorPeople.style.visibility = "visible";
        peopleInput.classList.add('people-error');
        people = 0;
    }else if(people == 0){
        errorPeople.innerHTML = "Can't be zero";
        errorPeople.style.visibility = "visible";
        peopleInput.classList.add('people-error');
        people = 0;
    }else{
        errorPeople.style.visibility = "hidden";
        peopleInput.classList.remove('people-error');
        calc();
    }
});

reset.addEventListener("click", rst);

function rst (){
    billInput.value = "";
    buttons.forEach(e => {
        e.classList.remove("selected");
        e.classList.add("unselected");
    })
    custom.value = "";
    peopleInput.value = "";
    tipAmount.innerHTML = "$0.00";
    total.innerHTML = "$0.00";
}

function calc(){
    if(bill >= 0 && people >= 1){
        let amountPerson = ((bill * tip) / 100) / people;
        let totalPerson = amountPerson + (bill / people);
        tipAmount.innerHTML = `$${amountPerson.toFixed(2)}`;
        total.innerHTML = `$${totalPerson.toFixed(2)}`;
    }
}