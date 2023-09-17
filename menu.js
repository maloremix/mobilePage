document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    // Функция для создания элементов меню
    function createMenu(menuData, parent, isRoot = false) {
        const menuList = document.createElement("ul");

        // Добавляем класс "active" для корневого ul
        if (isRoot) {
            menuList.classList.add("active");
        }

        menuData.forEach(itemData => {
            const menuItem = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = itemData.title;
            link.href = itemData.url;
			
			menuItem.appendChild(link);

            if (itemData.children) {
                menuItem.classList.add("menu-item");
                const subMenu = createMenu(itemData.children, menuItem);
                menuItem.appendChild(subMenu);
                const toggleArrow = document.createElement("span");
                toggleArrow.textContent = ">"; // Стрелка для раскрывания подменю
                toggleArrow.classList.add("toggle-arrow");
                menuItem.appendChild(toggleArrow);

                // Добавляем обработчик события для клика на стрелку
                toggleArrow.addEventListener("click", (e) => {
                    e.preventDefault(); // Предотвращаем переход по ссылке

                    // Скрываем все подменю, кроме текущего
                    const mobileMenu = document.querySelector("#mobile-menu");
					const allSubMenus = mobileMenu.querySelectorAll("ul");
                    allSubMenus.forEach(sub => {
                        if (sub !== subMenu) {
                            sub.classList.remove("active");
                        }
                    });

                    subMenu.classList.toggle("active"); // Помечаем текущее подменю как активное
                });
            }
			menuList.appendChild(menuItem);
        });

        parent.appendChild(menuList);
        return menuList;
    }

    // Запрос данных меню с сервера (замените на реальный URL)
    fetch("http://localhost:3000/menu")
        .then(response => response.json())
        .then(data => {
            createMenu(data, mobileMenu, true); // Передаем флаг isRoot для корневого ul
        });

    // Показать/скрыть мобильное меню
    toggleButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
});
