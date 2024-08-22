function onInput(el) {
    console.log(el.value);

    // Надсилання введених даних на сервер
    fetch('/api/submit-input', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: el.value }),
    }).then(response => response.text())
      .then(data => console.log('Server response:', data))
      .catch(error => console.error('Error sending input data:', error));
}
