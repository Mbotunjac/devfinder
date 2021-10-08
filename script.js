//variables
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const searchbar = document.querySelector('.form-control');
const content = document.getElementById('content');
const root = document.documentElement.style;
const baseUrl = 'https://api.github.com/users/';
const toggleDarkModeButton = document.querySelector('#toggle-dark-mode');
const input = document.getElementById('search');

const noResults = document.getElementById('no-results');
const toggleText = document.getElementById("toggle-text");
const icon = document.getElementById("icon");
const submit = document.getElementById('submit');
const fullname = document.getElementById('name');
const username = document.getElementById('username');
const avatar = document.getElementById("avatar");
const dateJoined = document.getElementById('date-joined');
const bio = document.getElementById('bio');
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const city = document.getElementById("city");
const website = document.getElementById("website");
const twitter = document.getElementById("twitter");
const company = document.getElementById("company");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function setDarkModeProperties() {
  root.setProperty('--lm-bg', '#141D2F');
  root.setProperty('--lm-bg-content', '#1E2A47');
  root.setProperty('--lm-text', 'white');
  root.setProperty('--lm-text-alt', 'white');
  root.setProperty('--lm-shadow-xl', 'rgba(70,88,109,0.15)');
  root.setProperty('--lm-bio-text', '#FFFFFF');
  root.setProperty('--lm-dev-text', '#FFFFFF');
  toggleText.innerText = 'LIGHT';
  icon.src = './images/icon-sun.svg';
  root.setProperty('--lm-icon-bg', 'brightness(1000%)');
}

function setLightModeProperties() {
  root.setProperty('--lm-bg', '#F6F8FF');
  root.setProperty('--lm-bg-content', '#FEFEFE');
  root.setProperty('--lm-text', '#4B6A9B');
  root.setProperty('--lm-text-alt', '#2B3442');
  root.setProperty('--lm-shadow-xl', 'rgba(70, 88, 109, 0.25)');
  root.setProperty('--lm-bio-text', '#4B6A9B');
  root.setProperty('--lm-dev-text', '#222731');
  toggleText.innerText = 'DARK';
  icon.src = './images/icon-moon.svg';
  root.setProperty('--lm-icon-bg', 'brightness(100%)');
}

// Pick light or dark mode depending on system preferences
if (prefersDarkScheme.matches) {
  document.body.classList.add("dark-theme");
  setDarkModeProperties();
} else {
  document.body.classList.remove("dark-theme");
  setLightModeProperties();
}

// Read the theme from the local storage
const currentTheme = localStorage.getItem('theme')
if (currentTheme == 'dark') {
  document.body.classList.toggle('dark-theme');
  setDarkModeProperties();
} else {
  document.body.classList.toggle('light-theme');
  setLightModeProperties();
}

// Change the theme on the button click
toggleDarkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  if (theme === 'dark') {
    setDarkModeProperties();
  } else {
    setLightModeProperties();
  }
  localStorage.setItem('theme', theme);
});

// Submit form
submit.addEventListener('click', async (e) => {
  e.preventDefault();
  if (input.value.trim() !== '') {
    await getUserData(input.value);
  }
})

input.addEventListener('keydown', async (e) => {

  if (!e) {
    var e = window.event;
  }

  if (e.key == "Enter" && input.value.trim() !== '') {
    await getUserData(input.value);
  }
}, false);

input.addEventListener('input', function () {

  noResults.style.display = "none"
  searchbar.classList.remove('active')
  searchbar.classList.add('active')
})

//functions
async function getUserData(githubUsername) {
  const response = await fetch(baseUrl + githubUsername);
  const data = await response.json();
  updateProfile(data);
}

function checkNull(param1, param2) {
  if ((param1 === "") || (param1 === null)) {
    param2.style.opacity = 0.5;
    param2.previousElementSibling.style.opacity = 0.5;
    return "Not available"
  }
  else {
    param2.style.opacity = 1;
    return param1
  }
}

function updateProfile(data) {
  if (data.message !== 'Not Found') {
    noResults.style.display = "none";

    avatar.src = data.avatar_url;
    fullname.innerText = data.name;
    username.innerText = `@${data.login}`;
    datesegments = data.created_at.split("T").shift().split("-");
    dateJoined.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`
    bio.innerText = (data.bio == null) ? "This profile has no bio" : `${data.bio}`
    repos.innerText = `${data.public_repos}`
    followers.innerText = `${data.followers}`
    following.innerText = `${data.following}`
    city.innerText = checkNull(data.location, city)
    website.innerText = checkNull(data.blog, website)
    twitter.innerText = checkNull(data.twitter_username, twitter)
    company.innerText = checkNull(data.company, company)
    searchbar.classList.toggle('active')
    content.classList.toggle('active')
  }
  else {
    noResults.style.display = "block";
  }
}

// Get initial user (Github Octocat)
getUserData('octocat');