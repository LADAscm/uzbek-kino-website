// Основные переменные
let currentLanguage = 'ru';
let currentTheme = 'light';

// Мультиязычность
const LANGUAGES = {
    ru: {
        title: "KinoBox - Онлайн Кинотеатр",
        searchPlaceholder: "Введите код фильма...",
        searchButton: "Найти фильм",
        movieNotFound: "Фильм не найден",
        movieFound: "Фильм найден!",
        totalUsers: "пользователей",
        totalMovies: "фильмов",
        todayViews: "просмотров сегодня",
        popularMovies: "Популярные фильмы",
        statistics: "Статистика",
        adminPanel: "Панель администратора",
        addMovie: "Добавить фильм",
        massUpdate: "Массовое обновление",
        broadcast: "Рассылка",
        templates: "Шаблоны",
        channelSettings: "Настройки канала"
    },
    uz: {
        title: "KinoBox - Online Kinoteatr",
        searchPlaceholder: "Film kodini kiriting...",
        searchButton: "Filmni topish",
        movieNotFound: "Film topilmadi",
        movieFound: "Film topildi!",
        totalUsers: "foydalanuvchi",
        totalMovies: "film",
        todayViews: "bugun ko'rish",
        popularMovies: "Mashhur filmlar",
        statistics: "Statistika",
        adminPanel: "Administrator paneli",
        addMovie: "Film qo'shish",
        massUpdate: "Ommaviy yangilash",
        broadcast: "Xabar yuborish",
        templates: "Shablonlar",
        channelSettings: "Kanal sozlamalari"
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSampleData();
    updateStats();
});

// Инициализация приложения
function initializeApp() {
    // Загрузка темы
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Загрузка языка
    const savedLanguage = localStorage.getItem('language') || 'ru';
    setLanguage(savedLanguage);
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация модальных окон
    initModals();
}

// Навигация
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Обновляем активную ссылку
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Прокрутка к секции
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Модальные окна
function initModals() {
    // Закрытие модальных окон при клике вне контента
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Поиск фильма
function searchMovie() {
    const codeInput = document.getElementById('movieCode');
    const resultDiv = document.getElementById('searchResult');
    const code = codeInput.value.trim();
    
    if (!code) {
        showNotification('Введите код фильма', 'warning');
        return;
    }
    
    // Имитация поиска в базе данных
    const movie = findMovieByCode(code);
    
    if (movie) {
        resultDiv.innerHTML =