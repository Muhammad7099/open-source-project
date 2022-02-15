const express = require("express");
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require("passport")
const session = require("express-session")
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: {
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
      },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, cd){
    cd(null, user.id);
})

passport.deserializeUser(function(id, cd){
    cd(null, id);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://boggart:123qwe@cluster0.hb7v6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    console.log("success connect mongo");
  } catch (e) {
    console.log(e.message);
  }
};

start();

passport.use(new GitHubStrategy({
  clientID: 'c62cf4e57016e645f274',
  clientSecret: 'e0300e5652f72ad341902446755cb1a162114e33',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

const isAuth = (req, res, next) => {
  if(req.user){
      next();
  } else{
      res.redirect('/login')
  }
}

app.get("/", isAuth, (req, res) => {
  console.log(req.user);
  res.sendFile(__dirname + '/dashboard.html');
})

app.get("/login", (req, res) => {
  if(req.user){
      return res.redirect('/')
  }
  res.sendFile(__dirname + '/login.html');
})

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect('/login')
})


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use(require("./routes/index"));

app.listen(3000, () => {
  console.log("success connect server");
});
