const modal = document.getElementById('modal');
const modalnya = modal.querySelector('div:first-child');

modal.addEventListener('click',(e)=>{
    modal.classList.toggle('hidden')
})

modalnya.addEventListener('click',(e)=>{
    e.stopPropagation();
})