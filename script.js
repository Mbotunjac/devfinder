
// light-dark mode depending on system pref. 

/*
if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
} else {
  document.body.classList.remove("dark-theme");
}
*/
//variables

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const searchbar = document.querySelector('.form-control');
const content = document.querySelector('content');
const root = document.documentElement.style;
const get = (param)=> document.getElementById('${param}');
const url = 'https://api.github.com/users/:username';
const noResults = get ('no-results');
const toggle = get ("toggle-btn");
const toggleText = get ("toggle-text");
const icon = get ("icon");
const submit = get ("submit");
const input = get ("input");
const name = get ("prf-name");
const user = get ("user");
const avatar = get ("avatar");
const date = get ("date");
const bio = get ("bio");
const repos = get ("repos");
const folowers = get ("folowers");
const folowing = get ("folowing");
const city = get ("city");
const website = get ("website");
const twitter = get ("twitter");
const company = get ("company");
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const darkMode = false; 



/*const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
*/

const currentTheme = localStorage.getItem("theme")
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");
} 

else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

toggle.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
  } 

  else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }

  localStorage.setItem("theme", theme);
});





/*//btns
submit.addEventListener('click', function(){

  if (input.value !== ""){
      getUserData(url+input.value);
  }
})

input.addEventListener("keydown", function(e) {

  if (!e) { 
      var e = window.event; 
  }

  if (e.key == "Enter") { 
      if (input.value !== ""){
          getUserData(url+input.value);
      }
  }
}, false);

input.addEventListener('input', function(){

  noResults.style.display = "none"
  searchbar.classList.remove('active')
  searchbar.classList.add('active')
})
toggle.addEventListener('click', function(){

  if(darkMode == false){
      darkModeProperties()
  }

  else{
      lightModeProperties()
  }
})  */