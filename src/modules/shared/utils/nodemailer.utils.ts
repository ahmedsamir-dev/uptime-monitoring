import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: String(process.env.NODEMAILER_HOST),
  port: Number(process.env.NODEMAILER_PORT),
  auth: {
    user: String(process.env.NODEMAILER_AUTH_USER),
    pass: String(process.env.NODEMAILER_AUTH_PASSWORD),
  },
})

export { transporter as mailer }
