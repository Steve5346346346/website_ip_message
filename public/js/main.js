document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Отримати IP-адресу користувача
        const userIP = await fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(result => result.ip)
            .catch(error => console.error("Error fetching IP address:", error));

        console.log("userIP", userIP);

        // Отримати інформацію про IP-адресу
        const userInfo = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=681d0da6629e4f439e0c7a637ddf7df4&ip=${userIP}`)
            .then(response => response.json())
            .catch(error => console.error("Error fetching IP info:", error));

        console.log("userInfo", userInfo);

        // Надіслати дані на сервер
        await fetch("/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ip: userIP,
                info: userInfo
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Server returned ${response.status}`);
            }
        }).catch(error => console.error("Error sending data to server:", error));

        // Вивести інформацію на сторінці
        const contentElement = document.getElementById("content");
        contentElement.innerHTML = `
            <p>Country: ${userInfo.country_name}</p>
            <p>Region: ${userInfo.state_prov}</p>
            <p>City: ${userInfo.city}</p>
            <p>IP: ${userInfo.ip}</p>
        `;
    } catch (error) {
        console.error("Error:", error);
    }
});
