const bodyParser    = require("body-parser"),
mongoose            = require("mongoose"),
express             = require("express"),
app                 = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
const blogSchema  = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg",
//     body: "Hello THIs is a blog post!"
// })
// RESTFUL ROUTES

app.get("/", function(req, res){
    res.render("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("The Blog App Server Has Started!")
})