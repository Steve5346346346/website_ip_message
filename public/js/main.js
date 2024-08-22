async function fetchData() {
    try {
        // Отримання IP адреси користувача
        const userIP = await fetch("https://api.ipify.org?format=json")
            .then(response => response.json())
            .then(result => result.ip)
            .catch(error => {
                console.error("Ми не змогли знайти цю адресу", error);
                throw error;
            });

        console.log("userIP", userIP);

        // Запит до IP-API Batch
        const batchRequest = [{ query: userIP }];

        const userInfo = await fetch('https://ip-api.com/batch', {
            method: 'POST',
            body: JSON.stringify(batchRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => result[0])
        .catch(error => {
            console.error("Помилка під час отримання даних", error);
            throw error;
        });

        console.log("userInfo", userInfo);

        // Відображення даних на сторінці
        const contentElement = document.getElementById("content");

        if (userInfo.countryCode === "UA") {
            contentElement.innerHTML = "Країна";
        } else if (userInfo.proxy) {
            contentElement.innerHTML = `Вибач, ти використовуєш VPN з ${userInfo.country}`;
        } else {
            contentElement.innerHTML = "HELLO";
        }

        // Відправка даних на сервер
        await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });
    } catch (error) {
        console.error("Error in fetchData", error);
    }
}

// Запуск функції fetchData при завантаженні сторінки
window.addEventListener("load", fetchData);
