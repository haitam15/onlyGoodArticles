module.exports.sortArticle = function(articles) {
    let goodArticles = [...articles];
    let temp;
    for(let i=0;i<goodArticles.length-1;i++) {
        let max = i;
        for(let j=i+1;j<goodArticles.length;j++) {
            if (goodArticles[j].rate>goodArticles[max].rate)
                max = j;
        }
        if (max!=i) {
            temp = goodArticles[i];
            goodArticles[i] = goodArticles[max];
            goodArticles[max] = temp;
        }
    }
    return goodArticles;
}