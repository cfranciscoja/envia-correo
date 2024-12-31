#!/usr/bin/env node

const lineByLine = require('n-readlines');
const liner = new lineByLine('../listas/listado.txt');

const constantes = require("../const/constantes");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: constantes.hostcorreo,
  port: constantes.portcorreo,
  secure: constantes.securecorreo, 
  auth: {
    user: constantes.usercorreo, 
    pass: constantes.passcorreo, 
  },
//  tls: {
//    rejectUnauthorized: true,
//    ciphers: constantes.cipherscorreo, 
//  },
});

//console.log(constantes.hostcorreo);


var LineaArchivo = '';
var username = '';
var genero = '';
var nombre = '';
var apellido = '';
var correo = '';
var claveplana = '';
var saludo = 'Saludos';


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
      from: '"Concientización de Cibersegiridad" <ciber@sdtic.cl>', 
      to:  nombre +" "+ apellido +" <"+ correo +">", 
      subject: "Acceso a plataforma e-learning", 
      text: `${saludo} ${nombre} ${apellido} Sus datos de acceso   a la plataforma de e-learning, para la concientozación de Cibersegiridad, son los siguientes:  - Usuario: ${username} - Contraseña: ${claveplana} Saluda atentamente, Depatamento de Ciberdefensa y Ciberseguridad`, // texto plano
      html: saludo +" <b>"+ nombre +" "+ apellido +"</b>"+
            "<br><br>Sus datos de acceso a la plataforma de e-learning, para la concientozación de Cibersegiridad, son los siguientes: <br><br>"+
            "- Usuario: <b>"+ username + "</b><br>"+
            "- Contraseña: <b>"+ claveplana + "</b><br>"+
            "- URL: <b> <a href='https://www.seade.cl/moodle'>Plataforma e-learning</a></b><br><br>" +
            "Se adjunta manual de uso.<br><br>Saludos cordiales,<br><b>Depatamento de Ciberdefensa y Ciberseguridad</b>", // html
      attachments: [
           {   // utf-8 string as an attachment
               filename: 'manual_de_uso.pdf',
               //content: new Buffer('hello world!','utf-8')
               path: '../listas/manual_de_uso.pdf'
           }
      ]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('response: ' + info.response + ' messageId:' + info.messageId );
    });
    saludo = 'Saludos';
    
    //console.log('apellido: ' + apellido);

}
