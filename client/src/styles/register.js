const styles = ((theme)=>({
    root : {
        width : "100vw",
        height : "100vh",
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        transform : "translate(-5%,-5%)",
    },
    form : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        width : "15rem",
        height : "fit-content"
    },
    header : {
        ...theme.typography,
        fontSize : "1rem",
        fontWeight : "700"
    },
    items : {
        margin : "1rem 0"
    }
}))

export default styles