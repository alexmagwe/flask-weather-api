document.addEventListener('DOMContentLoaded', () => {
    let xhttp = new XMLHttpRequest();
    const weather = document.getElementById('info');
    const city_name = document.getElementsByClassName("city-name")[0];
    const form = document.querySelector("#form");



    form.onsubmit = () => {
        weather.style.visibility = 'hidden';
        const icon = weather.children[1];
        const city = document.getElementById('cities').value;
        weather.style.opacity = '0';
        const desc = weather.children[3];
        const temp = weather.children[2];

        xhttp.onload = () => {
            weather.style.visibility = 'visible';
            const resp = JSON.parse(xhttp.responseText);
            if (resp != '1') {
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
                city_name.innerHTML = 'Cant access that city\'s weather';
                weather.style.opacity = '1';
            desc.innerHTML ='';
            temp.innerHTML='';
             weather.children[1].src='#';
             weather.children[1].style.display='none';


            }

        }
        

        validate=()=>{
                            console.log(city)
            let pat=/[A-z]/i
           let match=pat.test(city)
            if (match){
        const data = new FormData();
        data.append('city', city);
        xhttp.open('POST', '/weather', true);
        xhttp.send(data);
        return false;}
        else{ 
            weather.style.visibility = 'visible';
            city_name.innerHTML='enter a valid city';
            desc.innerHTML ='';
            temp.innerHTML='';
             weather.children[1].src='#';
             weather.children[1].style.display='none';
		
            weather.style.opacity = '1';
           
        
            return false;
        }
    
            
        }
        
        validate()
        return false;

    }
    

})
