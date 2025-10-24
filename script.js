// Select all OTP input boxes
const inputs = document.querySelectorAll('.code-container input.code');

// Loop through each input box and add event listeners
inputs.forEach((input, index) => {
    input.addEventListener('keydown', (e) => {
        // Allow only digits and backspace
        if ((e.key >= '0' && e.key <= '9') || e.key === 'Backspace') {

            // Handle backspace
            if (e.key === 'Backspace') {
                input.value = '';
                if (index > 0) {
                    inputs[index - 1].focus(); // move focus backward
                }
            } 
            // Handle number input
            else {
                input.value = e.key;
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus(); // move focus forward
                }
                e.preventDefault(); // prevent duplicate value
            }
        } else {
            e.preventDefault(); // block invalid keys
        }
    });

    // Optional: move to next automatically on input (for mobile)
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    // Optional: allow pasting full OTP
    input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').trim().slice(0, inputs.length);
        for (let i = 0; i < pasteData.length; i++) {
            if (inputs[i]) inputs[i].value = pasteData[i];
        }
        const nextIndex = Math.min(pasteData.length, inputs.length - 1);
        inputs[nextIndex].focus();
    });
});

// Automatically focus the first input on page load
window.addEventListener('load', () => {
    if (inputs.length > 0) inputs[0].focus();
});
