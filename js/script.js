// 1. EVENTS PAGE: CALCULATE TICKET COST

function calculateCost() {
  // Get the price and number of tickets
  var price = document.getElementById("price").value;
  var tickets = document.getElementById("tickets").value;
  var result = document.getElementById("result");

  // Convert the values into numbers
  price = Number(price);
  tickets = Number(tickets);

  // Check if the values are correct
  if (price <= 0 || tickets <= 0 || isNaN(price) || isNaN(tickets)) {
    result.style.color = "red";
    result.textContent =
      "Please enter a valid ticket price and number of tickets.";
  } else {
    // Calculate the total cost
    var total = price * tickets;

    result.style.color = "gold";
    result.textContent = "Total cost: R" + total.toFixed(2);
  }
}

// 2. EVENTS PAGE: SHOW OR HIDE TICKET INFORMATION

function toggleInfo() {
  // Get the information and button
  var info = document.getElementById("extraInfo");
  var button = document.getElementById("infoBtn");

  // Check if the information is hidden
  if (info.style.display == "none") {
    info.style.display = "block";
    button.textContent = "Hide Ticket Info";
  } else {
    info.style.display = "none";
    button.textContent = "Show Ticket Info";
  }
}

// 3. CONTACT PAGE: FORM VALIDATION

// This function displays an error message
function setError(fieldId, message) {
  var error = document.getElementById(fieldId + "Err");

  error.textContent = message;
  error.style.color = "red";
  error.style.display = "block";
}

// Get the contact form
var contactForm = document.getElementById("contactForm");

if (contactForm) {
  // Create a success message
  var success = document.createElement("p");

  success.style.color = "green";
  success.style.fontWeight = "bold";

  contactForm.appendChild(success);

  // Check the form when the user clicks submit
  contactForm.addEventListener("submit", function (event) {
    // Stop the page from refreshing
    event.preventDefault();

    // Clear the previous success message
    success.textContent = "";

    // Get the user's information
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();

    // Check if all the information is correct
    var valid = true;

    // Check the name
    if (name.length < 2) {
      setError("name", "Please enter your name.");
      valid = false;
    } else {
      setError("name", "");
    }

    // Check the email
    if (email.includes("@") == false || email.includes(".") == false) {
      setError("email", "Please enter a valid email address.");
      valid = false;
    } else {
      setError("email", "");
    }

    // Check the subject
    if (subject.length < 3) {
      setError("subject", "Please enter a subject.");
      valid = false;
    } else {
      setError("subject", "");
    }

    // Check the message
    if (message.length < 10) {
      setError("message", "Message must be at least 10 characters.");
      valid = false;
    } else {
      setError("message", "");
    }

    // If everything is correct
    if (valid == true) {
      success.textContent =
        "Thank you, " + name + "! Your message has been sent.";

      // Clear the form
      contactForm.reset();
    }
  });
}

// NAV BAR: SHOW DATE AND TIME

function updateDateTime() {
  // Get the current date and time
  var now = new Date();

  // Find the date and time in the HTML
  var date = document.getElementById("navDate");
  var time = document.getElementById("navTime");

  // Display the date
  if (date != null) {
    date.textContent = now.toLocaleDateString("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Display the time
  if (time != null) {
    time.textContent = now.toLocaleTimeString("en-ZA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }
}

// Show the date and time immediately
updateDateTime();

// Update the time every second
setInterval(updateDateTime, 1000);

// 5. DARK MODE: LIGHT / DARK MODE SWITCH

// Read the saved theme from local storage (light mode by default)
function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (error) {
    return null;
  }
}

// Save the theme so it stays on the next page
function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Local storage may be blocked - the switch still works on this page
  }
}

// Show the theme on the page and update the button text
function applyTheme(theme, button) {
  var isDark = theme === "dark";

  // The body.dark class is already styled in the CSS file
  document.body.classList.toggle("dark", isDark);

  if (button != null) {
    button.textContent = isDark ? "Light mode" : "Dark mode";
    button.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

// Create the switch button next to the time in the navigation bar
function createThemeSwitch() {
  var time = document.getElementById("navTime");

  if (time == null || time.parentNode == null) {
    return;
  }

  // Group the time and the button together on the right of the nav bar
  var group = document.createElement("span");
  group.className = "nav-right";
  time.parentNode.insertBefore(group, time);
  group.appendChild(time);

  var button = document.createElement("button");
  button.type = "button";
  button.className = "dark-toggle";
  group.appendChild(button);

  // Start with the saved theme (light mode if nothing was saved yet)
  var theme = getSavedTheme() === "dark" ? "dark" : "light";
  applyTheme(theme, button);

  // Switch between light and dark mode when the button is clicked
  button.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(theme, button);
    saveTheme(theme);
  });
}

// Add the switch to every page that has a navigation bar
if (document.getElementById("navDate") != null) {
  createThemeSwitch();
}
