import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { User, UserModel } from '../entities/User'
import { validdateEmail, validdatePassword, validdateUser } from '../utils/validateuser'
import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import { createToken, sendToken } from '../utils/token'
import { AppContext, LevelOptions, RoleOptions } from '../types'
import { isAuth } from '../utils/authhandle'
import nodemailer from 'nodemailer'
import { Departments, DepartmentModel } from '../entities/department'

@ObjectType()
export class ResMessage {
    @Field()
    message: String
}

@Resolver()
export class AuthResolvers {

    @Query(() => [User], { nullable: 'items' }) // [User!]! to [User]!
    async users(
        @Ctx() { req }: AppContext
    ): Promise<User[] | null> {
        try {

            const user = await isAuth(req)



            if (!(user.role.includes(RoleOptions.admin) || user.role.includes(RoleOptions.superadmin))) throw Error("You are not permission!!!")

            const AllUser = await UserModel.find().populate({ path: 'department' })

            return AllUser

        } catch (error) {
            throw error
        }
    }

    @Query(() => [Departments], { nullable: 'items' }) // [User!]! to [User]!
    async departments(
        @Ctx() { req }: AppContext
    ): Promise<Departments[] | null> {
        try {

            const user = await isAuth(req)

            if (!(user.role.includes(RoleOptions.admin) || user.role.includes(RoleOptions.superadmin))) throw Error("You are not permission!!!")

            const Alldepartments = await DepartmentModel.find()

            return Alldepartments

        } catch (error) {
            throw error
        }
    }

    @Query(() => User, { nullable: true }) // [User!]! to [User]!
    async me(
        @Ctx() { req }: AppContext
    ): Promise<User | null> {
        try {

            const user = await isAuth(req)

            return user

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => User, { nullable: true })
    async createUser(
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('firstname') firstname: string,
        @Arg('lastname') lastname: string,
        @Arg('departmentId') departmentId: string,
        @Arg('level') newlevel: LevelOptions,
    ): Promise<User | null> {
        try {

            if (!username) throw new Error('Username is require')

            const usernameisvalid = validdateUser(username)

            if (!usernameisvalid) throw new Error('username must be 3 - 30 character')

            if (!email) throw new Error('email is require')

            const emailisvalid = validdateEmail(email)

            const userEmail = await UserModel.findOne({ email })

            if (userEmail) throw Error("Email already to use")

            if (!emailisvalid) throw new Error('email is not valid')

            if (!password) throw new Error('password is require')

            const passwordisvalid = validdatePassword(password)

            if (!passwordisvalid) throw new Error('password must be 8 - 30 character')

            const hashedPassword = await bcrypt.hash(password, 10)

            const departments = await DepartmentModel.findById(departmentId)

            if (!departments) throw Error("Department not found")

            const newUser = await UserModel.create<Pick<User, 'department' | 'username' | 'email' | 'password' | 'firstname' | 'lastname' | 'level'>>({
                username,
                password: hashedPassword,
                email,
                firstname,
                lastname,
                department: departments,
                level: newlevel
            })

            
            await newUser.save()

            return newUser

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => User, { nullable: true })
    async login(
        @Arg('username') username: string,
        @Arg('password') password: string,
        @Ctx() { res }: AppContext
    ): Promise<User | null> {
        try {

            if (!username) throw new Error('Username is require')

            if (!password) throw new Error('password is require')

            const user = await UserModel.findOne({ username }).populate({ path: 'department' })

            if (!user) throw Error("Username or Password isn't correct")

            const decpypassword = await bcrypt.compare(password, user.password)

            if (!decpypassword) throw Error("Username or Password isn't correct")

            const token = createToken(user.id, user.tokenversion)

            sendToken(res, token)

            return user

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => ResMessage, { nullable: true })
    async logout(
        @Ctx() { req, res }: AppContext
    ): Promise<ResMessage | null> {
        try {

            const user = await UserModel.findById(req.userId)

            if (!user) return null

            user.tokenversion = user.tokenversion + 1

            await user.save()

            res.clearCookie(process.env.COOKIE_NAME!)

            return { message: "Logout Succession" }

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => ResMessage, { nullable: true })
    async requestresetpassword(
        @Arg('email') email: string
    ): Promise<ResMessage | null> {
        try {

            if (!email) throw Error('Email is required.')

            const isEmail = await UserModel.findOne({ email })

            if (!isEmail) throw Error('Email is incorrect.')

            const resetpasswordtoken = randomBytes(16).toString('hex')

            const resetpasswordtokenexpiry = Date.now() + 1000 * 60 * 30

            const updateUser = await UserModel.findOneAndUpdate(
                { email },
                { resetpasswordtoken, resetpasswordtokenexpiry },
                { new: true }
            )

            if (!updateUser) throw Error('Somting wrong!!!')

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_NAME, // your email
                    pass: process.env.EMAIL_PASSWORD // your email password
                }
            });

            let mailOptions = {
                from: process.env.EMAIL_NAME,                // sender
                to: email,                // list of receivers
                subject: 'Reset Password from HR-Leave',              // Mail subject
                html: `
                        <div>
                        <p>Please click link to resetpassword</p>
                        <a href='http://localhost:3000/?resetToken=${resetpasswordtoken}' target='blank'> CLICK HERE </a>
                        </div> 
                        `  // HTML body
            };

            transporter.sendMail(mailOptions)

            return { message: "Please check your email." }

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => ResMessage, { nullable: true })
    async resetpassword(
        @Arg('password') password: string,
        @Arg('token') token: string
    ): Promise<ResMessage | null> {
        try {

            if (!password) throw Error('Email is required.')

            if (!token) throw Error('Someting wrong!!!')

            const user = await UserModel.findOne({ resetpasswordtoken: token })

            if (!user) throw Error('Someting wrong!!!')

            if (!user.resetpasswordtokenexpiry) throw Error('Someting wrong!!!')

            const TokenExpiry = Date.now() < user.resetpasswordtokenexpiry

            if (!TokenExpiry) throw Error("Token is expiry !!! ")

            const newpassword = await bcrypt.hash(password, 10)

            const updateUser = await UserModel.findOneAndUpdate(
                { email: user.email },
                {
                    password: newpassword,
                    resetpasswordtokenexpiry: undefined,
                    resetpasswordtoken: undefined
                },
                { new: true }
            )

            if (!updateUser) throw Error('Somting wrong!!!')

            return { message: "Resetpassword Successfully" }

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => User, { nullable: true })
    async updateRole(
        @Arg('newRole', () => [String]) newRole: RoleOptions[],
        @Arg('userId') userId: string,
        @Ctx() { req }: AppContext
    ): Promise<User | null> {
        try {

            const Admin = await isAuth(req)

            const superadmin = Admin.role.includes(RoleOptions.superadmin)

            if (!superadmin) throw Error("you don't permission!!!")

            const user = await UserModel.findById(userId)

            if (!user) throw Error("User not foud")

            user.role = newRole

            await user.save()

            return user

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => User, { nullable: true })
    async updateUser(
        @Arg('userId') userId: string,
        @Arg('username') username: string,
        @Arg('fisrtname') fisrtname: string,
        @Arg('lastname') lastname: string,
        @Arg('departmentId') departmentId: string,
        @Arg('email') email: string,
        @Arg('level') newlevel: LevelOptions,
        @Ctx() { req }: AppContext
    ): Promise<User | null> {
        try {

            const Admin = await isAuth(req)

            const superadmin = Admin.role.includes(RoleOptions.superadmin)

            if (!superadmin) throw Error("you don't permission!!!")

            const department = await DepartmentModel.findById(departmentId)

            if (!department) throw Error("Department not found!!!")

            const user = await UserModel.findByIdAndUpdate(userId,
                {
                    username,
                    fisrtname,
                    lastname,
                    department: department,
                    email,
                    level: newlevel
                }).populate({path: 'department'})


            if (!user) throw Error("User not found!!!")

            return user

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => ResMessage, { nullable: true })
    async deleteUser(
        @Arg('userId') userId: string,
        @Ctx() { req }: AppContext
    ): Promise<ResMessage | null> {
        try {
            const Admin = await isAuth(req)

            const superadmin = Admin.role.includes(RoleOptions.superadmin)

            if (!superadmin) throw Error("you don't permission!!!")

            const user = await UserModel.findByIdAndDelete(userId)

            if (!user) throw Error("User not foud")

            return { message: `${user.username} has been delete` }

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => Departments, { nullable: true })
    async createDepartment(
        @Arg('name') name: string,
        @Ctx() { req }: AppContext
    ): Promise<Departments | null> {
        try {
            const Admin = await isAuth(req)

            const superadmin = Admin.role.includes(RoleOptions.superadmin) || Admin.role.includes(RoleOptions.admin)

            if (!superadmin) throw Error("you don't permission!!!")

            const department = await DepartmentModel.findOne({ name })

            if (department) throw Error("Department has been already")

            const craeteDepartment = await DepartmentModel.create(<Pick<Departments, 'name'>>({
                name
            }))

            return craeteDepartment

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => Departments, { nullable: true })
    async updateDepartment(
        @Arg('departmentId') departmentId: string,
        @Arg('name') name: string,
        @Ctx() { req }: AppContext
    ): Promise<Departments | null> {
        try {

            const Admin = await isAuth(req)

            const superadmin = Admin.role.includes(RoleOptions.superadmin)

            if (!superadmin) throw Error("you don't permission!!!")

            const department = await DepartmentModel.findById(departmentId)

            if (!department) throw Error('Department not found')

            department.name = name

            await department.save()

            return department

        } catch (error) {
            throw error
        }
    }

    @Mutation(() => ResMessage, { nullable: true })
    async deleteDepartment(
        @Arg('departmentId') departmentId: string,
        @Ctx() { req }: AppContext
    ): Promise<ResMessage | null> {
        try {
            const Admin = await isAuth(req)

            const superadmin = Admin.role.includes(RoleOptions.superadmin)

            if (!superadmin) throw Error("you don't permission!!!")

            const department = await DepartmentModel.findByIdAndDelete(departmentId)

            if (!department) throw Error("User not foud")

            return { message: `${department.name} has been delete` }

        } catch (error) {
            throw error
        }
    }
}