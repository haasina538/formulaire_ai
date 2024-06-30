document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('message');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
  
     // Data validation
      if (name === '' || email === '') {
        message.textContent = 'Please fill out all fields.';
        return;
      }
  
      if (!isValidEmail(email)) {
        message.textContent = 'Invalid email address.';
        return;
      }
  
      // Form submission if validation passes
      sendDataToServer(name, email);
    });
  
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function sendDataToServer(name, email) {
      fetch('http://localhost:3000/submit', { // Make sure the URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data); // Check the server response in the console
        message.textContent = data.message;
        form.reset(); // Reset the form after successful submission
      })
      .catch(error => {
        console.error('Error:', error);
        message.textContent = 'Error submitting data.';
      });
    }
  });