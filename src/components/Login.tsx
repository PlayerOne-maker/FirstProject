import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { LoginCSS } from '../CSScomponents/Login'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../apollo/mututaion'
import { User, SigninArgs } from '../types'
import { AuthContext } from '../context/AuthProvider'
import { Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loggeduser, getUser } from '../reducers/userReducer'

type FormData = {
    username: string;
    password: string;
};

export default function Login() {

    // const { loggedUser, setAuthUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [login, { loading, error }] = useMutation<{ login: User }, SigninArgs>(LOGIN)

    const history = useHistory()

    const user = useSelector(getUser)

    const dispatch = useDispatch()

    const onSubmit = handleSubmit(async ({ username, password }) => {
        try {
            const res = await login({
                variables: {
                    username,
                    password
                }
            })

            if (res.data?.login) {

                const login = res.data.login

                dispatch(loggeduser(login))

                history.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    });

    return (
        <LoginCSS>
            {!user ?
                <div>

                    <div className="container">
                        <div className="Bg">

                            <img alt="background" src="https://image.freepik.com/free-photo/woman-typing-keyboard-laptop-account-login-screen-working-office-table-background-safety-concepts-about-internet-use_2034-1339.jpg"></img>
                        </div>
                        <form onSubmit={onSubmit} className="login-form">
                            <div className="title">LOGIN</div>
                            <div className="input">
                                <label>Username</label>
                                <input type="text" {...register("username", { required: true })} />
                            </div>
                            {errors.username?.type === 'required' &&
                                <div className="error">
                                    <p>Username is required</p>
                                </div>
                            }
                            <div className="input">
                                <label>Password</label>
                                <input type="password" {...register("password", { required: true })} />
                            </div>
                            {errors.password?.type === 'required' &&
                                <div className="error">
                                    <p>Password is required</p>
                                </div>
                            }
                            <div className="forgot">
                                <p>if can't remember password Cick Here!</p>
                            </div>
                            <div className="input">
                                {loading ?
                                    <button type="submit" disabled>LOADING...</button>
                                    : <button type="submit">Submit</button>}
                            </div>
                            {error &&
                                <div className="error">
                                    <p>{error.graphQLErrors[0].message}</p>
                                </div>
                            }
                        </form>
                    </div>

                </div> : <Redirect to="/" />}
        </LoginCSS >
    )
}
