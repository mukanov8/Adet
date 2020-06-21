$(document).ready(function () {
  var items = 0;
  userId = getCookie("userId");

  db.collection("items")
    .where("userId", "==", userId)
    .get()
    .then((res) => {
      res.forEach((element) => {
        items = items + 1;
      });
      document.getElementById("items_count").innerHTML = "Items: " + items;
    });

  $(document.getElementById("signout")).click((ev) => {
    signOut();
  });

  $("form").keypress(function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      localStorage.setItem("name", "search");
      localStorage.setItem(
        "searched",
        document
          .getElementById("search_bar")
          .value.replace(/[^a-zA-Z0-9 ]/g, "")
      );
      location.href = "items_page.html";
    }
  });
  // function showNotification(name, id) {
  //   const notification = new Notification("Disposal Recommendation", {
  //     body: "It has been over 2 months since you last wore '" + name + "'."
  //   });
  //   notification.onclick = (e) => {
  //     localStorage.setItem("item_id", id);
  //     window.location.href = "item_page.html";
  //   };
  // }

  navigator.serviceWorker.register("js/notificationWorker.js");

  function showNotification(name, id) {
    localStorage.setItem("item_id", id);
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification("Adet Disposal Recommendation", {
        body: "It has been over 2 months since you last wore '" + name + "'.",
      });
    });
  }

  // notif = localStorage.getItem("notification");
  // if (typeof notif === "undefined" || notif != "done") {
  twoMonthAgo = new Date();
  twoMonthAgo.setMonth(twoMonthAgo.getMonth() - 2);
  db.collection("items")
    .where("userId", "==", userId)
    .where("lastWorn", "<", firebase.firestore.Timestamp.fromDate(twoMonthAgo))
    .get()
    .then((res) => {
      res.forEach((element) => {
        localStorage.setItem("notification", "done");
        console.log(Notification.permission);
        if (Notification.permission === "granted") {
          showNotification(element.data().name, element.id);
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              showNotification(element.data().name, element.id);
            }
          });
        }
      });
    });
  // }

  $(document.getElementById("signout")).click((ev) => {
    signOut();
  });

  //to change the x,y pos of div. not used currently
  // $(function(){
  //   var $this = $("#all");
  //   var offset = $this.offset();
  //   var width = $this.width();
  //   var height = $this.height();

  //   var x = offset.left + width / 2;
  //   var y = offset.top + height / 2;
  //   console.log(x ,y)
  //   var logoImg = document.getElementById('userLogo'); // or any other selector
  //   logoImg.style.left = x-16+"px";
  //   logoImg.style.top = y+"px";
  //   console.log(x,y+"aaa");
  //   console.log(userId);
  //  })

  all = document.getElementById("all_button");
  t = document.getElementById("tops_button");
  bottoms = document.getElementById("bottom_button");
  outer = document.getElementById("outer_button");
  shoes = document.getElementById("shoes_button");
  add = document.getElementById("plus");
  all.onclick = function () {
    localStorage.setItem("name", "all");
    location.href = "items_page.html";
  };
  t.onclick = function () {
    localStorage.setItem("name", "top");
    location.href = "items_page.html";
  };
  bottoms.onclick = function () {
    localStorage.setItem("name", "bottom");
    location.href = "items_page.html";
  };
  outer.onclick = function () {
    localStorage.setItem("name", "outerwear");
    location.href = "items_page.html";
  };
  shoes.onclick = function () {
    localStorage.setItem("name", "shoes");
    location.href = "items_page.html";
  };
  add.onclick = function () {
    document.getElementById("add_button").hidden = true;
    document.getElementById("add_button1").hidden = false;
    location.href = "add_page.html";
  };

  function signOut() {
    localStorage.clear();
    document.cookie = "userId=" + "";
    window.location.href = "signup_page.html";
  }
});
