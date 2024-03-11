const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const AuthorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function removeLoadingSpinner(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}


let apiQuotes=[];
function newQuote(){
    showLoadingSpinner();
    const qoute=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if(!qoute.author){
        AuthorText.textContent='UnKnown';
    }
    else{
        AuthorText.textContent=qoute.author;
    }
    if(qoute.text.length>50){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
//   set quote hide loading
    quoteText.textContent=qoute.text;
    removeLoadingSpinner();
}
//  get quote from API
async function getquote() {
    showLoadingSpinner();
    const apiurl='https://jacintodesign.github.io/quotes-api/data/quotes.json'

try{
 const response=await fetch(apiurl)
 apiQuotes =await response.json();
 newQuote()
}catch (error){
// catch erorr here
}
}

function tweetquote(){
 const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${AuthorText.textContent}`;
window.open(twitterUrl,'_blank')
}

// Eventlistner
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetquote);

// on load
getquote();

