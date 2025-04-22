// 1. Настройка Tippy с гарантированным скрытием
tippy.setDefaultProps({
    delay: [100, 200],
    animation: 'fade',
    theme: 'material',
    moveTransition: 'transform 0.2s ease-out',
    hideOnScroll: false, // Критически важно

    onShow(instance) {
        instance._isHovered = true;
        clearTimeout(instance._scrollTimer);
    },

    onHide(instance) {
        instance._isHovered = false;
    }
});

// 2. Усовершенствованный обработчик скролла
let scrollState = {
    lastPos: window.scrollY,
    lastTime: Date.now(),
    timer: null,
    scrolling: false
};

window.addEventListener('scroll', () => {
    const now = Date.now();
    const currentPos = window.scrollY;

    // Рассчитываем скорость скролла
    const speed = Math.abs(currentPos - scrollState.lastPos) / (now - scrollState.lastTime);

    // Сбрасываем предыдущий таймер
    clearTimeout(scrollState.timer);

    // Для любого скролла запускаем скрытие
    scrollState.scrolling = true;
    scrollState.timer = setTimeout(() => {
        if (scrollState.scrolling) {
            hideAllTippies();
            scrollState.scrolling = false;
        }
    }, speed > 0.3 ? 0 : 1000); // Быстрый скролл - сразу, медленный - через 1 сек

    scrollState.lastPos = currentPos;
    scrollState.lastTime = now;
});

// 3. Надежная функция скрытия
function hideAllTippies() {
    const instances = tippy.group(document.querySelectorAll('[data-tippy-root]'));
    instances.forEach(instance => {
        if (instance.state.isShown && !instance._isHovered) {
            instance.hide();
        }
    });
}

// 4. Инициализация с проверкой элементов
function initTippy(selector, contentFn) {
    document.querySelectorAll(selector).forEach(el => {
        if (!el._tippy) {
            tippy(el, {
                content: contentFn(el),
                  onMount() {
                      // Гарантированная очистка при удалении элемента
                      const observer = new MutationObserver(() => {
                          if (!document.contains(el)) {
                              this.destroy();
                              observer.disconnect();
                          }
                      });
                      observer.observe(document.body, {childList: true, subtree: true});
                  }
            });
        }
    });
}

// Инициализация конкретных элементов
initTippy('.avatarcds', el => el.getAttribute('alt'));
initTippy('.fa-light.fa-check-circle', el => {
    const title = el.getAttribute('title');
    el.removeAttribute('title');
    return title;
});
initTippy('#searchtext', el => el.value || el.getAttribute('value'));

// 5. Ленивая загрузка с делегированием событий
document.body.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-tippy-content]');
    if (target && !target._tippy) {
        tippy(target, {
            content: target.getAttribute('data-tippy-content')
        });
    }
}, {capture: true});
