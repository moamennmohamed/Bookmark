var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var popaperror = document.getElementById("popapErrorSection");
var closePopapIcon = document.querySelector("#closePopap");
var websiteList = [];

if (localStorage.getItem("allWeb") != null) {
  websiteList = JSON.parse(localStorage.getItem("allWeb"));
  displayWebsiteList(websiteList);
}

function addWebsite() {
  if (validateForm(siteNameInput) && validateForm(siteUrlInput)) {
    var web = {
      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
    };
    websiteList.push(web);
    localStorage.setItem("allWeb", JSON.stringify(websiteList));
    console.log(websiteList);
    clearWebsiteList();
    displayWebsiteList(websiteList);
    popaperror.classList.replace("d-block", "d-none");
  } else {
    popaperror.classList.replace("d-none", "d-block");
  }
}

function clearWebsiteList() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function displayWebsiteList(list) {
  var blackBox = ``;
  for (var i = 0; i < list.length; i++) {
    // console.log(list[i].siteUrl);

    blackBox += `
                    <tr>
                        <td>${i + 1}</td>

                        <td>${list[i].siteName}</td>

                     <td><a href="${
                       list[i].siteUrl
                     }" class=" btn-visit text-white rounded-3 py-2 px-3"
                                target="_blank">
                                <i class="fa-solid fa-eye pe-2 text-white "></i> visit</a></td>

                        <td><button onclick="deleteWebsite(${i})" class=" btn-delete text-white rounded-3" target="_blank"><i
                                    class="fa-solid fa-trash  text-white "></i> Delete</button></td>
                    </tr>
               
    `;
  }
  document.getElementById("tableBody").innerHTML = blackBox;
}

function deleteWebsite(indexDelete) {
  websiteList.splice(indexDelete, 1);
  localStorage.setItem("allWeb", JSON.stringify(websiteList));

  displayWebsiteList(websiteList);
}

function validateForm(input) {
  var regex = {
    siteName: /^[ A-Za-z0-9]{3,}$/,

    siteUrl:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  };

  var isValid = regex[input.id].test(input.value);
  console.log(isValid);
  if (isValid) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }
  return isValid;
}


closePopapIcon.addEventListener("click", function () {
  popaperror.classList.replace("d-block", "d-none");
});