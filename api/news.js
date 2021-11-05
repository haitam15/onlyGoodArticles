const fetch = require('node-fetch');
const { rateArticle } = require('./nlu');

module.exports.getArticles = async function apiNews(keywordInput){
    res = await fetch(`https://newsapi.org/v2/top-headlines?q=${keywordInput}&apiKey=2e27f9ea281d4c7bb9bb5ddf961acda6`)
    data = await res.json();

    console.log(data)

    let output_ = []

    let rate;
    let rate0 = [];
    for (let i=0 ; i<data.articles.length ; i++) {
        if (output_.length===10)
            break;
        
        rate = await rateArticle( (data.articles[i].description!="") ? data.articles[i].description : data.articles[i].content)

        let new_news_item = {
            id: i,
            title : data.articles[i].title,
            image : data.articles[i].urlToImage,
            description : data.articles[i].description || data.articles[i].content,
            url : data.articles[i].url,
            rate : rate
        }


        if (rate===0)
            rate0.push(new_news_item.id);
        else 
            output_.push(new_news_item) ;

    }

    if (output_.length<10 && rate0.length) {
        rate0.forEach(rate0=>{
            output_.push(rate0);
        })
    }
    
    return output_;
    
}