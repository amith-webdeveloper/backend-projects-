const express = require('express')
const app = express()
const path = require('path')
// const db = require('db')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')



const LoginUserSchema = require('./models/login.model')
const SignupUserSchema = require('./models/Signup.model')


app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname , "public")))


async function hashPass(password){
    const res = await bcrypt.hash( password, 10)
    return res
}

async function compare(userpass , hashpass){
    const res = await bcrypt.compare(userpass, hashpass)
    return res
}


app.get('/' , function(req, res){
    if(req.cookies.jwt){
        const verify = jwt.verify(req.cookies.jwt , "jascswirlawofncldosapfuvosenv30dk2d9nf8")
        res.render('home' , {name:verify.firstname})
    }
    else{
        res.render('login')
    }
})

app.get('/signup' , function(req, res){
    res.render('signup')
})

app.post('/signup' , async function(req , res){
    try {
        const check = await SignupUserSchema.findOne({email:req.body.email}) 

        if(check){
            res.send('user already exist')
        }
        else{
            const token = jwt.sign({email:req.body.email} , 'jascswirlawofncldosapfuvosenv30dk2d9nf8')


            res.cookie('jwt' , token ,{
                maxAge:600000,
                httpOnly:true
            })

            const data = {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email : req.body.email,
                password: await hashPass(req.body.password),
                token:token
            }

            await SignupUserSchema.insertMany([data])
            await LoginUserSchema.insertMany([data])
            res.render("home" , {firstname:req.body.firstname})
        }
        
    } catch(err){
        res.send('wrong details' + err)
        
    }
})


app.post('/login' , async function(req , res){
    try {
        const check = await LoginUserSchema.findOne({email:req.body.email}) 
        const passcheck = await compare(req.body.password , check.password)

        if(check && passcheck){
            res.cookie('jwt' , check.token , {
                maxAge:600000,
                httpOnly:true
            })
            res.render("home" , {firstname:req.body.firstname})
        }
        else{
            
            res.render('login' )
           
           
        }
        
    } catch(err){
        res.render('login')
        console.log(err);
        
        
    }
})




app.listen(3000)