// Select elements from HTML
const catFact = document.getElementById("fact");
const button = document.getElementById("getFactBtn");
const factHistoryList = document.getElementById("factHistory");

// Load previous facts from local storage on page load
loadPreviousFacts();

// Add an event listener to the button
button.addEventListener("click", getCatFact);

// Function to fetch and store cat facts
function getCatFact() {
  const apiURL = "https://catfact.ninja/fact";
  catFact.textContent = "Loading a cat fact...";

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const newFact = data.fact;
      catFact.textContent = newFact;

      // Save fact to local storage
      saveFactToLocalStorage(newFact);

      // Update the UI list
      addFactToList(newFact);
    })
    .catch(error => {
      catFact.textContent = "Oops! There was an error loading the cat fact.";
      console.error("Error loading the page:", error);
    });
}

// Save the fact in local storage
function saveFactToLocalStorage(fact) {
  // Get existing facts or start with an empty array
  const existingFacts = JSON.parse(localStorage.getItem("catFacts")) || [];

  // Add the new fact
  existingFacts.push(fact);

  // Store back in local storage
  localStorage.setItem("catFacts", JSON.stringify(existingFacts));
}

// Load facts on page load
function loadPreviousFacts() {
  const storedFacts = JSON.parse(localStorage.getItem("catFacts")) || [];
  storedFacts.forEach(fact => addFactToList(fact));
}

// Add a fact to the UI list
function addFactToList(fact) {
  const li = document.createElement("li");
  li.textContent = fact;
  li.style.listStyle ="none"
  factHistoryList.appendChild(li);
}
