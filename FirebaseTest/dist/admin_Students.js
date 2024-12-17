// Select the options form
const optionsForm = document.getElementById('options-form');

// Function to show the form with animation
function showOptionsForm() {
  optionsForm.classList.remove('hide'); // Remove hide class if it exists
  optionsForm.classList.add('show'); // Add the show class to play the fade-in animation
}

// Function to hide the form with animation
function hideOptionsForm() {
  optionsForm.classList.remove('show'); // Remove show class
  optionsForm.classList.add('hide'); // Add the hide class to play the fade-out animation

  // Optional: Delay removing pointer-events until the animation completes
  setTimeout(() => optionsForm.classList.remove('hide'), 400); // Matches animation duration
}

// Close the floating form when clicking outside
document.addEventListener('click', (e) => {
  // Check if the click is outside the form
  if (!optionsForm.contains(e.target) && !e.target.closest('#save-format-btn') && optionsForm.classList.contains('show')) {
    hideOptionsForm();
  }
});

// Example event listeners for buttons
document.getElementById('save-format-btn').addEventListener('click', (e) => {
  e.preventDefault();
  hideOptionsForm(); // Hide the form when saving
});

document.getElementById('close-options-btn').addEventListener('click', hideOptionsForm);
