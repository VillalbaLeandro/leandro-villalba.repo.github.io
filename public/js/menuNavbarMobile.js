const linkItems = document.querySelectorAll(".link-item");
const indicator = document.querySelector(".indicator");

linkItems.forEach((linkItem, index) => {
    linkItem.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        linkItem.classList.add("active");

        const indicator = document.querySelector(".indicator");

        indicator.style.left = `${index * 65 + 11}px`;
    })
})


document.addEventListener("DOMContentLoaded", () => {
    const linkItems = document.querySelectorAll(".link-item");

    linkItems.forEach((linkItem, index) => {
        linkItem.addEventListener("click", (e) => {
            e.preventDefault();

            document.querySelector(".active").classList.remove("active");
            linkItem.classList.add("active");

            const targetId = linkItem.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });
});


// Función para actualizar la posición del indicador al desplazarse
// function updateIndicatorPosition() {
//     const scrollPosition = window.scrollY;
//     const windowHeight = window.innerHeight;

//     linkItems.forEach((linkItem, index) => {
//         const sectionId = linkItem.getAttribute("href").replace("#", "");
//         const section = document.getElementById(sectionId);

//         if (section.offsetTop <= scrollPosition + windowHeight * 0.5 && section.offsetTop + section.offsetHeight > scrollPosition + windowHeight * 0.5) {
//             document.querySelector(".active").classList.remove("active");
//             linkItem.classList.add("active");

//             indicator.style.left = `${index * 65 + 11}px`;
//         }
//     });
// }

// window.addEventListener("scroll", updateIndicatorPosition);