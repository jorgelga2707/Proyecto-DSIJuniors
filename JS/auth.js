const session = JSON.parse(localStorage.getItem("dsijuniors_logged"))

if (!session || !session.tipoCuenta) {
    localStorage.removeItem("dsijuniors_logged")
    window.location.href = "login.html"
}