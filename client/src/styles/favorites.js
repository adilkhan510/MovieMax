const styles = (theme)=>({
    container : {
        width : "100vw",
    },
    textContainer: {
        width: "100vw",
        display: "flex",
        justifyContent : "center",
        alignItems : "center",
        margin : "20px",
    },
    text : {
        background : theme.palette.yellow.main,
        padding : "10px"
    },
    text1 : {
        padding : "10px",
        background : theme.palette.primary.light,
    },
    typography : {
        color : "whitesmoke"
    },
    insideContainer : {
        width : "70vw",
        height : "70vh",
        margin : "0 15%"
    }
})

export default styles