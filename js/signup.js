$( document ).ready(function() {
    var userName = document.getElementById("username")
    var nm = document.getElementById("name")
    var pw = document.getElementById("password")
    var el = document.getElementById("email")
    var ln = document.getElementById("login")
    var lnpw = document.getElementById("loginpw")
    var signUpButton = document.getElementById("signup")
    var signInButton = document.getElementById("signin")
    
    signInButton.addEventListener('click', e => login())
    signUpButton.addEventListener('click', e => submit())
    

    function login() {
        if (checkValid(ln) && checkValidPw(lnpw)) {
            loginDb()
        }
        else alert("Invalid entries")
    }

    function loginDb() {
        firebase.database().ref('/users/' + ln.value).once('value').then(snapshot => {
            var user = snapshot.val()
            if (user) {
                if (user.password == lnpw.value) {
                    document.cookie = "userId=" + ln.value
                    window.location.href = "wardrobe.html"
                }   
                else {
                    alert("Incorrect password")
                }
            }
            else alert("Incorrect username or password")
        })
    }


    function submit() {
        if (checkValid(userName) && checkValid(nm) && checkValid(el) && checkValidPw(pw)) {
            addEntry()
            signin()
        }
        else alert("Make sure all your entries are valid")
    }

    function checkValid(item) {
        if (item.value.replace(/\s/g, '').length < 2) return false
        return true
    }

    function checkValidPw(item) {
        if (item.value.replace(/\s/g, '').length < 8) return false
        return true
    }

    function addEntry() {
        var entry = firebase.database().ref('/users/').child(userName.value)
        entry.set({name: nm.value, password: pw.value, email: el.value})
        return entry   
    }


})