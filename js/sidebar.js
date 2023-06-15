let lists = document.querySelectorAll('.menu-links li');
let sidebar = document.querySelector('.sidebar');
let toggle = document.querySelector('.toggle');
let contents = document.querySelectorAll('.content');

lists.forEach(list => {
    list.addEventListener('click', function(){
        let tab = list.getAttribute('data-tab');
        let content = document.getElementById(tab);

        lists.forEach(list => {
            list.classList.remove('current');
        });
        contents.forEach(content => {
            content.classList.remove('current');
        });

        list.classList.add('current');
        content.classList.add('current');
    });
});

toggle.addEventListener('click', function(){
    sidebar.classList.toggle('close');
});