require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt')
const goldi = require('./model/data')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const app = express();


app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.urlencoded(
    {extended: true}
));

app.get('/profile', async (req,res) => {
    const token = req.cookies.token;

    if(!token){
      return res.redirect('/login')
    }

    try {
      const data =jwt.verify(token,process.env.JWT_SECRET)

      const user = await goldi.findOne({email:data.email})
      if (!user){
         return redirect('login')
      }    return res.render('./partials/profile.ejs',{result:user})
    }catch (err){
      return res.redirect('login')
    }
})
//code to login the user 
app.get('/login',  (req, res) => {
    return res.render('./partials/login.ejs');
});

app.post('/login', async (req,res)=> {
     const userlogin = req.body;
   console.log(userlogin);
try {
   const user = await  goldi.findOne({email: userlogin.email} )
      
      if(!user) {
        return res.send('user not found')
      }
      else {
         bcrypt.compare(userlogin.password, user.password , (err , result)=> {
       
            if (err) {
                return res.send('something went wrong')
             }
             else if (result) {
                
                  var token = jwt.sign({email:user.email}, 
                     process.env.JWT_SECRET
                  )
                   res.cookie('token',token)
                   console.log ('token is :',token)
                    return res.render('./partials/profile.ejs',{result:user})
                  // return res.send(`login successful, Hi ${user.name}`);
             }
             else {
               return res.send('wrong password')
             }
         })
      }
      
} catch (err) {
   console.log(err)
   return res.send('database error')
}
   
});




//code to get password from user
app.post('/userData', (req, res)=> {
     const body = req.body;
//bycrypt code to salt and hash the password
     bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(body.password,salt, async(err,hash)=> {
         
         const result = await goldi.create({
            name:body.name,
            email:body.email,
            password:hash,
         })
            console.log(`User created `)

            var token = jwt.sign({email:result.email}, 
                     process.env.JWT_SECRET
                  )
                   res.cookie('token',token)
                   console.log ('token is :',token)
                  return res.render('./partials/profile.ejs',{result})
            //  return res.send(`hello ${body.name} your accound is created`)
        })
     })  
});



//code to signup the user
app.get('/signup',(req,res) => {
   return res.render('home')
});

//code to logout the user
app.get('/logout',(req,res)=> {
   res.clearCookie('token')
   return res.redirect('./partials/login.ejs')
})

app.listen(1000);