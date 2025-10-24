// Select all OTP input boxes
// Select all input fields inside the box
const inputs = document.querySelectorAll('.box input');

inputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
        // Allow only digits
        if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            if (e.key === 'Backspace') {
                e.preventDefault(); // Prevent default behavior
                input.value = ''; // Clear current input
                // Move focus to previous input if exists
                if (index > 0) {
                    inputs[index - 1].focus();
                }
            } else if (e.key >= '0' && e.key <= '9') {
                input.value = ''; // Replace the current value
            }
        } else {
            e.preventDefault(); // Prevent non-digit input
        }
    });

    input.addEventListener('input', (e) => {
        const value = input.value;
        if (value.length > 0 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim().slice(0, inputs.length - index);
        for (let i = 0; i < pasteData.length; i++) {
            if (inputs[index + i]) {
                inputs[index + i].value = pasteData[i];
            }
        }
        const nextIndex = index + pasteData.length < inputs.length ? index + pasteData.length : inputs.length - 1;
        inputs[nextIndex].focus();
    });
});

// Automatically focus the first input on page load
window.addEventListener('load', () => {
    inputs[0].focus();
});



