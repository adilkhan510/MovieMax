const styles = (theme)=>({
    main: {
        backgroundColor : theme.palette.secondary.main,
        width : "100%",
        height : "90vh",
    },
    moviesContainer : {
        width : "100vw",
        margin: "15px 15px 15px 30px",
        flexGrow : 1,
        height : "auto"
    },
    loadMore:{
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        marginBottom: "20px"
    }
})

export default styles