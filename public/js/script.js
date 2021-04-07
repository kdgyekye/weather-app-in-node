const locationField = document.querySelector('.location');
const weatherForm = document.querySelector('.searchForm');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3');

const navLink = document.querySelector('.nav-link');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationField.value;
    const url = `/weather?address=${location}`;

    message2.textContent = null;
    message3.textContent = null;

    hr = document.querySelector('hr');
    hr.style.display = 'none';

    message1.textContent ='Loading Forecast Information...'
    fetch(url).then((response) => {
        hr.style.display = 'block'
        response.json().then((data) => {
            if(data.error) {
                message3.classList.add('text-danger')
                message3.textContent = data.error
            }
            else {
                message3.classList.remove('text-danger')
                message2.textContent = data.location
                message3.textContent = data.Forecast
            }
        })
    message1.textContent=null
    locationField.value=null;
    hr.style.display = 'none';
})
})

navLink.addEventListener('click', () => {
    navLink.classList.add('active')
})