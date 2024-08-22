document.addEventListener("DOMContentLoaded", (event) => {
    fetchData();
});

async function fetchData() {
    try {
        // Отримання IP-адреси користувача
        const userIP = await fetch("https://api.ipify.org?format=json")
            .then(response => response.json());

        console.log("userIP", userIP);

        // Отримання інформації про користувача
        const userInfo = await fetch(`https://ip-api.com/json/${userIP.ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,proxy,hosting,query`)
            .then(response => response.json());

        console.log("userInfo", userInfo);

        const contentElement = document.getElementById("content");

        if (userInfo.countryCode === "UA") {
            contentElement.innerHTML = "Країна Україна";
        } else if (userInfo.proxy) {
            contentElement.innerHTML = `Вибач ти використовуєш VPN ${userInfo.country}`;
        } else {
            contentElement.innerHTML = "HELLO";
        }

        // Надсилання даних на сервер
        await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        }).then(response => response.text())
          .then(data => console.log('Server response:', data))
          .catch(error => console.error('Error sending data:', error));
    } catch (error) {
        console.error("Error fetching data", error);
    }
}
