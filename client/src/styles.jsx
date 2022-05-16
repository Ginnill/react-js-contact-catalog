import styledComponents, { css } from "styled-components";

// colors
// components
const BaseHeaderFooter = css`
  padding: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  background: linear-gradient(45deg, white, #e6e6e6);
`;

// Header
export const MainHeader = styledComponents.header`
    ${BaseHeaderFooter}

    .logo{
        letter-spacing: 5px;
        font-size: 25px;
        font-weight: 500;
        text-transform: uppercase;
    }
`;

// Footer
export const MainFooter = styledComponents.footer`
    ${BaseHeaderFooter}    
`;

// Form

export const FormCard = styledComponents.form`
    padding: 50px;
    border: 1px solid #d6d6d6;

    @media (max-width: 500px) {
        padding: 20px;
    }

    .form-head{
        text-align: center;
        margin-bottom: 50px;

        .title{
            font-weight: 500;
            margin-bottom: 20px;
        }
    }

    .form-body .input-box{
        margin-bottom: 30px;
        position: relative;

        .input-text{
            padding: 15px 15px;
            border: 1px solid #d6d6d6;
            width: 100%;
            outline: 0;
            transition: border 333ms ease-in-out;
            &:hover{
                border-color: silver;
            }

            &:focus{
                border-color: #a9a9a9;
            }
        }
        
        label{
            position: absolute;
            top: -10px;
            left: 15px;
            background: white;
            font-weight: 100;
            padding: 0 5px;
        }
    }
    
    .button-box {
        display: flex;
        justify-content: end;
        gap: 20px;

        .button,.reset,.delete {
        padding: 15px 25px;
        border: none;
        outline: none;
        background: dodgerblue;
        color: white;
        cursor: pointer;
        transition: background 333ms ease-in-out, transform 100ms ease-in-out;

            &:hover {
                background: #1776d5;
            }

            &:focus{
                transform: scale(.9);
            }
        }

        .reset{
            background: #d6d6d6;
            color: #202020;

            &:hover {
                background: #a9a9a9;
            }
        }

        .delete{
            background: red;
            color: white;

            &:hover {
                background: #d80404;
            }
        }
    }
`;

// dashboard
export const DashboardHeader = styledComponents.div`
    margin: 0;
    padding: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const Title = styledComponents.h1`
    letter-spacing: 3px;
    font-size: 20px;
`;

export const LinkLogout = styledComponents.p`
a{  
        display: flex;
        gap: 5px;
        font-size: 16px;
        color: red;
        text-decoration: none;
        line-height: 1;
        &::after{ 
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='red' class='bi bi-box-arrow-right' viewBox='0 0 16 16' %3E%3Cpath fill-rule='evenodd' d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z' /%3E%3Cpath fill-rule='evenodd' d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z' /%3E%3C/svg%3E");
        }
    }
`;

// dashboard contact

export const GridHeader = styledComponents.div`
    margin: 30px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
    button{
        background: dodgerblue;
        color: white;
        padding: 10px 20px;
        border: none;
        outline: 0;
        cursor: pointer;
        transition: background 333ms ease-in-out;
        &:hover{
            background: #1a7cde;
        }
    }
`;

export const GridContainer = styledComponents.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;

    @media (max-width: 960px){
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 720px){
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 540px){
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const Card = styledComponents.div`
    background: #f8f8f8;
    padding: 50px 20px;
    display: grid;
    justify-content: center;
    gap: 15px;
    transition: box-shadow 300ms ease-in-out;
    &:hover{
        box-shadow: 0px 30px 45px -15px silver;
    }

    img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
        margin: 0 auto;
    }

    *{
        text-align: center;
    }

    .body{
        
        .title{
            font-size: 20px;
        }
        .title, p{
            margin: 10px 0
        }
        p{
            line-break: anywhere;
        }
    }

    button{
        margin-top: 15px;
        padding: 10px 30px;
        background: dodgerblue;
        border: none;
        color: white;
        outline: 0;
        cursor: pointer;
        transition: background 333ms ease-in-out;
        &:hover{
            background: #1e7ede;
        }
    }
`;

// Dashboard Modal

export const ModalContainer = styledComponents.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: opacity 333ms ease-in-out;
    z-index: 10;
    overflow: auto;

    &.show{
        display: flex;
    }

    &.hidden{
        display: none;
    }

    @keyframes opacity {
        from {
          opacity: 0;
        }
      
        to {
          opacity: 1;
        }
    }
`;

export const ModalCard = styledComponents.div`
    background: #f8f8f8;
    padding: 20px;
    position: relative;
`;

export const ModalClose = styledComponents.button`
    background: red;
    color: #f8f8f8;
    border: none;
    outline: 0;
    padding: 10px 15px;
    font-size: 13px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
`;
