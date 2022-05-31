import mailjet from 'node-mailjet';

import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import projectRootPath from '../../getRootPath';
import config from 'config';
import log from './logger';



export async function sendEmail(order:object, type:boolean) {
    log.info("Inside Mailer(Order): " + JSON.stringify(order));
    log.info("Inside Mailer(type): " + JSON.stringify(type));
    const emailTemplateSource = fs.readFileSync(path.join(projectRootPath + config.get('emailPath'), (type) ? "/order-fulfilment.hbs" : "/order-decline.hbs"), "utf8")
    log.info("Email: " + JSON.stringify(emailTemplateSource));
    let sendEmail = mailjet.connect(config.get("mailJetPublicKey"),config.get("mailJetPrivateKey"));
   
    const template = handlebars.compile(emailTemplateSource)

    const htmlToSend = template({order})

    const mailOptions = {
        from: "afrojive7@gamil.com",
        to: order.user.email,
        subject: (type) ? "Order fulfilment":"Order Declined",
        html: htmlToSend
    }

    log.info("mailOptions: " + JSON.stringify(mailOptions));
    const send = sendEmail.post("send", {'version': 'v3.1'});
    const requestObject = { Messages:[{
        From: {
            Email: 'emodatt08@gmail.com',
            Name: 'Sadat Hillary Kollan'
        },
        To: [{
            Email:  mailOptions.to
        }],
        Subject: mailOptions.subject,
        HTMLPart: mailOptions.html
    }]};

    send.request(requestObject).then((response) => {
        log.info("Email sent successfully" + JSON.stringify(response));
    }).catch((err:any) => {
        log.info("Email sending failed: " + err);
    });
     
}