const styles = (theme)=>({
    root: {
        flexGrow: 1,
        background : theme.palette.success.light
    },
    title: {
        flexGrow: 1,
        color : "#ffffff"
    },
    tabsContainer : {
        marginLeft : "auto"
    },
    tab : {
        fontSize : "1rem",
        textTransform : "none",
        fontWeight : "700",
        minWidth : "10",
        color : "#000000"
    },
    img : {
        borderRadius : "100px",
        height : "60px",
        width : "60px",
        padding: "5px"
    },
    toolbarMargin : {
        ...theme.mixins.toolbar
    }
})


export default styles