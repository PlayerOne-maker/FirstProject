import styled from 'styled-components'

export const Navbar = styled.div`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Condensed', sans-serif;
}

nav{
    background: #34b5e2;
    padding: 5px 20px;
    
}

ul{
    width: 80%;
    margin: auto;
    list-style-type: none;
}

a{
    color: white;
    text-decoration: none;
}

a:hover{
    text-decoration: underline;
}

.logo a:hover{
    text-decoration: none;
}

.menu li{
    font-size: 16px;
    padding: 15px 5px;
    white-space:nowrap;
}

.logo a, .toggle a{
    font-size: 20px;
}
    

.menu{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-item: center;
}

.toggle{
    order: 1;
}

.item{
    width: 100%;
    text-align:center;
    order: 3;
    display: none;
}

.item.active{
    display:block;
}

@media all and (min-width: 600px){
    .menu{
        justify-content: center;
    }

    .logo{
        flex: 1;
    }

    .toggle{
        flex: 1;
        text-align: right;
    }
}

@media all and (min-width: 900px){
    .item{
        display: block;
        width: auto;
    }

    .toggle{
        display:none;
    }
    
    .menu li{
        padding: 15px 15px;
    }
}
`