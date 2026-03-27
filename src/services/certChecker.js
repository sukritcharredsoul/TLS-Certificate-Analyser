import tls from 'node:tls' ;

export function certChecker(hostname,port) {
    
    return new Promise((resolve,reject) => {

        port = Number(port) ;
        
        if(port < 1 || port > 65535){
            return reject(new Error("Invali Port Number")) ;
        }

        if (!/^[a-zA-Z0-9.-]+$/.test(hostname)) {
            return reject(new Error("Invalid hostname"));
        }

        const socket = tls.connect({
        host : hostname,
        port : port ,
        servername : hostname ,
        rejectUnauthorized : true ,
    
        })  ;
    
    socket.setTimeout(5000) ;

    socket.on('secureConnect',() => {
        if (!socket.authorized) {
            return reject(new Error(socket.authorizationError));
        }

        const raw = socket.getPeerCertificate(true) ;

        const identityError = tls.checkServerIdentity(hostname,raw) ;

        if(identityError){
            return reject(new Error("Hostname mismatch"));
        } ;

        const now = new Date() ;

        const validFrom = new Date(raw.valid_from);
            const validTo = new Date(raw.valid_to);

            const cert = {
                subject: raw.subject,
                domain: raw.subject?.CN || "N/A",
                validFrom,
                validTo,
                isExpired: now < validFrom || now > validTo,
                fingerprint: raw.fingerprint256,
                subjectAltName: raw.subjectaltname,
                serial: raw.serialNumber,
            };

            const cipher = socket.getCipher();
            const protocol = socket.getProtocol();
            
            resolve({cert,cipher,protocol})
            socket.end();
    }) ;

    socket.on('error',(err) => {
        if(err.message.includes("packet length too long")){
            console.error("You have supplied a port which doesn't support TLS.")
        }else {
            console.error(err.message) ;
        }

        reject(err) ;
    }) ;

    socket.on('timeout',() => {
            reject(new Error("Connection Timed out."))
            socket.destroy() ;
        }) ;
    }) ;


}