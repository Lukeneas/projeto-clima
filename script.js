document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    //se input não for vazio...
    clearInfo();
    //limpe antes de aparecer carregando
    showWarning("carregando...");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=e602d167fc1b8bdca2641848a808095a&units=metric&lang=pt_br`
    //units=metric é um param puxado do site
    //req interna
    
    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200) {
      showInfo({
        name : json.name,
        country : json.sys.country,
        temp : Math.round(json.main.temp),
        tempIcon : json.weather[0].icon,
        windSpeed : json.wind.speed,
        windAngle : json.wind.deg
      })
    } else {
      //caso cod 404, limpe info
      clearInfo();
      // aviso
      showWarning('Not found location');
    }
  } else {
    //caso de Enter no vazio, limpará tudo, nem aparecerá aviso
    clearInfo();
  }
});

const showInfo = (json)=> {
  showWarning('');

  document.querySelector('.resultado').style.display = 'block';

  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`
}

const clearInfo = ()=> {
  showWarning('');
  document.querySelector('.resultado').style.display = 'none'; 
}

const showWarning = (msg) => (document.querySelector(".aviso").innerHTML = msg);
