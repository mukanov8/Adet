$(document).ready(function () {
  // retrieve clothes item data from firebase.
  var item_id = localStorage.getItem("item_id");
  db.collection("items")
    .doc(item_id)
    .get()
    .then((item) => {
      insert(item);
    });

  // Enabling a popover
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  $(document).ready(function () {
    $('[data-toggle="popover"]').popover();
  });

  //Back button
  document.getElementById("backButton").addEventListener("click", function () {
    var name = localStorage.getItem("name");
    if (name == "") {
      db.collection("items")
        .doc(item_id)
        .get()
        .then((item) => {
          localStorage.setItem("name", item.data().type);
          location.href = "./items_page.html";
        });
    } else {
      location.href = "./items_page.html";
    }
  });

  // Increasing and decreasing timesWorn
  document.getElementById("plus").addEventListener("click", function () {
    document.getElementById("timesWorn").innerHTML =
      parseInt(document.getElementById("timesWorn").innerHTML) + 1;
    today = new Date();
    document.getElementById("lastWorn").innerHTML =
      today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
    db.collection("items")
      .doc(document.getElementById("name").name)
      .update({
        timesWorn: parseInt(document.getElementById("timesWorn").innerHTML),
        lastWorn: firebase.firestore.Timestamp.fromDate(new Date()),
      });
  });
  document.getElementById("minus").addEventListener("click", function () {
    document.getElementById("timesWorn").innerHTML =
      parseInt(document.getElementById("timesWorn").innerHTML) - 1;
    db.collection("items")
      .doc(document.getElementById("name").name)
      .update({
        timesWorn: parseInt(document.getElementById("timesWorn").innerHTML),
      });
  });

  // Send request if share button is pressed
  $("#share").popover({
    container: "body",
    boundary: "window",
    animation: true,
    placement: "top",
    content: "The link to this clothes is copied to your clipboard",
    // trigger: "focus",
  });

  document.getElementById("share").addEventListener("click", function () {
    db.collection("items")
      .doc(item_id)
      .get()
      .then((element) => {
        var temp = window.location.href;
        temp = temp.split("/");
        temp.pop();
        temp = temp.join("/");
        var link =
          temp +
          "/comments_page.html?q=" +
          item_id +
          "&user=" +
          element.data().userId;
        const el = document.createElement("textarea");
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      });
  });

  // Entering comment box
  document.getElementById("comments").addEventListener("click", function () {
    db.collection("items")
      .doc(item_id)
      .get()
      .then((element) => {
        location.href =
          "./comments_page.html?q=" +
          item_id +
          "&user=" +
          element.data().userId; //check this
      });
  });

  // Delete
  document.getElementById("delete").addEventListener("click", function () {
    db.collection("items")
      .doc(item_id)
      .get()
      .then((item) => {
        var desertRef = storage.child(item.data().image);
        desertRef.delete();
      })
      .then(function () {
        db.collection("items")
          .doc(item_id)
          .delete()
          .then(function () {
            console.log("successful");
            window.history.back();
          });
      });
  });
});

function insert(item) {
  // Create a reference to the file we want to download
  var starsRef = storage.child(item.data().image);

  // Get the download URL
  starsRef.getDownloadURL().then(function (url) {
    document.getElementById("image").src = url;
  });

  document.getElementById("description").innerHTML = item.data().description;
  var temp = item.data().boughtOn.toDate();
  document.getElementById("boughtOn").innerHTML =
    temp.getMonth() + "/" + temp.getDate() + "/" + temp.getFullYear();
  temp = item.data().lastWorn.toDate();
  document.getElementById("lastWorn").innerHTML =
    temp.getMonth() + "/" + temp.getDate() + "/" + temp.getFullYear();
  document.getElementById("timesWorn").innerHTML = item.data().timesWorn;

  // Display notification if the clothes is worn over 50 times.
  if (item.data().timesWorn > 50) {
    document.getElementById("notification").style.display = "block";
    document.getElementById("notification").innerHTML =
      "<b>Notification: </b>You have worn this clothes over 50 times. Maybe, it is time to throw it away.";
  } else if (
    item.data().timesWorn < 20 &&
    Math.abs(new Date() - temp) / (1000 * 60 * 60 * 24) > 60
  ) {
    document.getElementById("notification").style.display = "block";
    document.getElementById("notification").innerHTML =
      "<b>Notification: </b>It has been 2 months since you last wore this item, and you seldomly wear it.";
  } else {
    document.getElementById("notification").style.display = "none";
  }

  document.getElementById("category").innerHTML = item.data().category;
  document.getElementById("name").innerHTML = item.data().name;
  document.getElementById("name").name = item.id;
}
