// Установка текущего года в футере
document.getElementById('currentYear').textContent = '2026';

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Смена языка
const langSwitch = document.getElementById('langSwitch');
const langCode = document.querySelector('.lang-code');
const htmlElement = document.getElementById('html');

let currentLang = 'ru';

langSwitch.addEventListener('click', () => {
    // Переключение языка
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    
    // Обновление отображения переключателя
    langCode.textContent = currentLang.toUpperCase();
    
    // Обновление атрибута lang у html
    htmlElement.lang = currentLang;
    
    // Применение переводов
    applyTranslations(currentLang);
});

// Функция применения переводов
function applyTranslations(lang) {
    // Получаем словарь для выбранного языка
    const langData = translations[lang];
    
    // Находим все элементы с data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        
        // Проверяем, существует ли перевод для этого ключа
        if (langData[key] !== undefined) {
            // Для input и textarea меняем placeholder, для остальных - textContent
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = langData[key];
            } else {
                element.textContent = langData[key];
            }
        }
    });
}

// Обработка формы
const demoForm = document.getElementById('demoForm');

demoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Простая валидация
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    if (!name || !email) {
        alert(currentLang === 'ru' 
            ? 'Пожалуйста, заполните обязательные поля' 
            : 'Please fill in required fields');
        return;
    }
    
    // Имитация отправки
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = currentLang === 'ru' ? 'Отправка...' : 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(currentLang === 'ru' 
            ? 'Спасибо! Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.' 
            : 'Thank you! Your request has been sent. We will contact you soon.');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.reset();
    }, 1500);
});

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Простая анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Наблюдаем за секциями
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Показываем первую секцию сразу
    document.querySelector('.hero').style.opacity = '1';
    document.querySelector('.hero').style.transform = 'translateY(0)';
});
