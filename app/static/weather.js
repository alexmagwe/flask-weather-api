document.addEventListener('DOMContentLoaded', () => {
    const weather = document.getElementById('info');
    const city_name = document.getElementsByClassName("city-name")[0];



   $('form').submit(function(e) {
	 e.preventDefault();
        weather.style.visibility = 'hidden';
        const icon = weather.children[1];
        const city = document.getElementById('cities');
        weather.style.opacity = '0';
        const desc = weather.children[3];
        const temp = weather.children[2];
	let info=$(city).serialize()
        $.get('/weather',info,(data)=>callback(data));
       const callback = (data) => {
            weather.style.visibility = 'visible';
	     const resp=data;
           if (resp['description']) {
                form.reset();
                let pic = document.createElement('img');
                pic.className = 'icon';
                pic.src = `/static/images/${resp.icon}.svg`;
                weather.replaceChild(pic, icon);
                city_name.innerHTML = resp.city;
                temp.innerHTML = `Temperature is ${resp.temp}&#176;`;
                desc.innerHTML = resp.description;
                weather.style.opacity = '1';

            } else {
                city_name.innerHTML = resp['message'];
                weather.style.opacity = '1';
            desc.innerHTML ='';
            temp.innerHTML='';
             weather.children[1].src='#';
             weather.children[1].style.display='none';
            }
         } })           
})
