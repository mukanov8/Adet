$(document).ready(function() {

  checkSignIn()
  var userId = getCookie("userId")
  if (!userId) {
    window.location.href = "signup_page.html"
  }

  var request = localStorage.getItem('name');
  document.getElementById("category").innerText = request.charAt(0).toUpperCase() + request.slice(1).toLowerCase()+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
  var categories = [];
  var t = 60;

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function checkSignIn(){
    var userCookie = getCookie("userId")
    var userLocal = localStorage.getItem("userId")
    if (userCookie) localStorage.setItem("userId", userCookie)
    else if (userLocal) document.cookie = "userId=" + localStorage.getItem("userId")
  }


  function addTitle(el){
    var c = el.category.charAt(0).toUpperCase() + el.category.slice(1);
    var rectangle = document.createElement('div');
    rectangle.className = "rectangle";
    rectangle.innerHTML = c;
    rectangle.style.top = t +'px';
    t = t+3;
    document.getElementById("parent").appendChild(rectangle);
  }

  function createContainer(el){
    var contain = document.createElement('div');
    contain.className = "containers";
    contain.id = el.category.toLowerCase();
    contain.style.top = t +'px';
    t = t+10;
    document.getElementById("parent").appendChild(contain);
    }

  function createItem(url, el){
    var photo = document.createElement('img');
    photo.src = url;
    photo.className = "photo";
    var button = document.createElement('button');
    button.className = "button";
    button.id = el.id;
    
    var one = document.createElement('div');
    one.className = "one";

    one.appendChild(button);
    one.appendChild(photo);
    return one;
  }


if (request=="all"){
  db.collection("items").orderBy("category").where("userId", "==", userId)
  .get()
  .then((res) => {
    res.forEach((element) => {
      var starsRef = storage.child(element.data().image);
      starsRef.getDownloadURL().then(function (url) {
        if (!categories.includes(element.data().category.toLowerCase())){
          categories.push(element.data().category.toLowerCase());
          addTitle(element.data());
          createContainer(element.data());
        }
        var a = document.getElementById(element.data().category.toLowerCase());            
        a.appendChild(createItem(url,element)); 
        $('.button').click(function(){
          localStorage.setItem('item_id',this.id);
          location.href = "item_page.html";
        });
      });
    });
  });
}

else if (!(request == "search")) {
  db.collection("items").where("type","==",request).where("userId", "==", userId)
  .get()
  .then((res) => {
    res.forEach((element) => {
      var starsRef = storage.child(element.data().image);
      starsRef.getDownloadURL().then(function (url) {
        if (!categories.includes(element.data().category.toLowerCase())){
          categories.push(element.data().category.toLowerCase());
          addTitle(element.data());
          createContainer(element.data());
        }
        var a = document.getElementById(element.data().category.toLowerCase());            
        a.appendChild(createItem(url,element)); 
        $('.button').click(function(){
          localStorage.setItem('item_id',this.id);
          location.href = "item_page.html";
        });
      });
    });
  });
}

else{
  var searched = localStorage.getItem('searched');
  console.log(searched);
  db.collection("items").where("userId", "==", userId)
  .get()
  .then((res) => {
    res.forEach((element) => {
      var starsRef = storage.child(element.data().image);
      starsRef.getDownloadURL().then(function (url) {
        if (element.data().name.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase().includes(searched.toUpperCase())){
          if (!categories.includes(element.data().category.toLowerCase())){
            categories.push(element.data().category.toLowerCase());
            addTitle(element.data());
            createContainer(element.data());
          }
          var a = document.getElementById(element.data().category.toLowerCase());            
          a.appendChild(createItem(url,element)); 
        }
        $('.button').click(function(){
          localStorage.setItem('item_id',this.id);
          location.href = "item_page.html";
        });
      });
  });
 })
}
});