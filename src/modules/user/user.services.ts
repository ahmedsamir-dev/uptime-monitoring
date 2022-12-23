import { IUserService, IUserSchema, IUserResult } from '@/user/user.interfaces'
import { SignUpDTO, SignInDTO, VerifyDTO } from '@/user/user.dtos'
import User from '@/user/user.model'
import { hashPassword, verifyPassword } from '@/user/user.utils'
import { Ok, Err, Result } from 'ts-results'
import { buildUserResult } from '@/user/user.utils'
import { sendVerificationMail } from '@/modules/shared/services/verification.services'
import { IVerificationMail } from '@/shared/interfaces/verificationMail.interface'
import crypto from 'crypto'
import { log } from 'console'

export default class UserService implements IUserService {
  signup = async (dto: SignUpDTO): Promise<Result<IUserResult, string>> => {
    const isUserAlreadyExist = await User.exists({ email: dto.email })
    log(isUserAlreadyExist)

    //User is already signed up
    if (isUserAlreadyExist?._id) {
      return Err('User already exists')
    }

    // User is not signed up yet, create a new one

    // hash password
    const hashedPassword = await hashPassword(dto.password)

    //change dto's password to hashedPassword
    dto.password = hashedPassword

    //Presist the new user to the database
    const pin = crypto.randomBytes(4).toString('hex')
    const newUserCreated: IUserSchema = await User.create({ ...dto, pin })

    //send verification email
    const mail: IVerificationMail = {
      from: '"Ahmed Samir" <ahmed@uptime.co>',
      to: dto.email,
      subject: 'Email Verification',
      text: `your verification pin is: ${pin}`,
    }

    await sendVerificationMail(mail)

    //Build the suitable response format
    const userResult: IUserResult = buildUserResult(newUserCreated)

    return Ok(userResult)
  }

  signin = async (dto: SignInDTO): Promise<Result<IUserResult, string>> => {
    //Find the user in the database
    const user: IUserSchema | null = await User.findOne({ email: dto.email }, { __v: false })

    // return Err if the user is not found
    if (user === null) {
      return Err('user not found')
    }

    //compare passwords
    const isPasswordsMatch = await verifyPassword(dto.password, user.password)

    //if password don't matche return Err
    if (isPasswordsMatch === false) {
      return Err('user not found or password is incorrect')
    }

    //if user's account is not verified then return Err
    if (user.isVerified === false) {
      return Err('user is not verified, please verify and try again')
    }

    //Build the suitable response format
    const userResult: IUserResult = buildUserResult(user)
    return Ok(userResult)
  }

  verify = async (dto: VerifyDTO): Promise<Result<string, string>> => {
    //Find the user in the database
    const user: IUserSchema | null = await User.findOne({ email: dto.email, pin: dto.pin }, { pin: true })

    // return Err if the user is not found or pin is wrong
    if (user === null) {
      return Err('user not found or pin is wrong')
    }

    await User.updateOne({ email: dto.email, pin: dto.pin }, { pin: null, isVerified: true })

    return Ok('Pin is correct, your account verified successfully')
  }
}
