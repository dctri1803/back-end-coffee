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
            from: `"Service 👻" <${process.env.MAIL_ACCOUNT}>`,  // Replace with your service email
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
            html: `<div>Your OTP code is <b>${otp}</b>. It is valid for 10 minutes.</div>`,
        });
    }

    async sendMail(to: string, subject: string, body: string): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: `"The Coffee House" <${process.env.MAIL_ACCOUNT}>`,
                to,
                subject,
                html: body,
            });
        } catch (error) {
            console.error(`Failed to send email:`, error);
            throw new Error('Failed to send email. Please try again later.');
        }
    }

    generateOrderEmailContent(orderDetails: any): string {
        const itemsHtml = orderDetails.items
            .map(item => `
                <div>
                    <b>Sản phẩm:</b> ${item.name} <br />
                    <b>Số lượng:</b> ${item.quantity} <br />
                    <b>Giá:</b> ${item.price.toLocaleString()} VND
                </div>
            `)
            .join('<hr />');

        return `
            <div>
                <p>Xin chào ${orderDetails.customerName},</p>
                <p>Cảm ơn bạn đã đặt hàng tại The Coffee House. Thông tin đơn hàng của bạn:</p>
                <div>${itemsHtml}</div>
                <p><b>Tổng giá:</b> ${orderDetails.totalPrice.toLocaleString()} VND</p>
            </div>
        `;
    }

    generateStatusUpdateEmailContent(customerName: string, status: string): string {
        return `
            <div>
                <p>Xin chào ${customerName},</p>
                <p>Trạng thái đơn hàng của bạn đã được cập nhật thành: <b>${status}</b>.</p>
                <p>Chúng tôi sẽ tiếp tục thông báo nếu có thay đổi thêm.</p>
            </div>
        `;
    }
}
