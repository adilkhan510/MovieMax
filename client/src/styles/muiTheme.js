import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette : {
        primary : {
            main : "#7B758F"
        },
        secondary : {
            main : "#E8E8E8"
        },
        warning : {
            main : "#9881DB"
        },
        success : {
            main : "#999571"
        },
        orange : {
            main : "#e76f51"
        },
        yellow : {
            main : "#FFF269"
        }
    },
    typography : {
        textTransform: "uppercase",
        letterSpacing: "-0.5px",
        color : "grey"
    }
})

export default theme