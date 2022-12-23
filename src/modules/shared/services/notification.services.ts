import { INotificationChannel, INotificationData } from '@/shared/interfaces/notification.interface'

export class NotificationFactory {
  public static create<T extends INotificationChannel>(notificationChannel: new () => T): T {
    return new notificationChannel()
  }
}

export class NotificationService {
  private readonly notificationChannel: INotificationChannel

  constructor(notificationChannel: INotificationChannel) {
    this.notificationChannel = notificationChannel
  }

  public async notify(notificationData: INotificationData): Promise<void> {
    await this.notificationChannel.notify(notificationData)
  }
}
