$(document).ready(function() {
    var items = 0;
    db.collection("items").get()
    .then((res) => {
      res.forEach((element) => {
        items = items+1;
      });
      document.getElementById("items_count").innerHTML = "Items: "+items;  
    });

    all = document.getElementById("all_button");
    t = document.getElementById("tops_button");
    bottoms = document.getElementById("bottom_button");
    outer = document.getElementById("outer_button");
    shoes = document.getElementById("shoes_button");
    add = document.getElementById("add_button");
    all.onclick = function(){localStorage.setItem('name', 'all'); location.href = "hci_items.html";};
    t.onclick = function(){localStorage.setItem('name', 'top'); location.href = "hci_items.html";};
    bottoms.onclick = function(){localStorage.setItem('name', 'bottom'); location.href = "hci_items.html";};
    outer.onclick = function(){localStorage.setItem('name', 'outer');location.href = "hci_items.html";};
    shoes.onclick = function(){localStorage.setItem('name', 'shoes'); location.href = "hci_items.html";};
    add.onclick = function(){location.href = "add_page.html";}

    $('form').keypress(function(e) { 
        if (e.keyCode === 13) {
            e.preventDefault();
            localStorage.setItem('name', 'search');
            localStorage.setItem('searched', document.getElementById('search_bar').value.replace(/[^a-zA-Z0-9 ]/g, ""));
            location.href = "hci_items.html";
        }
      });
});