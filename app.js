var studentAPI = "http://localhost:3000/students";
var currIndex = -1;
function start(){
    getStudents(renderStudents); 
    handleCreateForm();
    Reset();
}
start();

function getStudents(callback){
    fetch(studentAPI)
    .then(function(reponse){
        return reponse.json();
    })
    .then(callback);
}

function createStudent(data, callback){
    var options = {
        method:'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    };
    fetch(studentAPI, options)
    .then(response => response.json())
    .then(callback)
    if(currIndex == -1){
        document.getElementById("create").innerHTML = "Create"; 
    }
}
function edit(id){
    var options = {
        method:'DELETE',
        headers: {'Content-Type' : 'application/json'},
        
    };
    fetch(studentAPI + '/' + id, options)
    .then(response => response.json())
    .then(id);
    document.getElementById("create").innerHTML = "Save"; 
  
}
function Delete(id){
    if(confirm("bạn có chắc chắn muốn xóa không?")){
        var options = {
            method:'DELETE',
            headers: {'Content-Type' : 'application/json'},
            
        };
        fetch(studentAPI + '/' + id, options)
        .then(response => response.json())
        .then(id);
    }
}
function renderStudents(students) {
    var listStudentsBlock = document.querySelector('#datalist');
    var htmls = students.map(function(student){
        return `
            <tr>
                <td>${student.id}</td>
                <td class="username">${student.username}</td>
                <td>${student.fullname}</td>
                <td>${student.email}</td>
                <td>${student.birthday}</td>
                <td><button type='button' onclick='edit(${student.id})' class='btn btn-warning'>Edit</button></td>
                <td><button onclick='Delete(${student.id})' class='btn btn-danger'>Delete</button></td>
            </tr>
        `;
    });
    listStudentsBlock.innerHTML = htmls.join('');
}

function handleCreateForm(){
        var createBtn = document.querySelector("#create");
        createBtn.onclick = function(){
            var username = document.querySelector('input[name="username"]').value;
            var fullname = document.querySelector('input[name="fullname"]').value;
            var email = document.querySelector('input[name="email"]').value;
            var birthday = document.querySelector('input[name="birthday"]').value;
            var formData = {
                username : username,
                fullname :fullname,
                email :email,
                birthday :birthday
            }
            createStudent(formData, function(){
                getStudents(renderStudents); 
            });
        }

}
function Reset(){
    document.getElementsByTagName("form")[0].reset();
 }

















