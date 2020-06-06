$( document ).ready(function() {
    const query = new URLSearchParams(window.location.search);
    const postId = query.get('q');
    const postedBy = query.get('user');
    var addTo = document.getElementById("allComments")
    var submitButton = document.getElementById("submitComment")
    var commentBox = document.getElementById("addCommentText")
    var nameBox = document.getElementById("name")
    

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
    }
    
    function createData() {
        var entry = firebase.database().ref('/comments/').child(postId)
        entry.set({comments: [{}]})
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
})