import style from 'styled-components'

export const HomeCSS = style.div`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Condensed', sans-serif;
    
}

.container{
    width: 80%;
    
    margin: auto;
    padding: 10px;
    margin-top : 10px;
    display: flex;
    justify-content: center;
}

.left-panel{
    display: flex;
    flex-direction: column;
}

.title{
    font-size: 24px;
    text-align: center;
}

.content{
    font-size: 18px;
    flex-wrap: wrap;
    padding: 10px;
}

.content div{
    padding: 5px;
}

.right-panel{
    display: flex;
    flex-direction: column;
}

@media all and (max-width: 600px) {
    .container{
        flex-direction: column;
    }
}
.calendar{
    width: 80%;
    margin: auto;
    margin-bottom: 20px;
}

.table{
    
    width: 90%;
    margin: auto;
    
}
`