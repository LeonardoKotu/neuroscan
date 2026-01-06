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
const langFlag = document.querySelector('.lang-flag');
const langCode = document.querySelector('.lang-code');
const htmlElement = document.getElementById('html');

let currentLang = 'ru';

langSwitch.addEventListener('click', () => {
    // Переключение языка
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    
    // Обновление отображения переключателя
    langFlag.textContent = currentLang === 'ru' ? '🇷🇺' : '🇺🇸';
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
            // Для input, textarea, select меняем placeholder, для остальных - textContent
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = langData[key];
            } else if (element.tagName === 'SELECT') {
                // Для select обновляем option тексты
                if (key === 'contact.formRole') {
                    const options = element.querySelectorAll('option');
                    if (lang === 'en') {
                        options[0].textContent = '';
                        options[1].textContent = 'Radiologist';
                        options[2].textContent = 'Oncologist';
                        options[3].textContent = 'Clinic Administrator';
                        options[4].textContent = 'Other';
                    } else {
                        options[0].textContent = '';
                        options[1].textContent = 'Врач-рентгенолог';
                        options[2].textContent = 'Врач-онколог';
                        options[3].textContent = 'Администратор клиники';
                        options[4].textContent = 'Другое';
                    }
                }
            } else {
                element.textContent = langData[key];
            }
        }
    });
}

// Анимация появления при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                    
                    // Запуск счетчиков для count-up анимации
                    if (animationType === 'count-up') {
                        const counters = element.querySelectorAll('.counter');
                        counters.forEach(counter => {
                            const target = parseInt(counter.getAttribute('data-count'));
                            const duration = 2000;
                            const step = target / (duration / 16); // 60fps
                            let current = 0;
                            
                            const timer = setInterval(() => {
                                current += step;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(timer);
                                }
                                counter.textContent = Math.floor(current);
                            }, 16);
                        });
                    }
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// Анимация цифр в статистике героя
function initHeroStatsAnimation() {
    const statNumbers = document.querySelectorAll('[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-count'));
        const suffix = stat.nextElementSibling;
        let current = 0;
        const increment = target / 50; // Анимация за 50 шагов
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (suffix.classList.contains('percent')) {
                stat.textContent = current.toFixed(1);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Симуляция процесса сканирования
function initScanProcess() {
    const steps = document.querySelectorAll('.process-step');
    let currentStep = 0;
    
    setInterval(() => {
        steps.forEach(step => step.classList.remove('active'));
        steps[currentStep].classList.add('active');
        currentStep = (currentStep + 1) % steps.length;
    }, 2000);
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
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    btnText.textContent = currentLang === 'ru' ? 'Отправка...' : 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert(currentLang === 'ru' 
            ? 'Спасибо! Ваш запрос отправлен. Мы свяжемся с вами в течение 24 часов.' 
            : 'Thank you! Your request has been sent. We will contact you within 24 hours.');
        
        btnText.textContent = originalText;
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initHeroStatsAnimation();
    initScanProcess();
    
    // Запуск анимации через небольшую задержку для плавности
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 200);
        });
    }, 300);
});

// Параллакс эффект для фона
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-shape');
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});
