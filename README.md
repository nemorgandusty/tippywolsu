В низ кода

<!--    <script type="text/javascript" src="./js/neuron.js"></script>	-->
	<!-- Подключаем Tippy через CDN -->
	<script src="https://unpkg.com/@popperjs/core@2"></script>
	<script src="https://unpkg.com/tippy.js@6"></script>

	<!-- Конфиг тултипа -->
	<script src="js/tooltip.js"></script>
	<!--Остальное-->
    <script type="text/javascript" src="./js/fslightbox.js" defer></script>
    <div id="notification" style="display: none;"></div>


!!! РАБОТАЕТ ТОЛЬКО С КЛАССАМИ-АЙДИШНИКАМИ !!! 
Обязательно присвоить к обьекту куда нужен тултип, одиночный класс или ид и подключить его через .js

Настройка:
Ищем // Инициализация конкретных элементов

Схема определения из html следующая:
initTippy('.класс', el => el.getAttribute('откуда брать информацию'));
Т.е initTippy('.avatarcds', el => el.getAttribute('alt')); --> мы берем из класса avatarcds данные alt`а т.е что прописано в alt="" в html, будет подключено в тултип!
Либо
initTippy('#ид', el => el.атрибут || el.getAttribute('атрибут'));
Т.е initTippy('#searchtext', el => el.value || el.getAttribute('value')); --> берем из searchtext значение поля value, например value="введите запрос"


