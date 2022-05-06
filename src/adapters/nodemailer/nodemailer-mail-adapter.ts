import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "22a621827eaed1",
        pass: "73261b1b8935d7"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Feedback App <feedback@app.com>',
            to: 'JK <kuchladev@gmail.com>',
            subject: subject,
            html: body
        })
    }
}