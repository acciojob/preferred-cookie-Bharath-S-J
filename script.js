//your JS code here. If required.
// Function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Function to set a cookie with a specified expiration time (in days)
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to apply font size and color from cookies
function applyPreferences() {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    document.documentElement.style.setProperty('--fontsize', `${savedFontSize}px`);
    document.getElementById('fontsize').value = savedFontSize;
  }

  if (savedFontColor) {
    document.documentElement.style.setProperty('--fontcolor', savedFontColor);
    document.getElementById('fontcolor').value = savedFontColor;
  }
}

// Event listener for form submission to save preferences
document.getElementById('preferences-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  // Save preferences in cookies
  setCookie("fontsize", fontSize, 30);  // Expires in 30 days
  setCookie("fontcolor", fontColor, 30);  // Expires in 30 days

  // Apply the changes immediately
  applyPreferences();
});

// Apply preferences when the page loads
window.onload = applyPreferences;
