function showPopups() {
    const popups = document.querySelectorAll('.popup');
    let delay = 1000; // Задержка между окнами

    popups.forEach((popup, index) => {
        setTimeout(() => {
            popup.style.display = 'block';
        }, delay * index);
    });
}

// Закрытие всплывающего окна
function closePopup(id) {
    const popup = document.getElementById(id);
    popup.style.display = 'none';
}

// Сомнительная реклама
function createDodgyAd() {
    const adContainer = document.getElementById('dodgyAds');
    const ad = document.createElement('div');
    ad.className = 'dodgy-ad';

    const images = [
        'img/pilesos.jpg',
        'img/korovi.jpg',
        'img/денскорова.gif',
        'img/добри.gif'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    ad.innerHTML = `
        <img src="${randomImage}" alt="Сомнительная реклама">
        <span class="close" onclick="this.parentElement.remove()">×</span>
    `;

    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    ad.style.left = `${x}px`;
    ad.style.top = `${y}px`;

    adContainer.appendChild(ad);
}

function showDodgyAds() {
    setInterval(createDodgyAd, 5000);
}

window.onload = () => {
    showPopups();
    showDodgyAds();
};