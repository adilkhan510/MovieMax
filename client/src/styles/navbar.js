const styles = (theme)=>({
    root: {
        flexGrow: 1,
        background : theme.palette.yellow.main
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
        color : "#white"
    },
    img : {
        borderRadius : "100px",
        height : "60px",
        width : "60px",
    },
    toolbarMargin : {
        ...theme.mixins.toolbar
    }
})


export default styles