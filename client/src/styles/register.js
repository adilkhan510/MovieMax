const styles = ((theme)=>({
    root : {
        width : "80vw",
        height : "70vh",
        display : "flex",
        alignSelf: "center",
        justifyContent: "center",
        marginLeft : "4em",
        marginTop : "2em"
    },
    form : {
        display : "flex",
        flexDirection : "column",
        justifyContent : "center",
        width : "fit-content",
        height : "fit-content",
    },
    header : {
        ...theme.typography,
        fontSize : "1rem",
        fontWeight : "700"
    },
    items : {
        margin : "1rem 0",
    },
    paper : {
        width : "20em",
        height : "25em",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column",
        // position : "absolute",
        // left : "10%",
        // top : "15%",
        alignSelf : "center",
        [theme.breakpoints.up('sm')]: {
            width : "25em",
            height : "30em",
        }
    }
}))

export default styles