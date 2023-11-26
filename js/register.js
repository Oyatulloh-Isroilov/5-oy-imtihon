// elements
const oneClickName = document.getElementById("nameBtn");
const oneClickSurname = document.getElementById("surnameBtn");
const oneclickEmail = document.getElementById("emailBtn");
const oneClickPassword = document.getElementById("passwordBtn");
const oneClickEndBtn = document.getElementById("end-btn");
//
//elements inputs
const nameInp = document.getElementById("name-inp");
const surnameInp = document.getElementById("surname-inp");
const emailInp = document.getElementById("email-inp");
const passwordInp = document.getElementById("password-inp");
//
//
const oneClickEndBtn1 = () => {
  alert("Ma'lumot yuborildi");
  window.addEventListener("load");
};
oneClickEndBtn.addEventListener("click", oneClickEndBtn1);
//
localStorage.setItem("Ismi", nameInp.value);
