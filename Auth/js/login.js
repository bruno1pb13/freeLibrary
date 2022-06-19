
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
        return btn.innerHTML = `<span>Log In</span>`
    }

    if (state == "error") {
        return btn.innerHTML = `<span>Erro</span>`
    }


}

function logIn(){
    buttonState(1, 'loading')

    emailx = document.getElementById('email').value
    passwordx = document.getElementById('password').value

    const options = {
        method: 'POST',
        url: 'http://localhost:3000/auth/authenticate',
        headers: { 'Content-Type': 'application/json' },
        data: {
            email: emailx,
            password: passwordx
        }
    };


    axios.request(options).then(function (response) {
        buttonState(1,'default')

        try{

        data = response.data
        if(data.token){
            document.cookie = "token="+data.token+"; path=/; max-age=3600"
            window.location.href='/colection/index.html'

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