const button = document.querySelector("button");
const list = document.querySelector("#expense-list");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const total = document.querySelector("#total");
let totalAmount= 0;
let expenses = [];
const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
if(savedExpenses){
    expenses = savedExpenses;
}
expenses.forEach(function (expense) {

    const li = document.createElement("li");

    li.innerHTML =
        expense +
        ' <button class="delete-btn">Delete</button>';

    list.appendChild(li);
    const deleteButton = li.querySelector(".delete-btn");
     deleteButton.addEventListener("click", function () {

        expenses = expenses.filter(function (item) {
            return item !== expense;
        });

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();

    });
    
});

button.addEventListener("click", function () {
    if(expenseName.value==="" || expenseAmount.value===""){
        alert("Please enter all fields");
        return;
    }
    const amount = Number(expenseAmount.value);
    const li = document.createElement("li");
    li.innerHTML = expenseName.value + "- ₹" + expenseAmount.value +
    '<button class="delete-btn">Delete</button>';
    list.appendChild(li);
    expenses.push(
        expenseName.value +" - ₹" + amount
    );
    localStorage.setItem(
        "expenses", JSON.stringify(expenses)
    );

    const deleteButton = li.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function ()
    {
        totalAmount = totalAmount - amount;
        total.textContent = totalAmount;
        li.remove();
    });

    totalAmount = totalAmount + amount;
    total.textContent = totalAmount;
    expenseName.value = "";
    expenseAmount.value = "";
});