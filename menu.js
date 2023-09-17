document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-menu");
    const mobileMenu = document.getElementById("mobile-menu");

    // ������� ��� �������� ��������� ����
    function createMenu(menuData, parent, isRoot = false) {
        const menuList = document.createElement("ul");

        // ��������� ����� "active" ��� ��������� ul
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
                toggleArrow.textContent = ">"; // ������� ��� ����������� �������
                toggleArrow.classList.add("toggle-arrow");
                menuItem.appendChild(toggleArrow);

                // ��������� ���������� ������� ��� ����� �� �������
                toggleArrow.addEventListener("click", (e) => {
                    e.preventDefault(); // ������������� ������� �� ������

                    // �������� ��� �������, ����� ��������
                    const mobileMenu = document.querySelector("#mobile-menu");
					const allSubMenus = mobileMenu.querySelectorAll("ul");
                    allSubMenus.forEach(sub => {
                        if (sub !== subMenu) {
                            sub.classList.remove("active");
                        }
                    });

                    subMenu.classList.toggle("active"); // �������� ������� ������� ��� ��������
                });
            }
			menuList.appendChild(menuItem);
        });

        parent.appendChild(menuList);
        return menuList;
    }

    // ������ ������ ���� � ������� (�������� �� �������� URL)
    fetch("http://localhost:3000/menu")
        .then(response => response.json())
        .then(data => {
            createMenu(data, mobileMenu, true); // �������� ���� isRoot ��� ��������� ul
        });

    // ��������/������ ��������� ����
    toggleButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });
});
