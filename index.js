const express = require('express');
const mailer = require('nodemailer');
let ejs = require('ejs');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
let mailerConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/sendMail', async (req, res) => {

    // 1. Co link
    const link = 'https://drive.google.com/drive/folders/1bQ7PUCN5_w27KTad2DjeWjWKBO5whtsg';
    // 2. Danh sach email => Lay tu database;
    const emailList = ['nodaja6316@dogemn.com'];



    // Email Template
    let html = await ejs.renderFile(
        './views/basic.ejs', 
        {
            link 
        },
    );

    // Send mail
    let transporter = mailer.createTransport(mailerConfig);
    let info = await transporter.sendMail(
        {
            from: 'Kunj Kanani',
            to: emailList,
            subject: 'subject',
            html: html,
        }
    );


    res.status(200).send(
        { 
            "message": "success"
        },
    );
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});