$(document).ready(function () {
  checkSignIn();
  var userId = getCookie("userId");
  if (!userId) {
    window.location.href = "signup.html";
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#input_img").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function checkSignIn() {
    var userCookie = getCookie("userId");
    var userLocal = localStorage.getItem("userId");
    if (userCookie) localStorage.setItem("userId", userCookie);
    else if (userLocal)
      document.cookie = "userId=" + localStorage.getItem("userId");
  }

  $("#imgInp").change(function () {
    readURL(this);
  });

  document.getElementById(
    "item_date"
  ).value = new Date().toISOString().substring(0, 10);
  back = document.getElementById("back");
  // $('.form-group').on('change', function(e){
  //   console.log(e.target.options[e.target.selectedIndex].value);
  //   console.log(e.target.options[e.target.selectedIndex].text);
  // })
  // document.getElementById('input_img')
  back.onclick = function () {
    location.href = "wardrobe.html";
  };
  $("#saveBtn").click(function () {
    // Upload file and metadata to the object 'images/mountains.jpg'
    var file = document.getElementById("imgInp").files[0];

    var imageName = Math.floor(Math.random() * 1000000000).toString();
    console.log(imageName);

    var uploadRef = storage.child(imageName).put(file);

    // console.log(document.getElementById('item_date').value);
    // console.log("sssssss");

    // Listen for state changes, errors, and completion of the upload.
    uploadRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function () {
        db.collection("items").add({
          image: imageName,
          description: document.getElementById("item_description").value,
          timesWorn: 0,
          lastWorn: firebase.firestore.Timestamp.fromDate(new Date()),
          name: document.getElementById("item_name").value,
          userId: userId,
          boughtOn: firebase.firestore.Timestamp.fromDate(
            new Date(document.getElementById("item_date").value)
          ),
          type: document.getElementById("item_type").value,
          category: document.getElementById("item_category").value,
        });
      }
    );
  });
});
