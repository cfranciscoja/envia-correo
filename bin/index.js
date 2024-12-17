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
var saludo = 'Saludos';
var transporter = nodemailer.createTransport({
  host: constantes.hostcorreo,
  port: constantes.portcorreo,
  secure: constantes.securecorreo, 
  auth: {
    user: constantes.usercorreo, 
    pass: constantes.passcorreo, 
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
    claveplana = LineaArchivo[5];

    if (genero == 'm') {
      saludo = 'Estimado';
    } else {
      saludo = 'Estimada';
    }

    mailOptions = {
      from: '"Concientización de Cibersegiridad " <ciber@sdtic.cl>', // sender address
      to:  nombre +" "+ apellido +" <"+ correo +">", // list of receivers
      subject: "Acceso a plataforma e-learning", // Subject line
      text: saludo +" "+ nombre + " " + apellido +
            " Sus datos de acceso a la plataforma de e-learning son los siguientes: "+
            " - Usuario: "+ username +
            " - Contraseña: "+ claveplana +
            " Saluda atentamente, Depatamento de Ciberdefensa y Ciberseguridad", // plain text body
      html: saludo +" <b>"+ nombre +" "+ apellido +"</b>"+
            "<br><br>Sus datos de acceso a la plataforma de e-learning son los siguientes: <br><br>"+
            "- Usuario: <b>"+ username + " </b><br>"+
            "- Contraseña: <b>"+ claveplana + " </b><br>"+
            "- URL: <b> <a href='https://www.seade.cl/moodle'>Plataforma e-learning</a></b><br><br>" +
            "Saluda atentamente,<br> <b>Depatamento de Ciberdefensa y Ciberseguridad</b>", // html body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Enviado a: '+ correo +' Ressultado: ' + info.response);
    });
    saludo = 'Saludos';
    
    //console.log('apellido: ' + apellido);
}
