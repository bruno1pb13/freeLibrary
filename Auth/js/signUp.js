
function smlSubmit(){
    document.getElementById('f2submit').click()
}

function buttonState(btn,state) {

    if(!btn){
        btn = 1
    }

    if(btn == 1){
        target = "createAccount"
    }else if(btn == 2){
        target = "createAccount2"
    }

    btn = document.getElementById(target)


    if (state == "loading") {
        return btn.innerHTML = `
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>`
    }


    if (state == "default") {
        return btn.innerHTML = `<span>Create Account</span>`
    }

    if (state == "error") {
        return btn.innerHTML = `<span>Erro</span>`
    }





}

function unlockCreate(){
    terms = document.getElementById('flexCheckDefault')

    if(terms){
        if(terms.checked){
            document.getElementById("createAccount").disabled = false
        }else{
            document.getElementById("createAccount").disabled = true
        }
    }
}

function signUp() {
    buttonState(1, 'loading')

    fullname = document.getElementById('fullName').value
    username = document.getElementById('username').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value


    const options = {
        method: 'POST',
        url: 'http://localhost:3000/auth/register',
        headers: { 'Content-Type': 'application/json' },
        data: {
            name: fullname,
            email: email,
            password: password
        }
    };

    axios.request(options).then(function (response) {
        buttonState(1,'default')

        try{

        data = response.data.user

        if(data._id || data.accountState == "pending"){
             
                document.getElementById("form1").style.display = "none"
                document.getElementById("form2").style.display = "block"
                document.getElementById("form3").style.display = "none"
                document.getElementById('userId').value = data._id
                document.getElementById("userMail").value = data.email
                toast.classList.remove('toastShow')
                

        }else{
            console.log({"Erro": data})
        }
        }catch(err){
            console.log(err)
        }

    }).catch(function (error) {
        setTimeout(function () {
            buttonState(1,'error')

            toast = document.getElementById('liveToast')
            toast.classList.add('toastShow')
            setTimeout(function () {
                buttonState(1,'default')
                toast.classList.remove('toastShow')
            }, 3000)
        }, 2000)
    });


}

function validCode(){
    buttonState(2,'loading')

    id = document.getElementById('userId').value
    code = document.getElementById('token').value

    if(code.length !== 4){
        
        buttonState(2,'default')
        return(alert("Code must be 4 digits"))

    }


    const options = {
        method: 'POST',
        url: 'http://localhost:3000/auth/register/'+id,
        headers: { 'Content-Type': 'application/json' },
        data: {
            token: code,
        }
    };

    axios.request(options).then(function (response) {
        buttonState(2,'default')

        try{

            data = response.data

            document.cookie = "token="+data.token+"; path=/; max-age=3600"
                
            document.getElementById("form1").style.display = "none"
            document.getElementById("form2").style.display = "none"
            document.getElementById("form3").style.display = "flex"

            toast.classList.remove('toastShow')
                    
            buttonState(2,'default')



        }catch(err){
            buttonState(2,'default')
            console.log(err)
        }

    }).catch(function (error) {
        setTimeout(function () {
            buttonState(2, 'error')

            toast = document.getElementById('liveToast')
            toast.classList.add('toastShow')
            setTimeout(function () {
                buttonState(2, 'default')
                toast.classList.remove('toastShow')
            }, 3000)
        }, 2000)
    });
}