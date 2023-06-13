// ......................................................................................................
class nav {
    constructor() {
        this.navcontrol()
    }
    navcontrol() {
        $(".home i").click(nav.closeNav)
        $(".sidebar i").click(nav.closeNav)
    }
    static closeNav() {

        if ($(".sidebar").css("left") == "0px") {

            let sidebarwidth = $(".sidebar").innerWidth();
            $(".sidebar").animate({ left: -sidebarwidth }, 500)
            $(".home ").animate({ "margin-left": "0px" }, 500)

            document.getElementById("bars").classList.replace('fa-xmark', 'fa-bars')
            $(".sidebarInner").animate( {top:"110%" ,
        }, 750)
        } else {
            nav.openNav()
        }
    }

    static openNav() {
        let sidebarwidth = $(".sidebar").innerWidth();
        $(".sidebar").animate({ left: '0px' }, 500)
        $(".home ").animate({ "margin-left": sidebarwidth }, 500)
        $(".sidebarInner").animate( {top:"0" ,
    }, 750)
        document.getElementById("bars").classList.replace('fa-bars', 'fa-xmark')
    }
}
let navb = new nav
// ......................................................................................................








function display(a) {
    let cartona = ``
    if(a==null){
    document.getElementById('show').innerHTML = cartona

}
else{
    for (let i = 0; i < a.meals.length; i++) {
        cartona += `    <div class="col-md-3" id="${a.meals[i].idMeal}"   ">
           <div class="div position-relative overflow-hidden">
            <img src="${a.meals[i].strMealThumb}" class="w-100 " alt="">
            <div class="overlay  d-flex align-items-center  position-absolute ">
        <p class="bg-bg-transparent fs-2  ">${a.meals[i].strMeal}</p>    
            </div>
        </div>
        </div>
    `
        console.log();
    }
    document.getElementById('show').innerHTML = cartona
    document.querySelectorAll(".col-md-3 ").forEach((item) => {
        item.addEventListener("click", () => {
            const id = item.id;
            console.log(id);
            showdetails(id)
        })
    })
}
}





// ...................................................................................................... 


getApi()
async function getApi() {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    var finalResult = await Api.json()
    console.log(finalResult)
    await display(finalResult)
    await $(".loading").fadeOut(300)
}

async function showdetails(id) {
    $(".loading").fadeIn(10)
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var finalResult = await Api.json()
    console.log(finalResult)
    displaydetails(finalResult.meals[0])
    $(".loading").fadeOut(300)
    $(".search").fadeOut(300)

}




async function displaydetails(a) {
    let cartona = ``
    cartona += `    
           <div class="div text-white w-100 mt-4 d-flex overflow-hidden">
           <div class="d-flex flex-column">
           <img id="detailsImg" src="${a.strMealThumb}" class="p-2 " alt="">
            <h3 class="d-flex"> <p>${a.strMeal}  </p></h3>    
            </div>
            <div class="p-2">
            <h2>Instructions</h2>
        <p class="fs-6">${a.strInstructions}</p>    
        <h3 class="d-flex">area: <p>${a.strArea}  </p></h3>    
        <h3 class="d-flex">Category: <p>${a.strCategory}  </p></h3>    
        <h3 class="d-block">
        Recipes:
        </h3>    
        <ul class="w-75 d-flex flex-wrap list-unstyled ">
        ${await getingred(a)}
        </ul>
        <h3 class="d-block">
      Tags:
        </h3>    
        <ul class="w-75 d-flex flex-wrap list-unstyled ">
        ${await getTags(a)}
        </ul>
        <div class="d-flex ">
        <a href="${a.strSource}" target="_blank" class="bg-success text-white text-decoration-none m-2 p-3">Source </a>    
               <a href="${a.strYoutube}" target="_blank" class="bg-danger text-white text-decoration-none m-2 p-3">Youtube </a>    
        </div>
        </div>
            </div>
        </div>
        </div>
    `
    console.log(a);

    document.getElementById('show').innerHTML = cartona
}


function getingred(a) {
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (a[`strIngredient${i}`]) {
            ingredients += `<li class="ingred m-2 px-3 py-2">${a[`strMeasure${i}`]} ${a[`strIngredient${i}`]}</li>`
        }
    }
    return ingredients;
}

async function getTags(a) {
    let tags = ``
    let tagscartona = ''
    if (a.strTags != null) {
        tags = await a.strTags.split(",")
        for (let i = 0; i < tags.length; i++) {
            tagscartona += ` <li class="tags  px-3 py-2 m-2 ">${tags[i]}</li>`
        }
    }
    else {
        tagscartona = ``
    }
    return tagscartona;
}

// ......................................................................................................











// ......................................................................................................

$('#categories').click(function () {
    $('.search').fadeOut(100)
    $(".loading").fadeIn(50)
    nav.closeNav()
    $('.container .col-md-3').fadeOut(100)
    console.log('abc');
    showcategories()
    $(".loading").fadeOut(300)
})
async function showcategories() {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var finalResult = await Api.json()
    console.log(finalResult)
    displaycategory(finalResult)
}
function displaycategory(a) {
    let cartona = ``
    for (let i = 0; i < a.categories.length; i++) {
        cartona += `    <div class="col-md-3" id="${a.categories[i].strCategory}"   ">
           <div class="div position-relative overflow-hidden p-3">
            <img class="text-white" src="${a.categories[i].strCategoryThumb}" class="w-100 " alt="">
            <div class="overlay  bg-white align-items-center justify-content-center position-absolute bg-danger">
        <h4 class="bg-white">${a.categories[i].strCategory}</h4>
        <p class="bg-white">${a.categories[i].strCategoryDescription}</p>
            </div>
        </div>
        </div>
    `
    }
    document.getElementById('show').innerHTML = cartona
    document.querySelectorAll(".col-md-3 ").forEach((item) => {
        item.addEventListener("click", () => {
            const id = item.id;
            console.log(id);
            showdetailscategory(id)
        })
    })

}
async function showdetailscategory(id) {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
    var finalResult = await Api.json()
    console.log(finalResult)
    display(finalResult)
}
// ......................................................................................................








// ......................................................................................................
$('#area').click(function () {

    $('.search').fadeOut(100)

    $(".loading").fadeIn(10)

    nav.closeNav()
    $('.container .col-md-3').fadeOut(100)
    console.log('abc');
    showarea()

    $(".loading").fadeOut(300)

})
async function showarea() {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    var finalResult = await Api.json()
    console.log(finalResult)
    displayarea(finalResult)
}
function displayarea(a) {
    let cartona = ``
    for (let i = 0; i < a.meals.length; i++) {
        cartona += ` <div class="col-md-3 justify-content-center text-white" id="${a.meals[i].strArea}"   ">
           
           <div class="div text-center overflow-hidden ">
           <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
           <h4 class="text-white">${a.meals[i].strArea}</h4>
            
        
        </div>
        </div>
        
    `
        console.log();
    }
    document.getElementById('show').innerHTML = cartona

    document.querySelectorAll(".col-md-3 ").forEach((item) => {
        item.addEventListener("click", () => {
            const id = item.id;
            console.log(id);
            showdetailsarea(id)
        })
    })
}
async function showdetailsarea(id) {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
    var finalResult = await Api.json()
    console.log(finalResult)
    display(finalResult)
}

// ......................................................................................................












// ......................................................................................................
$('#search').click(function () {
    $('#show div').fadeOut(100)
display(null)
    $(".loading").fadeIn(10)

    $('.search').fadeIn(100)
    nav.closeNav()
    $(".loading").fadeOut(300)

    console.log('abc');
    firstsearch()
    threesearch()

})




function keyDown () {
    var max = 1;
    $("#searchbyfirstletter").keydown(function (e) {
        var length = $(this).val().length;
  
        console.log(length);
        console.log(e.key);
        if(length>=1){
        if (e.key !=("Backspace")) {
    e.preventDefault()
  }
  else{
    length--
  }}
        
    })}
  
  




function firstsearch() {

    var searchInput = document.getElementById("searchbyfirstletter")




keyDown()
    searchInput.addEventListener("keyup", function (eventInfo) {
        console.log(searchInput.value);
        let m = searchInput.value
        if (m.length == 0) {
            getApi()
        }
        else if (m.length > 0) {

            $(".loading").fadeIn(100)

            searchbyfirst(m)
        }
    }
    )
}
async function searchbyfirst(ii) {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${ii}`)
    var finalResult = await Api.json()
    console.log(finalResult)
    display(finalResult)
    
    $(".loading").fadeOut(100)


}

function threesearch() {

    var searchInput = document.getElementById("searchbythree")
    searchInput.addEventListener("keyup", function (eventInfo) {
        console.log(searchInput.value);
        let m = searchInput.value
        if (m.length == 0) {
            getApi()
        }
        else if (m.length > 0) {

            searchbythree(m)
        }
    }
    )
}
async function searchbythree(ii) {
   
    $(".loading").fadeIn(100)

    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ii}`)
    var finalResult = await Api.json()
    console.log(finalResult)
    if (finalResult.meals == null){
       
        $(".loading").fadeOut(100)
    display(null)        
    }
    else{

        display(finalResult)
        $(".loading").fadeOut(100)
    
    }

}

// ......................................................................................................








// ......................................................................................................

$('#ingredients').click(function () {

    $('.search').fadeOut(100)
    $(".loading").fadeIn(10)

    nav.closeNav()
    $('.container .col-md-3').fadeOut(100)
    console.log('abc');
    showingredients()
})
async function showingredients() {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    var finalResult = await Api.json()
    console.log(finalResult)
    displayingredients(finalResult)

    $(".loading").fadeOut(300)

}


function displayingredients(a) {
    let cartona = ``
    for (let i = 0; i < 20; i++) {
        cartona += `    <div class="col-md-3 justify-content-center text-white" id="${a.meals[i].strIngredient}"   ">
           
           <div class="div text-center overflow-hidden ">
           <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>  
           <h4 class="text-white">${a.meals[i].strIngredient}</h4>
           <p id="" class="long-text text-white">${a.meals[i].strDescription}</p>
        
           </div>
        </div>
        `
        console.log();
    }


    document.getElementById('show').innerHTML = cartona


    for (let i = 0; i < 20; i++) {

        var para = document.querySelectorAll(".long-text")[i];
        var text = para.innerHTML;
        para.innerHTML = "";
        var words = text.split(" ");

        for (let i = 0; i < 15; i++) {
            para.innerHTML += words[i] + " ";
        }
    }
    document.querySelectorAll(".col-md-3 ").forEach((item) => {

        item.addEventListener("click", () => {
            const id = item.id;
            console.log(id);
            showdetailsingredients(id)

        })
    })
}



async function showdetailsingredients(id) {
    var Api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`)
    var finalResult = await Api.json()
    console.log(finalResult)
    display(finalResult)
}

// ......................................................................................................













// ......................................................................................................
$('#contact').click(function () {
    $('.search').fadeOut(100)
    $(".loading").fadeIn(10)
    nav.closeNav()
    $('.container .col-md-3').fadeOut(100)
    console.log('abc');
    displaycontact();
    $(".loading").fadeOut(300)
})

function displaycontact() {
    let cartona = ``
    cartona += `      
        <div class="contain ps-5  m-auto">
            <div class="row opacity-100 gy-3 mt-5 ">
                <div class="col-md-6">
                    <input type="text" id="nameInput" placeholder="enter your Name" class="form-control bg-white ">
                    <div id="nameMsg" class="msg d-none text-center  w-75 m-auto ">
                    Special characters and numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input type="text" id="emailInput" placeholder="enter your email" class="form-control bg-white ">
                    <div id="emailMsg" class="msg d-none text-center  w-75 m-auto">
                    Email not valid *exemple@yyy.zzz
                    </div>
                </div>
            <div class="col-md-6">
            <input type="text" id="phoneInput" placeholder="enter your Phone number" class="form-control bg-white ">
            <div id="phoneMsg" class="msg d-none text-center  w-75 m-auto">
            Enter valid Phone Number
            </div>
        </div>
    <div class="col-md-6">
    <input type="number" id="ageInput" placeholder="enter your Age" class="form-control bg-white ">
    <div id="ageMsg" class="msg d-none text-center  w-75 m-auto">
    Enter valid age
    </div>
</div>
<div class="col-md-6">
<input type="password" id="passInput" placeholder="enter your Password" class="form-control bg-white ">
<div id="passMsg" class="msg d-none text-center  w-75 m-auto">
Enter valid password *Minimum eight characters, at least one letter and one number:*
</div>
</div>
<div class="col-md-6">
<input type="password" id="repassInput" class="form-control bg-white " placeholder="repassword">
<div id="repassMsg" class="msg d-none text-center  w-75 m-auto">
Enter valid repassword
</div>
</div>
<button id="submit" disabled class="mt-4">submit</button>
                       </div>
    </div>   
  `
    document.getElementById('show').innerHTML = cartona
    document.querySelector("#nameinput").addEventListener("keyup", Validation.validName)
    document.querySelector("#emailinput").addEventListener("keyup", Validation.validEmail)
    document.querySelector("#ageinput").addEventListener("keyup", Validation.validAge)
    document.querySelector("#passinput").addEventListener("keyup", Validation.validpass)
    document.querySelector("#repassinput").addEventListener("keyup", Validation.validRepass)
    document.querySelector("#Phoneinput").addEventListener("keyup", Validation.validphone)
    document.querySelectorAll(".contain input").forEach((item) => {
        item.addEventListener("keyup", () => {
            if (Validation.checkName() && Validation.checkAge() && Validation.checkEmail() && Validation.checkphone() && Validation.checkpass() && Validation.checkRepass()) {
                document.getElementById('submit').removeAttribute('disabled')
            }
            else {
                document.getElementById('submit').setAttribute('disabled', '')
            }
        })
    })
}










class Validation {
    
    static validName() {
        var nameRegex = /^[a-zA-Z ]+$/
        let x = document.getElementById("nameInput")
        if (nameRegex.test(x.value)) {
            document.getElementById('nameMsg').classList.add('d-none')
            return true
        }
        else {
            document.getElementById('nameMsg').classList.remove('d-none')
            return false
        }
    }
    static checkName() {
        var nameRegex = /^[a-zA-Z ]+$/
        let x = document.getElementById("nameInput")
        if (nameRegex.test(x.value)) {
            return true
        }
        else {
            return false
        }
    }
    static validEmail() {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let x = document.getElementById("emailInput")
        if (emailRegex.test(x.value)) {
            document.getElementById('emailMsg').classList.add('d-none')
            return true;
        }
        else {
            document.getElementById('emailMsg').classList.remove('d-none')

            return false;
        }
    }
    static checkEmail() {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let x = document.getElementById("emailInput")
        if (emailRegex.test(x.value)) {
            return true;
        }
        else {
            return false;
        }
    }
    static validphone() {
        var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        let x = document.getElementById("phoneInput")
        if (phoneRegex.test(x.value)) {
            document.getElementById('phoneMsg').classList.add('d-none')
            return true;
        }
        else {
            document.getElementById('phoneMsg').classList.remove('d-none')
            return false
        }
    }

    static checkphone() {
        var phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        let x = document.getElementById("phoneInput")
        if (phoneRegex.test(x.value)) {
            return true;
        }
        else {

            return false
        }
    }



    static validAge() {
        var ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
        let x = document.getElementById("ageInput")
        if (ageRegex.test(x.value)) {
            document.getElementById('ageMsg').classList.add('d-none')

            return true;
        }
        else {
            document.getElementById('ageMsg').classList.remove('d-none')
            return false
        }
    }
    static checkAge() {
        var ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
        let x = document.getElementById("ageInput")
        if (ageRegex.test(x.value)) {
            return true;
        }
        else {
            return false
        }
    }
    static validpass() {
        var passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        let x = document.getElementById("passInput")
        if (passRegex.test(x.value)) {
            document.getElementById('passMsg').classList.add('d-none')
            return true;
        }
        else {

            document.getElementById('passMsg').classList.remove('d-none')
            return false
        }
    }
    static checkpass() {
        var passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        let x = document.getElementById("passInput")
        if (passRegex.test(x.value)) {

            return true;
        }
        else {

            return false
        }
    }
    static validRepass() {
        let x = document.getElementById("passInput")
        let y = document.getElementById("repassInput")
        if (x.value == y.value) {

            document.getElementById('repassMsg').classList.add('d-none')
            return true;
        }
        else {
            document.getElementById('repassMsg').classList.remove('d-none')
            return false
        }
    }
    static checkRepass() {
        let x = document.getElementById("passInput")
        let y = document.getElementById("repassInput")
        if (x.value == y.value) {

            return true;
        }
        else {
            return false
        }
    }
}
// ......................................................................................................
