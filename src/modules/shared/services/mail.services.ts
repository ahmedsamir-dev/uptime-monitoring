import nodemailer from 'nodemailer'
import { IVerificationMail } from '@/shared/interfaces/verificationMail.interface'

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  auth: {
    user: 'ahmedsamirwarda22@gmail.com',
    pass: 'GDKNHQ9mrMv5AS2W',
  },
})

export const sendVerificationMail = async (mail: IVerificationMail) => {
  const response = await transporter.sendMail({
    from: mail.from,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
  })
}
