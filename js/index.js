var bookmarkNameInput=document.getElementById('bookmarkName');
var bookmarkURLInput=document.getElementById('bookmarkURL');
var submitBtn=document.getElementById('submitBtn');
var visitBtn=document.querySelector('.btn-visit');
var lightBoxContainer=document.getElementById('lightBoxContainer');
var closeBtn=document.getElementById('closeBtn');

var bookMarkList;
if(localStorage.getItem( 'bookMarkList') != null){
  bookMarkList= JSON.parse(localStorage.getItem('bookMarkList'));
  displayTable;
} 
else{
  bookMarkList = [];
}
submitBtn.addEventListener('click',function(e){
  if(validateForm(bookmarkNameInput)
    &&validateForm(bookmarkURLInput)){
      var bookMark={
        name:bookmarkNameInput.value,
        url:bookmarkURLInput.value
    }
    bookMarkList.push(bookMark);
    localStorage.setItem('bookMarkList',JSON.stringify(bookMarkList))
    console.log(bookMarkList);
    clearForm()
    displayTable()
  }
  else{
    lightBoxContainer.classList.remove('d-none');
  }
   
})
function clearForm(){
    bookmarkName.value=null;
    bookmarkURL.value=null;
}
function displayTable(){
    var cartona="";
    for(var i=0;i<bookMarkList.length;i++){
        cartona+=`
                <tr>
                  <td>${i}</td>
                  <td>${bookMarkList[i].name}</td>              
                  <td>
                    <button onclick="visitSite(${i})" class="btn btn-visit btn-success  px-4 py-2 fs-6 m-auto" data-index="${i}">
                      <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                  </td>
                  <td>
                    <button onclick="deletRow(${i})" class="btn btn-delete btn-danger px-4 py-2 fs-6" data-index="${i}">
                      <i class="fa-solid fa-trash-can"></i>
                      Delete
                    </button>
                  </td>
              </tr>
              `
              document.getElementById('tableContent').innerHTML=cartona;
    }
}

function deletRow(deleteIndex){
  bookMarkList.splice(deleteIndex,1);
  localStorage.setItem('bookMarkList',JSON.stringify(bookMarkList));
  displayTable();
}
function validateForm(element){
  var regex={
    bookmarkName:/^\w{2,}$/i,
    bookmarkURL:/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  }
  if (regex[element.id].test(element.value)) {
      element.classList.add('is-valid');
      element.classList.remove('is-invalid');
      return true;
  }
  else{
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    return false;
  }
}
function visitSite(index){
  window.open(bookMarkList[index].url);
}
closeBtn.addEventListener('click',function(e){
  lightBoxContainer.classList.add('d-none');
})







