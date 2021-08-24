// This file handles the category highlighting in #productCategory

let categoriesAnchor = document.querySelectorAll('.categoryAnchor');
// console.log('categoriesAnchor:', categoriesAnchor);

for (let i = 0; i < categoriesAnchor.length; i++) {
  categoriesAnchor[i].addEventListener('click', function () {
    categoriesAnchor.forEach(function (el) {
      el.classList.remove('active');
    });
    categoriesAnchor[i].classList.add('active');
  });
}
