// console.log('hello from node app');
// var passenger = {
// name: `passenger1`,
// email:`passenger1@gmail.com`,
// age: 20,
// phone: [12345,1234]
// };
// var data = JSON.stringify(passenger);
// console.log(data);

// var text = `{"name":"passenger1","email":"passenger1@gmail.com","age":20,"phone":[12345,1234]}`
// var data = JSON.parse(text);
// console.log(data);

var response = null;
var tbody = document.getElementById('table-data');
var selectedPage = 1;
var hasLoadedPagination = false;

getData();      //function call

function getData(){
    fetch('https://reqres.in/api/users?page='+selectedPage)
    .then(res => res.json())   // after promise then function
    .then(data => {
        showData(data);
        if(!hasLoadedPagination){
            showPagination();
            hasLoadedPagination = true;
        }
    })
}

function showData(json){
    console.log(json);
    response = json;

    // for (let i = 0; i < json.data.length; i++) {
    //     const user = json.data[i];
    //     console.log(user.email);
    // }
    tbody.innerHTML = "";
    json.data.forEach(user =>{
        console.log(user.email);
        var row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function showPagination() {
    var pages = document.getElementById('pages');
    pages.innerHTML += `
        <li class="page-item">
            <a class="page-link" href="#" onclick="return navPrevNext('p')">Previous</a>
        </li>
        `;

    for (let i = 1; i <= response.total_pages; i++) {
        pages.innerHTML += `
            <li class="page-item">
                <a class="page-link" href="#" onclick="return navPrevNext('${i}')">${i}</a>
            </li>
        `;
    }

    pages.innerHTML += `
        <li class="page-item">
            <a class="page-link" href="#" onclick="return navPrevNext('n')">Next</a>
        </li>
        `;

}

function navPrevNext(option){
    if(option == 'p'){
        selectedPage--;
    }
    else if(option=='n'){
        selectedPage++;
    }
    else if(option==1){
        selectedPage=1;
    }
    else if(option==2){
        selectedPage=2;
    }
    getData();
}

    
 