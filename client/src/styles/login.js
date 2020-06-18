const styles = (theme)=>({
    root : {
        width : "100vw",
        height : "100vh"
    },
    paper : {
        width : "400px",
        height : "50vh",
        padding : "10px",
        position : "relative",
        left : "50%",
        top : "50%",
        transform : "translate(-50%, -50%)"
    },
    form : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        height : "auto"
    },
    textField : {
        width : "100%",
        margin : "10px"
    },
    submit : {
        margin : "10px",
        background : "yellow"
    },
    avatar : {
        left : "45%",
        margin : "20px 0 20px 0"
    }
})

export default styles

