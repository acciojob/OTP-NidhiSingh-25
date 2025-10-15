// Select all OTP input boxes
const inputs = document.querySelectorAll('.code');

// Loop through each input
inputs.forEach((input, index) => {
  // Dynamically assign IDs for Cypress or other tests
  input.id = `code-${index + 1}`;

  // Input event: allow only digits and auto-focus to next
  input.addEventListener('input', (e) => {
    // Remove anything that's not a number
    input.value = input.value.replace(/[^0-9]/g, '');

    // Move to next input automatically if current input is filled
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  // Keydown event: handle backspace to move focus to previous
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus();
      inputs[index - 1].value = ''; // Optional: clear previous input
    }
  });
});

// Auto-focus on the first input when page loads
inputs[0].focus();

