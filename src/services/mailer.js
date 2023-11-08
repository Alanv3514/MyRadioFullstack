
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const emailjs = require('@emailjs/nodejs');

const enviarMail = async (nombre, email, textoHtml) => {

    console.log(`${nombre} - ${email}`);
    let templateParams = {
        user_name: nombre,
        message: textoHtml,
        user_email: email,
        from_name: email,
        reply_to: email,
    };
    emailjs
    .send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, templateParams, {
        publicKey: process.env.EMAIL_PUBLIC_KEY,
        privateKey: process.env.EMAIL_SECRET_KEY, // opcional, altamente recomendado por razones de seguridad
    })
    .then(
        //retornamos el error o el exito de la promesa
        (result) => {
            console.log(result.text);
            return result.text;
        },
    );
}


module.exports = enviarMail;