const styles = (theme)=>({
    root: {
        flexGrow: 1,
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
        height : "65px",
        width : "65px",
        marginTop : "10px"
    },
    toolbarMargin : {
        ...theme.mixins.toolbar
    }
})


export default styles