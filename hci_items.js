$(document).ready(function() {
    var request = localStorage.getItem('name');
    document.getElementById("title").innerHTML = request.charAt(0).toUpperCase() + request.slice(1);

    var categories = [];
    var t = 60;
    db.collection("items").where("type","==",request).orderBy("category")
    .get()
    .then((res) => {
      res.forEach((element) => {
        var starsRef = storage.child(element.data().image);
        starsRef.getDownloadURL().then(function (url) {
          if (!categories.includes(element.data().category.toLowerCase())){
            categories.push(element.data().category.toLowerCase());

            var c = element.data().category.charAt(0).toUpperCase() + element.data().category.slice(1);
            var rectangle = document.createElement('div');
            rectangle.className = "rectangle";
            rectangle.innerHTML = c;
            rectangle.style.top = t +'px';
            t = t+3;
            document.getElementById("parent").appendChild(rectangle);

            var contain = document.createElement('div');
            contain.className = "containers";
            contain.id = element.data().category.toLowerCase();
            console.log(contain.id);
            contain.style.top = t +'px';
            t = t+10;

            var photo = document.createElement('img');
            photo.src = url;
            photo.className = "photo";
            var button = document.createElement('button');
            button.className = "button";
            
            var one = document.createElement('div');
            one.className = "one";

            one.appendChild(button);
            one.appendChild(photo);

            contain.appendChild(one);
            document.getElementById("parent").appendChild(contain);            
          }
          else{
            var a = document.getElementById(element.data().category.toLowerCase());

            var b = document.createElement('img');
            b.src = url;
            b.className = "photo";
            var c = document.createElement('button');
            c.className = "button";
            
            var d = document.createElement('div');
            d.className = "one";

            d.appendChild(c);
            d.appendChild(b);

            a.appendChild(d); 
          }
        });
      });
    });
});





function insert(item) {
    // Create a reference to the file we want to download
    var starsRef = storage.child(item.data().image);
    
    // Get the download URL
    starsRef.getDownloadURL().then(function (url) {
        var photo = url;
        console.log(url);
        l.push({type: item.data().type,
            category: item.data().category,
            photo: photo});
    });
}