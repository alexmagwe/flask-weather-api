document.addEventListener('DOMContentLoaded', () => {
    var xhttp = new XMLHttpRequest();
    var weather = document.getElementById('info');
    var city_name = document.getElementsByClassName("city-name")[0];
    var form = document.querySelector("#form");



    form.onsubmit = () => {
        var icon = weather.children[1];
        console.log(icon)
        var city = document.getElementById('cities').value;
        xhttp.onload = () => {
            const resp = JSON.parse(xhttp.responseText);
            if (resp != '1') {
                form.reset();
                let pic = document.createElement('img');
                let desc = weather.children[3];
                let temp = weather.children[2];
                pic.className = 'icon';
                pic.src = `/static/images/${resp.icon}.svg`;
                console.log(resp.icon)
                weather.replaceChild(pic, icon);
                city_name.innerHTML = resp.city;
                temp.innerHTML = `Temperature is ${resp.temp} deg`;
                desc.innerHTML = resp.description;

            } else {
                weather.childNodes[0].innerHTML = 'Cant access that city\'s weather';
            }
        }


        const data = new FormData();
        data.append('city', city);
        xhttp.open('POST', '/weather', true);
        xhttp.send(data);
        return false;
    }

})