const styles = (theme)=>({
    gridItems : {
        display: "flex",
        flexDirection : "row",
        justifyContent : "space-evenly",
        margin: "10px 0"
        
    },
    gridItem : {
        width : "100%",
        height: "100px",
        display : "flex",
        flexDirection : "row",
        justifyContent : "center",
        alignItems: "center",
        margin : "10px",
    },
    actorsContainer : {
        width : "100vw",
        margin: "15px 15px 15px 30px",
        flexGrow : 1,
        height : "auto"
    },
    movieContainer : {
        margin : "1rem"
    },
    movieInsideContainer : {
        width : "100%",
        padding : "1rem"
    },
    movieImageContainer : {
        maxWidth: "400px",
        padding : "1rem"
    },
    movieInfoContainer : {
    },
    title : {
        display : "flex",
        alignItems : "center",
        justifyContent : "space-between",
        width : "100%"
    },
    text : {
        color : "black"
    },
    header : {
        display : "flex",
        flexDirection : "column",
        background : theme.palette.secondary.light,
        width : "95vw"
    },
    smallInfo : {
        margin : "1rem 0rem",
        maxWidth: "600px"
    },
    smallInfoText : {
        color : "black",
        display : "flex",
        textAlign : "center"
    },
    genres: {
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-evenly",
        minWidth : "400px"
    },

    detailedContainer : {
        height : "100%",
        width : "100%",
        marginLeft : "7rem",
        marginTop : "1rem"
    },
    description : {
        padding : "2rem",
        lineHeight : "1.5rem"
    },
    productionCompanies : {
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-evenly",
        padding : "1rem"
    },
    pImg : {
        maxWidth : "70px",
        maxHeight : "80px"
    },
    production : {
        position : "relative",
        display : "flex",
        justifyContent : "flex-start",
        alignItems : "flex-start",
        top : "-0.5rem",
        left : "-2rem",
        maxWidth : "100px",
        background : theme.palette.yellow.main,
        borderRadius : "0px",
        padding : "0.3rem",
        border : "0.5px solid black"
    },
})

export default styles