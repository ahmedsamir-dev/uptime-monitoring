import { INotificationChannel, INotificationData } from '@/shared/interfaces/notification.interface'
import { mailer } from '@/shared/utils/nodemailer.utils'

export default class EmailNotificationService implements INotificationChannel {
  notify = async (notificationData: INotificationData): Promise<void> => {
    mailer.sendMail({
      from: 'ahmed@uptime.io',
      to: notificationData.reciepentData,
      subject: 'Url Down Again',
      text: `Your Url: ${notificationData.pingResult.check.url}${notificationData.pingResult.check.path} is down
      Status: ${notificationData.pingResult.status}
      Response Time: Status: ${notificationData.pingResult.responseTime} `,
    })
  }
}
