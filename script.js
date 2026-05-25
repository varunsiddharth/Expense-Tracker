const button = document.querySelector("button");

const downloadButton = document.querySelector("#download-btn");

const list = document.querySelector("#expense-list");

const expenseAmount =
document.querySelector("#expense-amount");

const expenseCategory =
document.querySelector("#expense-category");

const expenseDate =
document.querySelector("#expense-date");

const expenseNote =
document.querySelector("#expense-note");

const total =
document.querySelector("#total");

const totalEntries =
document.querySelector("#total-entries");

const topCategory =
document.querySelector("#top-category");

let totalAmount = 0;

let expenses = [];

const savedExpenses =
JSON.parse(localStorage.getItem("expenses"));

if (savedExpenses) {
    expenses = savedExpenses;
}

expenses.forEach(function (expense) {

    totalAmount += expense.amount;

    const li = document.createElement("li");

    li.innerHTML = `
        <div>
            <h3>${expense.category}</h3>

            <p>
                ${expense.date} • ${expense.note}
            </p>
        </div>

        <div>
            <strong>₹${expense.amount}</strong>

            <button class="delete-btn">
                Delete
            </button>
        </div>
    `;

    list.appendChild(li);

    const deleteButton =
    li.querySelector(".delete-btn");

    deleteButton.addEventListener("click", function () {

        totalAmount =
        totalAmount - expense.amount;

        total.textContent = totalAmount;

        expenses = expenses.filter(function (item) {
            return item !== expense;
        });

        totalEntries.textContent =
        expenses.length;

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();

    });

});

total.textContent = totalAmount;

totalEntries.textContent =
expenses.length;

if (expenses.length > 0) {
    topCategory.textContent =
    expenses[expenses.length - 1].category;
}

button.addEventListener("click", function () {

    if (
        expenseAmount.value === "" ||
        expenseCategory.value === ""
    ) {
        alert("Please enter all fields");
        return;
    }

    const amount =
    Number(expenseAmount.value);

    const expense = {
        amount: amount,
        category: expenseCategory.value,
        date: expenseDate.value,
        note: expenseNote.value
    };

    expenses.push(expense);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    const li = document.createElement("li");

    li.innerHTML = `
        <div>
            <h3>${expense.category}</h3>

            <p>
                ${expense.date} • ${expense.note}
            </p>
        </div>

        <div>
            <strong>₹${expense.amount}</strong>

            <button class="delete-btn">
                Delete
            </button>
        </div>
    `;

    list.appendChild(li);

    totalAmount =
    totalAmount + amount;

    total.textContent =
    totalAmount;

    totalEntries.textContent =
    expenses.length;

    topCategory.textContent =
    expense.category;

    const deleteButton =
    li.querySelector(".delete-btn");

    deleteButton.addEventListener("click", function () {

        totalAmount =
        totalAmount - expense.amount;

        total.textContent =
        totalAmount;

        expenses = expenses.filter(function (item) {
            return item !== expense;
        });

        totalEntries.textContent =
        expenses.length;

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();

    });

    expenseAmount.value = "";

    expenseDate.value = "";

    expenseNote.value = "";

});
downloadButton.addEventListener("click", function () {

    let csv =
    "Category,Amount,Date,Note\n";

    expenses.forEach(function (expense) {

        csv +=
`${expense.category},${expense.amount},${expense.date},${expense.note}\n`;

    });

    const blob = new Blob(
        [csv],
        { type: "text/csv" }
    );

    const url =
    window.URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download = "expenses.csv";

    a.click();

});