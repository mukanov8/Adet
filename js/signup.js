$( document ).ready(function() {
    var userName = document.getElementById("username")
    var nm = document.getElementById("name")
    var pw = document.getElementById("password")
    var el = document.getElementById("email")
    var ln = document.getElementById("login")
    var lnpw = document.getElementById("loginpw")
    var signUpButton = document.getElementById("signup")
    var signInButton = document.getElementById("signin")
    var cookie = getCookie("userId")

    if (getCookie("userId")) {
        window.location.href = "wardrobe.html" + "?q=" + cookie
    }

    signInButton.addEventListener('click', e => login())
    signUpButton.addEventListener('click', e => submit())
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }


    function login() {
        if (checkValid(ln) && checkValidPw(lnpw)) {
            loginDb()
        }
        else alert("Invalid entries")
    }

    function loginDb() {
        db.collection("users").where("username", "==", ln.value).get().then(v => {
            v.forEach((element) => {
                if (element.data().password == lnpw.value) {
                    document.cookie = "userId=" + element.data().uniqueId
                    window.location.href = "wardrobe.html"
                }
            })
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
        var randomId = Math.floor(Math.random() * 1000000000)
        db.collection("users").add({
            name: nm.value,
            password: pw.value.replace(/\s/g, ''),
            email: el.value.replace(/\s/g, ''),
            username: userName.value.replace(/\s/g, ''),
            uniqueId: randomId
        }) 
    }
})