const express = require('express');
const path = require('path');
const { getArticles } = require('./api/news');
const { sortArticle } = require('./api/sort.js')
// const logger = require('./middleware/logger');
// const members = require('./Members');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.set('view engine', 'ejs');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Homepage Route
app.post("/",async (req,res) => {
    const articles = await getArticles(req.body.inputKeyword);
    console.log(articles)
    let goodArticles = sortArticle(articles);
    
    // console.log(goodArticles);
    res.render('index', {
        article : goodArticles
    })    
})

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
// app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

