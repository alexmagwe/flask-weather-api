document.addEventListener('DOMContentLoaded', () => {
    let xhttp = new XMLHttpRequest();
    const weather = document.getElementById('info');
    const city_name = document.getElementsByClassName("city-name")[0];
    const form = document.querySelector("#form");



    form.onsubmit = () => {
        weather.style.visibility = 'hidden';
        const icon = weather.children[1];
        console.log('im here', weather.style.visibility);
        const city = document.getElementById('cities').value;
        weather.style.opacity = '0';
        xhttp.onload = () => {
            weather.style.visibility = 'visible';
            const resp = JSON.parse(xhttp.responseText);
            if (resp != '1') {
                form.reset();
                let pic = document.createElement('img');
                let desc = weather.children[3];
                let temp = weather.children[2];
                pic.className = 'icon';
                pic.src = `/static/images/${resp.icon}.svg`;
                weather.replaceChild(pic, icon);
                city_name.innerHTML = resp.city;
                temp.innerHTML = `Temperature is ${resp.temp} deg`;
                desc.innerHTML = resp.description;
                weather.style.opacity = '1';


            } else {
                city_name.innerHTML = 'Cant access that city\'s weather';
                weather.style.opacity = '1';
                console.log(weather.style.opacity)


            }

        }


        const data = new FormData();
        data.append('city', city);
        xhttp.open('POST', '/weather', true);
        xhttp.send(data);
        return false;
    }

})