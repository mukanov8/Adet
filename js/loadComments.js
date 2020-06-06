$( document ).ready(function() {
    // document.cookie = "userId=someuserid"
    const query = new URLSearchParams(window.location.search);
    const postId = query.get('q');
    const postedBy = query.get('user');
    var addTo = document.getElementById("allComments")
    var submitButton = document.getElementById("submitComment")
    var commentBox = document.getElementById("addCommentText")
    var nameBox = document.getElementById("name")
    //  createData()
    

    $('#name').keypress(event => {
        if (event.keyCode == 13){
            event.preventDefault()
            commentBox.focus()
        }
    })

    getComments()
    getName()

    submitButton.addEventListener('click', e => {submit()})

    function getName() {
        if (getCookie("userId") == postedBy) {
            nameBox.value = postedBy
        }
    }
    

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

    function submit() {
        var commentText = commentBox.value
        var id = nameBox.value
        var dt = (new Date()).toString().substring(0,10)
        var entry = firebase.database().ref('/comments/').child(postId)
        comments.comments.push({name: id, comment: commentText, date: dt})
        if (comments.comments[0].name == null) comments.comments.shift()
        entry.set({ comments: comments.comments })
        addLast(comments.comments)
        nameBox.value = ""
        getName()
        commentBox.value = ""
        
        // var entry = firebase.database().ref('/comments/').child("somepostid")
        // var dt = (new Date()).toString().substring(0,10)
        // entry.set({ comments: [{name: "Adet commenter#1", comment: "Nice!", date: dt}, {name: "Adet commenter#2", comment: "Not good at all", date: dt}] })
        // return entry
    }
    function createData() {
        var entry = firebase.database().ref('/comments/').child(postId)
        // var dt = (new Date()).toString().substring(0,10)
        entry.set({owner: postedBy, comments: [{}]})
        return entry
    }


    function addLast(comments) {
        addComment(comments[comments.length-1])
    }
    
    function getComments() {
        firebase.database().ref('/comments/' + postId).once('value').then(snapshot => {
        var comments = snapshot.val()
        if (comments) {
            if (comments.comments) {
            addComments(comments.comments)
            window.comments = comments
            return
            }
        }
        createData()
        window.comments = {comments: [{}]}
        })
    }

    function addComments(comments) {
        for (let i = 0; i < comments.length; i++) {
            addComment(comments[i])
          }
    }

    function addComment(comment) {
        var commentDiv = document.createElement("div")
        commentDiv.className = "comment"
        var a = document.createElement("a")
        a.className = "author"
        a.innerText = comment.name
        var dateDiv = document.createElement("div")
        dateDiv.className = "metadata"
        var date = document.createElement("div")
        date.className = "date"
        date.innerText = comment.date
        var commentText = document.createElement("div")
        commentText.className = "text"
        commentText.innerText = comment.comment
        dateDiv.appendChild(date)
        commentDiv.appendChild(a)
        commentDiv.appendChild(dateDiv)
        commentDiv.appendChild(commentText)
        addTo.appendChild(commentDiv)
    }


//   <div class="comment">
//     <div class="content">
//       <a class="author">Stevie Feliciano</a>
//       <div class="metadata">
//         <div class="date">2 days ago</div>
//         <div class="rating">
//           <i class="star icon"></i>
//           5 Faves
//         </div>
//       </div>
//       <div class="text">
//         Hey guys, I hope this example comment is helping you read this documentation.
//       </div>
//     </div>
//   </div>

})