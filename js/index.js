
const form = document.querySelector('form');


const get = async (resurs) => {
    const request = await fetch(resurs)
    const data = await request.json()
    console.log(data);
    return data
}
form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Formadan ma'lumotlarni olish
    const username = form.username.value;
    const password = form.password.value;

    get('https://json-g5ke.onrender.com/users').then((data) => {
        const dataArr = Array.from(data)
        dataArr.map(item => {

            if (item.user === username && item.password === password) {
                window.open('../sidebar.html' , '_self')
            }
            
        })
    })
});
