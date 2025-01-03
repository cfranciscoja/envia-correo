#!/usr/bin/env node

const lineByLine = require('n-readlines');
const liner = new lineByLine('../listas/listado.txt');

const constantes = require("../const/constantes");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  pool: true,
  host: constantes.hostcorreo,
  port: constantes.portcorreo,
  secure: constantes.securecorreo,
  auth: {
    user: constantes.usercorreo,
    pass: constantes.passcorreo,
  },
});

//console.log(constantes.hostcorreo);


var LineaArchivo = '';
var campo_000 = '';
var campo_001 = '';
var campo_002 = '';
var campo_003 = '';
var campo_004 = '';
var campo_005 = '';

var saludo = 'Saludos';


let line;
while (line = liner.next()) {
    LineaArchivo = line.toString().split('\t');
    campo_000 = LineaArchivo[0]; //Curso
    campo_001 = LineaArchivo[1]; //Genero
    campo_002 = LineaArchivo[2]; //Nombre
    campo_003 = LineaArchivo[3]; //Apellido
    campo_004 = LineaArchivo[4]; //Correo
    campo_005 = LineaArchivo[5]; //Archivo

    if (campo_001 == 'm') {
      saludo = 'Estimado';
    } else {
      saludo = 'Estimada';
    }

    mailOptions = {
      from: '"Certificados" <ciber@sdtic.cl>', 
      to:  campo_002 +" "+ campo_003 +" <"+ campo_004 +">", 
      subject: "Certificado de Curso "+ campo_000, 
      text: `${saludo} ${campo_002} ${campo_003} Ud. a completado con éxito y aprobado el curso  ${campo_000}  Se adjunta Certificado. Saludos cordiales, Depatamento de Ciberdefensa y Ciberseguridad Subsecretaría de Defernsa`, // texto plano
      html: saludo +" <b>"+ campo_002 +" "+ campo_003 +"</b>"+
            "<br><br>Ud. a completado con éxito y aprobado el curso <b>"+ campo_000 +".</b> <br><br>"+
            "Se adjunta Certificado.<br><br>Saludos cordiales,<br><b>Depatamento de Ciberdefensa y Ciberseguridad <br> Subsecretaría de Defensa</b>", // html
      attachments: [
           {   // utf-8 string as an attachment
               filename: campo_005,
               //content: new Buffer('hello world!','utf-8')
               path: '../archivos/'+campo_005
           }
      ]
    };
/*
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('response: ' + info.response + ' messageId:' + info.messageId );
    });*/

    saludo = 'Saludos';
    
    console.log('apellido: ' + campo_005);

}
