var express = require("express");
var router = express.Router();
var request = require('request');
var helpers = require('handlebars-helpers')();
var cheerio = require("cheerio");
var scrapedResult = [];
var Article = require("../models/articles");
// ------------------------------
router.get("/", function(req, res) {
    var hbsObject = { pageTitle: "Home", articles: [] };
    res.render("index", hbsObject);
});

//------------------------------
router.get("/scrape", function(req, res) {
    var hbsObject = { pageTitle: "scraped articles", articles: [] };

    request("https://www.cnbc.com/technology/", function(error, response, html) {
        console.log("************* Scrape Started**********************")

        var $ = cheerio.load(html);
        $("div.cnbcnewsstory").each(function(i, element) {
            var divheadline = $(this).find("div.headline");
            var title = divheadline.text();
            var link = "https://www.cnbc.com" + divheadline.children().attr("href");
            var imageUrl = $(element).find("a").find("img").attr("data-img-src");
            scrapedResult.push({ title: title, link: link, imageUrl: imageUrl });
        });
        //console.log(result);
        console.log("************* Scrape Ended**********************")

        hbsObject.articles = scrapedResult;
        res.render("scrape", hbsObject);
    });
});

// --------------Saving the articles-----------------------
router.post("/save", function(req, res) {
    console.log("req.body\n" + JSON.stringify(req.body));
    res.render("/scrape", {});

    var article = req.body;
    Article.saveArticle(article, function(err, article) {
        if (err) {
            throw err;
        }
        res.send(article);
    })
})

router.get("/save/:index", function(req, res) {
    var article = scrapedResult[req.params.index];
    //res.send(article);
    Article.saveArticle(article, function(err, article) {
        if (err) {
            throw err;
        }
        var articles = Article.getArticles();
        var hbsObject = { pageTitle: "my saved articles", articles: articles };
        res.render("save", hbsObject);
    });
})

// -------------Going to Saved articles route-------------------

router.get("/savedarticles", function(req, res) {
    Article.getArticles(function(err, articles) {
        if (err) {
            throw err;
        }

        var hbsObject = { pageTitle: "My Saved Articles", articles: articles };
        res.render("savedarticles", hbsObject);
    })
})

// ------------------------------------------
module.exports = router;

// ----------------------------------------------------------------------------
// comments: [
//     { 'comment': 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.' },
//     { 'comment': 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.' },
//     { 'comment': 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary' },
//     { 'comment': '' }
// ]
// comments: [
//     { 'comment': 'If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text.' }
// ]