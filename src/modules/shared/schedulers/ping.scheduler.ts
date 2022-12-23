import { Queue, Worker, Job } from 'bullmq'
import Redis from 'ioredis'
import { ICheckSchema } from '@/modules/check/check.interfaces'
import { axios } from '@/shared/utils/axios.utils'
import { pushLatestPing } from '@/shared/cache/ping.cache'
import PingStatus from '@/shared/enums/pingStatus.enum'
import { NotificationFactory, NotificationService } from '@/shared/services/notification.services'
import EmailNotificationService from '@/shared/services/emailNotificaion.service'

export default class PingScheduler {
  private static connection = new Redis()
  private static queue: Queue = new Queue('ping', { connection: this.connection })
  private static worker: Worker = new Worker('ping', this.jobHandler)

  public static async addPing(ping: ICheckSchema) {
    console.log(ping)
    try {
      await this.queue.add(ping._id.toString(), ping, {
        repeat: {
          every: ping.interval,
        },
        jobId: ping._id.toString(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  public static async deletePing(id: string): Promise<void> {
    try {
      const jobKey = await (
        await this.queue.getRepeatableJobs()
      )
        .filter((entry) => {
          return entry.id === id
        })
        .map((entry) => entry.key)[0]

      const job = await this.queue.removeRepeatableByKey(jobKey)
      console.log(job)
    } catch (error) {
      console.log(error)
    }
  }

  private static async jobHandler(job: Job): Promise<void> {
    const check = job.data
    console.log('hanlding job', check)

    axios({
      method: 'GET',
      baseURL: check.url,
      url: check.path,
      auth: check.authentication,
      timeout: check.timeout,
    })
      .then(async (response) => {
        const responseTime = Number(response.headers['Request-Duration'])
        console.log(responseTime)
        await pushLatestPing({ check, status: PingStatus.UP, responseTime: responseTime ?? 0 })
      })
      .catch(async (error) => {
        await pushLatestPing({ check, status: PingStatus.DOWN, responseTime: 0 })

        //Send Notification for that down
        if (check.email) {
          const notificationService = NotificationFactory.create(EmailNotificationService)
          await notificationService.notify({
            pingResult: { check, status: PingStatus.DOWN, responseTime: 0 },
            reciepentData: check.email,
          })
        } else {
          //Choose another notification channel
        }
      })
  }
}
