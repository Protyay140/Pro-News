const apiKey = "7beba3fd18214ba5914e422612c1f2e4";
const url = "https://newsapi.org/v2/everything?q=";


const generateNews = async (query)=>{
    try{

        const res = await fetch(`${url}${query}&apiKey=${apiKey}`)
        const data = await res.json();
        // console.log(data);
        dataBind(data.articles);

    }catch(error){
        console.log(`Error : ${error}`);
    }
}

function dataBind(articles){
    const cardsContainer = document.querySelector("#cards-container");
    const cardsTemplate = document.querySelector("#template-news-card");

    cardsContainer.innerHTML ="";

    (articles || []).forEach(article=>{
        if(!article.urlToImage) return;
        const cardsClone = cardsTemplate.content.cloneNode(true);
        dataToCard(article,cardsClone);
        cardsContainer.appendChild(cardsClone);
    })
}

function dataToCard(article,card){
    const newsImage = card.querySelector("#news-image");
    const newsTitle = card.querySelector("#news-title");
    const newsSource = card.querySelector("#news-source");
    const newsDesc = card.querySelector("#news-desc");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    const date = new Date(article.publishedAt).toLocaleString();
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    newsDesc.innerHTML = article.description;

    card.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_blank');
    })
}

const button = document.querySelector('#search-button');

button.addEventListener('click',()=>{
    const newsInput = document.querySelector('#news-input');
    const data = newsInput.value;
    window.addEventListener("load",generateNews(data));
})

function clickNav(query){
    generateNews(query);
}

window.addEventListener("load",generateNews("india"));