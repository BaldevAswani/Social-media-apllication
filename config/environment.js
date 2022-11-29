const fs=  require('fs');
const rfs= require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory); 

const accessLogStream= rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory

});

const development={
    name:'development',
    asset_path :'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_development2',
    
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
        user:'baldevaswani03',
        pass:'wdmqbixlvxirbgcn'
        }

    },
    google_client_id:"401676324241-2p4v1bukngobv7e25vlol1tsu2r71v1j.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
       mode:'dev',
       options:{stream:accessLogStream}
    }

}



const production={
     name:'production',
     asset_path :'./public/assets',
    session_cookie_key:process.env.Codeial_session_cookie_key,
    db:"codeial-production",
    
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
        user:process.env.Codeial_username,
        pass:process.env.Codeial_gmail_password
        }

    },
    google_client_id:"401676324241-2p4v1bukngobv7e25vlol1tsu2r71v1j.apps.googleusercontent.com",
    google_client_secret:process.env.Codeial_google_client_secret,
    google_call_back_url:process.env.Codeial_google_call_back_url,
    jwt_secret:'codeial',
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
     }

}

module.exports=eval(process.env.NODE_ENV)==undefined ? development:eval(process.env.NODE_ENV);