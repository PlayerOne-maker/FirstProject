import styled from 'styled-components'

export const LoginCSS = styled.div`
    
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto Condensed', sans-serif;
        
    }

    .container {
        display: flex;
        height: 100vh;
        justify-content: center;
      }

    .container .Bg {
        background-color: #ff9e2c;
        flex: 1;
      }

    .container .Bg img{
        width: 100%;
        height: 100%;
      }

      .login-form {
        justify-content:center;
        flex: 1;
        display: flex;
        flex-direction: column;
        
      }

      .login-form .title {
        margin-top: 20px;
        font-size: 36px;
        text-align:center;
        padding: 0 0 10px 0;
      }
      
      .login-form .input {
        margin-top: 10px;
        text-align:center;
        
      }

      .login-form .input label{
        font-size: 24px;
        text-align:center;
        padding: 25px 10px 25px 0;
      }

      .login-form .input input{
        width: 40%;
        padding: 12px 20px;
        border: 1px solid #555;
        border-radius: 15px 15px 15px 15px;
        background-color: #f1f1f1;
      }
      
      .login-form .forgot p{
        text-align: center;
      }
      
      .login-form .error p{
        text-align: center;
        color: red;
      }

      .login-form .input button{
        font-size: 18px;
        width: 30%;
        margin-bottom: 20px;
        padding: 12px 20px;
        border: 1px solid #555;
        border-radius: 15px 15px 15px 15px;
        background-color: #f1f1f1;
      }

      .login-form .input button:hover{
        background-color: #e0f3ff;
      }

      @media all and (max-width: 600px) {
        .container {
            display: flex;
            height: 100vh;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
    
        .container .Bg {
            position: relative;
            background-color: #ff9e2c;
            flex: 1;
          }
    
        .container .Bg img{
            width: 100%;
            height: 100%;
          }
    
          .login-form {
            position: absolute;
            width:90%;
            justify-content:center;
            flex: 1;
            display: flex;
            background : rgb(255 255 255 / 0.9);
          }

          .login-form .input label{
            font-size: 18px;
            text-align:center;
            padding: 25px 10px 25px 0;
          }

          .login-form .input input{
            width: 60%;
            padding: 12px 20px;
            border: 1px solid #555;
            border-radius: 15px 15px 15px 15px;
            background-color: #f1f1f1;
          }
      }
`