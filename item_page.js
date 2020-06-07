$(document).ready(function () {
  // retrieve clothes item data from firebase.
  var item_id = localStorage.getItem("item_id");
  if (item_id == null) {
    item_id = "DKc6v3FIBoDkaj2HtCzo";
  }
  db.collection("items")
    .doc(item_id)
    .get()
    .then((item) => {
      insert(item);
    });

  // If the user is not logged in, hide some functions.
  if (!getCookie("userId")) {
    document.getElementById("minus").hidden = true;
    document.getElementById("plus").hidden = true;
    document.getElementById("back").hidden = true;
  } else {
    document.getElementById("minus").hidden = false;
    document.getElementById("plus").hidden = false;
    document.getElementById("back").hidden = false;
  }

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

  // Entering comment box
  // document.getElementById("comments").addEventListener("click", function (){

  // });

  // Send request if share button is pressed
  // document.getElementById("share").addEventListener("click", function (){

  // });
});

function insert(item) {
  // Create a reference to the file we want to download
  var starsRef = storage.child(item.data().image);

  // Get the download URL
  starsRef.getDownloadURL().then(function (url) {
    document.getElementById("image").src = url;
    document.getElementById("imageRef").href = url;
  });

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
  } else {
    document.getElementById("notification").style.display = "none";
  }

  document.getElementById("category").innerHTML = item.data().category;
  document.getElementById("name").innerHTML = item.data().name;
  document.getElementById("name").name = item.id;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
