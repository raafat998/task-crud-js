// show alerts
function ShowAlert(message,className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    // Insert the alert at the top of the container
    container.insertBefore(div, container.firstChild);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}


function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;

    if (name === "") {
        
        ShowAlert("Name is required","danger")
        return false;
    }
    if (age === "") {

        ShowAlert("Age is required","danger")
        return false;
    } else if (age < 1) {
        ShowAlert("Age must not be zero or less than zero","danger")
        return false;
    }
    if (address === "") {
        ShowAlert("Address is required","danger")
        return false;
    }
    if (email === "") {
        ShowAlert("Email is required","danger")
        
        return false;
    } else if (!email.includes("@")) {
        ShowAlert("Invalid email address","danger")
        return false;
    }
    return true;
}

function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") === null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += 
        '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button>' + 
        '<button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showData;

function addData() {
    if (validateForm() === true) {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") === null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
    ShowAlert("user added successfuly","success")

}

function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") === null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();

    ShowAlert("user deleted successfuly","danger")
}

function updateData(index) {
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
    var peopleList;
    if (localStorage.getItem("peopleList") === null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
        ShowAlert("user updated successfuly","info")
    }

    
}