import 'module-alias/register'
import 'dotenv/config'
import App from './app'
import { controllers } from '@/modules/shared/utils/controllersBuilder.utils'

const app = new App(controllers, Number(process.env.PORT))

app.listen()
