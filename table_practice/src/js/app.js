const myForm = document.querySelector("#myForm");
const firstInput = document.querySelector("#first");
const lastInput = document.querySelector("#last");
const handleInput = document.querySelector("#handle");

var table, tbody, tr, td, searchInput;

table = document.querySelector("#myTable");
tbody = table.querySelector("tbody");
tr = tbody.querySelectorAll("tr");
searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", function () {
    const search = searchInput.value.toLowerCase();
    const users = Store.getUsers();
    
    const asArray = Object.entries(users);
    console.log(asArray);
    const filtered = asArray.filter(([key, value]) => console.log(value))
});


class User {
    constructor(id, first, last, handle) {
        this.id = id;
        this.first = first;
        this.last = last;
        this.handle = handle;
    }
}

class UI {
    static displayUsers() {
        var users = Store.getUsers();
        
        users.forEach(user => UI.addUsersToTable(user));

    }


    static addUsersToTable(user) {
        tbody.innerHTML += `
            <tr>
                <th scope="row">${user.id}</th>
                <td>${user.first}</td>
                <td>${user.last}</td>
                <td>${user.handle}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
            </tr>
        `;
    }

    static removeUser(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}


class Store {
    static getUsers() {
        var users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    static addUser(user) {
        var users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static deleteUser(id) {
        var users = Store.getUsers();
        users.forEach((user, i) => {
            if (user.id == id) {
                users.splice(i, 1);
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

window.addEventListener("load", UI.displayUsers);

const makeNewRanId = () => {
    const randNum = Math.floor(Math.random() * 10000) + 1;
    return randNum;
}

myForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = makeNewRanId();
    const first = firstInput.value;
    const last = lastInput.value;
    const handle = handleInput.value;

    const user = new User(id, first, last, handle);

    UI.addUsersToTable(user);
    Store.addUser(user);
});


tbody.addEventListener('click', function(e) {
    e.preventDefault();
    UI.removeUser(e.target);
    Store.deleteUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
})