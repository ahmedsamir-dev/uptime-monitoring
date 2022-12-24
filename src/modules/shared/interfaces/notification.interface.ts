import { IPingResult } from '@/shared/interfaces/ping.interface'

export interface INotificationData {
  pingResult: IPingResult
  reciepentData: string
}

export interface INotificationChannel {
  notify(notificationData: INotificationData): Promise<void>
}
