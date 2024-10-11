import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ACCOUNT,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    async sendOtp(email: string, otp: string) {
        await this.transporter.sendMail({
            from: '"Service 👻" <from@example.com>',  // Replace with your service email
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
            html: `<div>Your OTP code is <b>${otp}</b>. It is valid for 10 minutes.</div>`,
        });
    }
}