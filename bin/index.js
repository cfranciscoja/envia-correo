#!/usr/bin/env node

const bcrypt = require('bcrypt');
const saltRounds = 10;

const lineByLine = require('n-readlines');
const liner = new lineByLine('/var/www/html/repos/votacion/node/generaclave/listas/listado.txt');

var nodemailer = require('nodemailer');



var myPlaintextPassword = 0;
var LineaArchivo = '';
var nombre = '';
var correo = '';
var cadena = '';
var claveplana = '';
var hashedPassword = '';
var transporter = nodemailer.createTransport({
  host: "",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "", // generated ethereal user
    pass: "", // generated ethereal password
  },
});

// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'Votación SSD', // sender address
  to: "", // list of receivers
  subject: "Acceso a sistema de Votación", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

let line;
while (line = liner.next()) {
    LineaArchivo = line.toString().split('\t');
    nombre = LineaArchivo[0];
    correo = LineaArchivo[1];
    myPlaintextPassword = Math.floor(Math.random() * 100000000);
    claveplana = myPlaintextPassword.toString().padStart(8,"0");
    mailOptions = {
      from: 'Votación', // sender address
      to:  nombre + "<" + correo + ">", // list of receivers
      subject: "Acceso a sistema de Votación", // Subject line
      text: "Estimado(a) "+ nombre +
            " Sus datos de acceso al sistema de votación son los siguientes: "+
            " - Usuario: "+ correo +
            " - Contraseña: "+ claveplana +
            " Saluda atentamente, Sistema de vtación on-line", // plain text body
      html: "<b>Estimado(a) "+ nombre + " </b>"+
            "<br><br>Sus datos de acceso al sistema de votación son los siguientes:<br><br>"+
            "- Usuario: <b>"+ correo + " </b><br>"+
            "- Contraseña: <b>"+ claveplana + " </b><br>"+
            "- URL: <b><a href>http://desa.sdefensa.cl/repos/votacion/html/public/</b><br><br>" +
            "Saluda atentamente,<br> <b>Sistema de votación on-line</b>", // html body
    };
    hashedPassword = bcrypt.hashSync(claveplana, saltRounds);
    cadena = "insert into users(name, email, password) values('"+ nombre +"','" + correo +"','"+ hashedPassword +"');";
    console.log("Clave: "+ claveplana + "|" + cadena);
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}
