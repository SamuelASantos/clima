document.querySelector('.busca').addEventListener('submit', async (event) =>{ // Seleciona a classe 'busca' e adiciona um evento como função. async -> Informa que não é uma função ordenada
    event.preventDefault(); // Previne o comportamento padrão que o formulário deveria ter

    let input = document.querySelector('#searchInput').value; // Capturo o valor do input com id 'searchInput'

    if (input !== '') {
        clearInfo(); // Função para 'limpar' os elementos da tela
        showWarning('Carregando...');

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d60b8d6965ae3203edc89ada1bc29db4&units=metric&lang=pt_br`; // encodeURI -> Formata da forma de URL convertendo espaços em caracteres especiais

        let results = await fetch(url); // Espera a resposta da requisição
        let json = await results.json(); // Espera que o resultado seja transformado em JSON

        if (json.cod === 200) { // 200 -> Código gerado quando a requisição foi feita com sucesso
            showInfo({ // Montando um objeto com os itens que realmente me importam
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }

});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}