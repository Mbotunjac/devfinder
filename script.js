
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
const url = "https://api.github.com/users/:username";
const noResults = get ('no-results');
const toggle = get ("toggle-btn");
const toggleText = get ("toggle-text");
const icon = get ("icon");
const submit = get ("submit");
const input = get ("input");
const userName = get ("prf-name");
const user = get ("user");
const avatar = get ("avatar");
const date = get ("date");
const bio = get ("bio");
const repos = get ("repos");
const followers = get ("followers");
const following = get ("following");
const city = get ("city");
const website = get ("website");
const twitter = get ("twitter");
const company = get ("company");
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const darkMode = false; 



/*const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
*/

/*
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

*/




//btns
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
})  

//functions
function getUserData(gitUrl){
  fetch(gitUrl)
  .then(response => response.json())
  .then(data => {
      updateProfile(data)
  })
  .catch(error => {
      throw error;
  })
}
function updateProfile (data){
  if(data.message !== "Not Found"){
      noResults.style.display = "none";
      function checkNull(param1, param2) {
          if((param1 === "") || (param1 === null)){
              param2.style.opacity = 0.5;
              param2.previousElementSibling.style.opacity = 0.5;
              return "Not available" 
          }
          else{
              return `${param1}`
          }
      }
      avatar.src = `${data.avatar_url}`
      userName.innerText = `${data.name}`
      user.innerText = `@${data.login}`
      datesegments = data.created_at.split("T").shift().split("-")
      date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1]-1]} ${datesegments[0]}`
      bio.innerText = (data.bio == null)? "This profile has no bio" : `${data.bio}`
      repos.innerText = `${data.public_repos}`
      followers.innerText = `${data.followers}`
      following.innerText = `${data.following}`
      city.innerText = checkNull(data.city, city)
      website.innerText = checkNull(data.blog, website)
      twitter.innerText = checkNull(data.twitter, twitter)
      company.innerText = checkNull(data.company, company)
      searchbar.classList.toggle('active')
      content.classList.toggle('active')
  }
  else{
      noResults.style.display = "block";
  }
}
//dark mode default
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  darkModeProperties()
  
}
function darkModeProperties(){
  root.setProperty('--lm-bg', '#141D2F')
  root.setProperty('--lm-bg-content', '#1E2A47')
  root.setProperty('--lm-text', 'white')
  root.setProperty('--lm-text-alt', 'white')
  root.setProperty('--lm-shadow-xl', 'rgba(70,88,109,0.15)')
  toggleText.innerText = "LIGHT"
  icon.src = "/images/icon-sun.svg"
  root.setProperty('--lm-icon-bg', 'brightness(1000%)')
  darkMode = true
}
function lightModeProperties(){
  root.setProperty('--lm-bg', '#F6F8FF')
  root.setProperty('--lm-bg-content', '#FEFEFE')
  root.setProperty('--lm-text', '#4B6A9B')
  root.setProperty('--lm-text-alt', '#2B3442')
  root.setProperty('--lm-shadow-xl', 'rgba(70, 88, 109, 0.25)')
  toggleText.innerText = "DARK"
  icon.src = "./images/icon-moon.svg"
  root.setProperty('--lm-icon-bg', 'brightness(100%)')
  darkMode = false
}
content.classList.toggle('active')
searchbar.classList.toggle('active')
getUserData(url+"octocat");