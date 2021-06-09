import styled from 'styled-components'

export const ModalCSS = styled.div`
.modal {
    position: fixed; /* Stay in place */
    z-index: 11; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

  }
  
  .modal-close {
    display: none; /* Hidden by default */
  }
  
  /* Modal Content */
  .modal-content {
    border-radius: 10px;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
  }

  .modal-content .content{
    display: flex;
    justify-content: center;
  }
  
  .modal-content .content .Selection{
    width: 50%;
  }

  .header{
    font-size: 26px;
    text-align: center;
    margin-bottom: 10px;
  }

  .modal-content .content button{
    width: 50%;
    color: white;
    border: none;
    font-size: 20px;
    padding: 5px;
    width: 200px;
    border-radius: 10px;
    background-color: #268AFF;
    transition: all 0.5s;
    cursor: pointer;
  }

  .modal-content .content button:hover{
    background-color: #4eb7d9;
  }
  
  .modal-content .content .des{
    width: 33%;
  }

  .modal-content .content .des select{
    width: 100%;
  }

  .modal-content .content div{
    width: 50%;
  }
  .modal-content .content .input{
    width: 50%;
    padding: 5px;

  }

  .modal-content .error{
    color: red;
    text-align: center;
  }

  /* The Close Button */
  .close {
    color: white;
    float: right;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 85px;
    right: 34.3%;
    width: 30px;
    text-align:center;
    border-radius: 25px;
    background-color: #268AFF;
  }
  
  .close:hover,
  .close:focus {
    text-decoration: none;
    cursor: pointer;
    background-color: #4eb7d9;
  }

  @media all and (max-width: 600px) {
    .modal-content {
      width: 80%;
    }

    .close { 
      right: 7%;
    }
  }
`

