import { mailer } from '@/shared/utils/nodemailer.utils'
import { IVerificationMail } from '@/shared/interfaces/verificationMail.interface'

export const sendVerificationMail = async (mail: IVerificationMail) => {
  mailer
    .sendMail({
      from: mail.from,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
    })
    .then((response) => {
      console.log('email sent successfully', response)
    })
    .catch((err) => {
      console.log('Error in sending email: ' + err)
    })
}
