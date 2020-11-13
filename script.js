const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
async function getQuote() {
    loading();
    let randNumber = Math.floor(Math.random() * 1644); 

    try{
    const res = await fetch("https://type.fit/api/quotes")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if(data[randNumber].author === null) {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = '_' + data[randNumber].author
        }

        if(data[randNumber].text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
            quoteText.innerText = data[randNumber].text+'"'
        });
    complete();
    } catch(error) {
        console.log("Whoops could not get the quote");
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

getQuote();
