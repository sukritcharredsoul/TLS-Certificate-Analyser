import tls from 'node:tls' ;

export function certChecker(hostname,port) {
    
    return new Promise((resolve,reject) => {
        const socket = tls.connect({
        host : hostname,
        port : port ,
        servername : hostname ,
        rejectUnauthorized : false ,
        timeout : 100000,
        
    } , () => {
        const raw = socket.getPeerCertificate(true) ;
        const cipher = socket.getCipher() ;
        const protocol = socket.getProtocol(); 
        const authorized = socket.authorized ;

        socket.end() ;


        const cert = {

            subject: raw.subject,
            domain : raw.subject?.CN ,
            validfrom : raw.valid_from,
            validTill : raw.valid_to,
            fingerprint : raw.fingerprint256,
            subjectAltName : raw.subjectaltname,
            bits : raw.bits,
            serial : raw.serialNumber ,
            isExpired : raw.isExpired,


        }
        resolve({cert,cipher,protocol,authorized}) ;

    }) ;


    socket.on('error',reject) ;
    socket.on('timeout',() => {
            socket.destroy() ;
            reject(new Error("Timeout")) ;
        }) ;
    }) ;


}