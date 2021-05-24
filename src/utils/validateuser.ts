export const validdateUser = (username : string) => {

    const fmtusername = username.trim().toLowerCase()

    return  fmtusername.length >= 3 && fmtusername.length <= 30
}

export const validdateEmail = (email : string) => {
    const fmtemail = email.trim().toLowerCase()

    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return emailregex.test(fmtemail)
}

export const validdatePassword = (password : string) => {
     
    return  password.length >= 6 && password.length <= 30
}