function onInput(el) {
    console.log(el.value);

    // Відправка введених даних на сервер
    fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: el.value }),
    }).then(response => response.text())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}
