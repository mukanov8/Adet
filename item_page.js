$(document).ready(function () {
  db.collection("items")
    .limit(1)
    .get()
    .then((res) => {
      res.forEach((element) => {
        insert(element);
      });
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

  // Entering comment box
  // document.getElementById("comments").addEventListener("click", function (){

  // });

  // Send request if share button is pressed
  // document.getElementById("share").addEventListener("click", function (){

  // });
});

function insert(item) {
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
  console.log(item.id);
  document.getElementById("name").name = item.id;
}
