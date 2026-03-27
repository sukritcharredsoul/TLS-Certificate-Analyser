#!/usr/bin/env node


import {Command} from 'commander' ;
import { certChecker } from "./services/certChecker.js";

const program = new Command() ;

program
    .name('tls-certificate')
    .description('Check TLS/SSL Certificate for Domain')
    .version('1.0.0') ;


program
    .argument('<hostname>',"Domain to check")
    .option('-p,--port <port>',"Port Number",'443')
    .action(async (hostname,options) => {
        try {
            const result = await certChecker(hostname,parseInt(options.port)) ;
            console.log("Domain : "+ hostname);
            console.log("Subject :" + JSON.stringify(result.cert.subject)) ;
            console.log("ValidTill : " + result.cert.validTill) ;
            console.log("Validfrom : " + result.cert.validfrom ) ;
            console.log("FingerPrint : " + result.cert.fingerprint ) ;
            console.log('TLS Version : ' + result.protocol)
            console.log('Cipher      : ' + result.cipher.name)


        if (result.cert.isExpired || new Date(result.cert.validTill) < new Date()) {
            console.log("Certificate is EXPIRED");
        } else {
            console.log("Certificate is valid");
        }} catch (error) {
            console.log(error.message) ;
            console.log("Error Occurred while working.")
        }
    }) ;

    program.parse() ;

