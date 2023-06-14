let arrow = document.querySelector('.arrow');
arrow.addEventListener('click', (e) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle('showMenu');
});

let sidebar = document.querySelector('.sidebar');
let toggle = document.querySelector('.toggle');

toggle.addEventListener('click', function(){
    sidebar.classList.toggle('close');
});