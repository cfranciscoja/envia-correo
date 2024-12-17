#!/usr/bin/env node

const lineByLine = require('n-readlines');
const liner = new lineByLine('../listas/listado.txt');


var constantes = require("../const/constantes");

console.log(constantes.hostcorreo);

var nodemailer = require('nodemailer');



var LineaArchivo = '';
var username = '';
var genero = '';
var nombre = '';
var apellido = '';
var correo = '';
var claveplana = '';
var transporter = nodemailer.createTransport({
  host: constantes.hostcorreo,
  port: constantes.portcorreo,
  secure: constantes.securecorreo, // true for 465, false for other ports
  auth: {
    user: constantes.usercorreo, // generated ethereal user
    pass: constantes.passcorreo, // generated ethereal password
  },
});



let line;
while (line = liner.next()) {
    LineaArchivo = line.toString().split('\t');
    username = LineaArchivo[0];
    genero = LineaArchivo[1];
    nombre = LineaArchivo[2];
    apellido = LineaArchivo[3];
    correo = LineaArchivo[4];

    mailOptions = {
      from: '"Concientizacion de Cibersegiridad " <ciber@sdtic.cl>', // sender address
      to:  nombre + "<" + correo + ">", // list of receivers
      subject: "Acceso a plataforma e-learning", // Subject line
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
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    
    //console.log('apellido: ' + apellido);
}
