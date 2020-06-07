$(document).ready(function () {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $("#input_img").attr("src", e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $("#imgInp").change(function () {
    readURL(this);
  });
  document.getElementById(
    "item_date"
  ).value = new Date().toISOString().substring(0, 10);

  // $('.form-group').on('change', function(e){
  //   console.log(e.target.options[e.target.selectedIndex].value);
  //   console.log(e.target.options[e.target.selectedIndex].text);
  // })
  // document.getElementById('input_img')
  $("#saveBtn").click(function () {
    alert("Handler for .click() called.");
    // Upload file and metadata to the object 'images/mountains.jpg'
    var file = document.getElementById("imgInp").files[0];

    var imageName = document.getElementById("item_name").innerHTML;
    console.log(imageName);
    var uploadTask = storage.child(imageName).put(file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
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
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          console.log(document.getElementById("item_date").value);
          db.collection("items").add({
            name: document.getElementById("item_name").innerHTML,
            description: document.getElementById("item_description").innerHTML,
            timesWorn: 0,
            lastWorn: firebase.firestore.Timestamp.fromDate(new Date()),
            image: document.getElementById("item_name").innerHTML,
            boughtOn: firebase.firestore.Timestamp.fromDate(
              new Date(document.getElementById("item_date").value)
            ),
            type: document.getElementById("item_type").innerHTML,
            category: document.getElementById("item_category").innerHTML,
          });
        });
      }
    );
  });
});
