"use strict";
const form = document.querySelector(".js-form"),
  formData = {
    name: "",
    job: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    photo: "",
    pallete: "1",
  },
  namePreview = document.querySelector(".js-namePreview"),
  jobPreview = document.querySelector(".js-jobPreview"),
  imgPreview = document.querySelector(".js-imgPreview"),
  mailPreview = document.querySelector(".js-mailPreview"),
  telPreview = document.querySelector(".js-telPreview"),
  linkedinPreview = document.querySelector(".js-linkedinPreview"),
  gitHubPreview = document.querySelector(".js-gitHubPreview"),
  headerClicks = document.querySelectorAll(".js-collapsible"),
  resetButton = document.querySelector(".js-resetButton"),
  inputName = document.querySelector(".js-inputName"),
  inputJob = document.querySelector(".js-inputJob"),
  inputPhone = document.querySelector(".js-inputPhone"),
  inputEmail = document.querySelector(".js-inputEmail"),
  inputGitHub = document.querySelector(".js-inputGitHub"),
  inputLinkedin = document.querySelector(".js-inputLinkedin"),
  inputColor1 = document.querySelector(".js-colorOption1"),
  inputColor2 = document.querySelector(".js-colorOption2"),
  inputColor3 = document.querySelector(".js-colorOption3");
function handlerColor() {
  const e = document.querySelector(".js-colorOption:checked").value,
    t = document.querySelector(".js-cardElement");
  t.classList.remove("opt1", "opt2", "opt3"),
    "1" === e
      ? t.classList.add("opt1")
      : "2" === e
      ? t.classList.add("opt2")
      : "3" === e && t.classList.add("opt3");
}
function paintPreview(e) {
  const t = e.target.name;
  e.target.value;
  "name" === t
    ? (namePreview.innerHTML =
        "" === formData.name ? "Nombre Apellidos" : formData.name)
    : "job" === t
    ? (jobPreview.innerHTML =
        "" === formData.job ? "Front-end developer" : formData.job)
    : "email" === t
    ? (mailPreview.href += "" === formData.email ? "" : formData.email)
    : "phone" === t
    ? (telPreview.href += "" === formData.phone ? "" : formData.phone)
    : "linkedin" === t
    ? (linkedinPreview.href +=
        "" === formData.linkedin ? "" : formData.linkedin)
    : "github" === t &&
      (gitHubPreview.href += "" === formData.github ? "" : formData.github);
}
function handlerFormData(e) {
  const t = e.target.name,
    n = e.target.value;
  (formData[t] = n), console.log(formData), paintPreview(e), setLocalStorage();
}
function handlerFill() {
  handlerColor(event), handlerFormData(event);
}
function handleHeaderClick(e) {
  const t = e.currentTarget.closest(".js-hidden"),
    n = document.querySelectorAll(".js-hidden");
  for (const e of n)
    t === e ? e.classList.toggle("hidden") : e.classList.add("hidden");
}
form.addEventListener("change", handlerFill);
for (const e of headerClicks) e.addEventListener("click", handleHeaderClick);
const fr = new FileReader(),
  fileField = document.querySelector(".js-inputImg"),
  profileImage = document.querySelector(".js-imgPreview"),
  profilePreview = document.querySelector(".js__profile-preview");
function getImage(e) {
  const t = e.currentTarget.files[0];
  fr.addEventListener("load", writeImage), fr.readAsDataURL(t);
}
function writeImage() {
  (formData.photo = fr.result),
    (profileImage.style.backgroundImage = `url(${formData.photo})`),
    (profilePreview.style.backgroundImage = `url(${formData.photo})`),
    setLocalStorage();
}
function fakeFileClick() {
  fileField.click();
}
function updateForm() {
  (formData.name = ""),
    (formData.job = ""),
    (formData.email = ""),
    (formData.phone = ""),
    (formData.linkedin = ""),
    (formData.github = ""),
    (formData.photo = ""),
    (formData.pallete = "1"),
    console.log(formData);
}
function updatePreview() {
  (namePreview.innerHTML = "Nombre Apellido"),
    (jobPreview.innerHTML = "Front-end developer"),
    (profileImage.style.backgroundImage =
      "url(./assets/images/listen-logo.png)"),
    (profilePreview.style.backgroundImage =
      "url(./assets/images/listen-logo.png)"),
    (mailPreview.href = "mailto:"),
    (telPreview.href = "tel:+34"),
    (linkedinPreview.href = "https://www.linkedin.com/in/"),
    (gitHubPreview.href = "https://github.com/");
}
function updateInputs() {
  (inputName.value = ""),
    (inputJob.value = ""),
    (inputPhone.value = ""),
    (inputEmail.value = ""),
    (inputGitHub.value = ""),
    (inputLinkedin.value = "");
}
function resetpalletes() {
  document.querySelector(".js-colorOption:checked").checked = !1;
  document.querySelector(".js-palleteDefault").checked = !0;
  const e = document.querySelector(".js-cardElement");
  e.classList.remove("opt1", "opt2", "opt3"), e.classList.add("opt1");
}
function handleReset() {
  updateForm(),
    updatePreview(),
    updateInputs(),
    resetpalletes(),
    localStorage.clear(),
    (responseElement.innerHTML = "");
}
fileField.addEventListener("change", getImage),
  resetButton.addEventListener("click", handleReset);
const btn = document.querySelector(".js-create-card"),
  responseElement = document.querySelector(".js-response");
function handlerClickCreate(e) {
  e.preventDefault(),
    console.log(formData),
    "" === formData.name
      ? (responseElement.innerHTML =
          '<h3 class="text-set-up">Tienes que rellenar el campo: Nombre completo</h3>')
      : "" === formData.job
      ? (responseElement.classList.remove("text-set-up"),
        (responseElement.innerHTML =
          '<h3 class="text-set-up">Tienes que rellenar el campo: Puesto</h3>'))
      : "" === formData.photo
      ? (responseElement.innerHTML =
          '<h3 class="text-set-up">Tienes que añadir una imagen de perfil</h3>')
      : "" === formData.email
      ? (responseElement.innerHTML =
          '<h3 class="text-set-up">Tienes que rellenar el campo: Email</h3>')
      : "" === formData.linkedin
      ? (responseElement.innerHTML =
          '<h3 class="text-set-up">Tienes que rellenar el campo: Linkedin</h3>')
      : "" === formData.github
      ? (responseElement.innerHTML =
          '<h3 class="text-set-up">Tienes que rellenar el campo: GitHub</h3>')
      : fetch("https://awesome-profile-cards.herokuapp.com/card", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        })
          .then((e) => e.json())
          .then((e) => {
            if (!1 === e.success)
              (responseElement.innerHTML =
                "Tienes que rellenar todos los campos"),
                responseElement.classList.remove("js-hiddenTwitter");
            else {
              (responseElement.innerHTML =
                '<h3 class="text-set-up">La tarjeta ha sido creada:</h3>'),
                (responseElement.innerHTML += `<p><a href="${e.cardURL}" class="link-set-up js-twitter-link" target="_blank">${e.cardURL}</a></p>`),
                (responseElement.innerHTML +=
                  '<a class="twitter-button js-btn-twitter" target="_blank">\n        <i class="fa fa-twitter"></i> Compartir en Twitter\n      </a>'),
                (btn.disabled = !0),
                btn.classList.add("btn-disable"),
                responseElement.classList.add("set-up-container-top");
              document
                .querySelector(".js-btn-twitter")
                .setAttribute(
                  "href",
                  "https://twitter.com/intent/tweet?ref_src=twsrc%5Etfw&url=" +
                    e.cardURL
                );
            }
          })
          .catch(() => {
            (responseElement.innerHTML = "Inténtalo de nuevo más tarde"),
              responseElement.classList.remove("js-hiddenTwitter");
          });
}
function setLocalStorage() {
  localStorage.setItem("formData", JSON.stringify(formData));
}
function getLocalStorage() {
  let e = JSON.parse(localStorage.getItem("formData"));
  if ((console.log(e), null !== e)) {
    const t = document.querySelectorAll(".js-colorOption");
    for (const n of t) {
      n.value === e.pallete && (n.checked = !0);
      const t = document.querySelector(".js-cardElement");
      t.classList.remove("opt1", "opt2", "opt3"),
        t.classList.add("opt" + e.pallete);
    }
    (inputName.value = e.name),
      (inputJob.value = e.job),
      (inputPhone.value = e.phone),
      (inputEmail.value = e.email),
      (inputGitHub.value = e.github),
      (inputLinkedin.value = e.linkedin),
      (profilePreview.value = e.photo),
      (formData.name = e.name),
      (formData.job = e.job),
      (formData.photo = e.photo),
      (formData.phone = e.phone),
      (formData.email = e.email),
      (formData.github = e.github),
      (formData.linkedin = e.linkedin),
      "" !== e.name
        ? (namePreview.innerHTML = e.name)
        : (namePreview.innerHTML = "Nombre Apellido"),
      "" !== e.job
        ? (jobPreview.innerHTML = e.job)
        : (jobPreview.innerHTML = "Front-end developer"),
      (profileImage.style.backgroundImage = `url(${e.photo})`),
      (profilePreview.style.backgroundImage = `url(${e.photo})`),
      (mailPreview.href = "mailto:" + e.email),
      (telPreview.href = "tel:+34" + e.phone),
      (linkedinPreview.href = "https://www.linkedin.com/in/" + e.linkedin),
      (gitHubPreview.href = "https://github.com/" + e.github);
  }
}
btn.addEventListener("click", handlerClickCreate), getLocalStorage();
