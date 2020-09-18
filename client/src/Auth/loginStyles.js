import { TheatersOutlined } from "@material-ui/icons"

const styles = (theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        overflow: "hidden"
    },
    container: {
        padding: "10px",
        margin: 'auto',
        marginTop: "10%"
    },
    form: {
        margin: "0",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        padding: '1em'
    },
    cardTitle: {
        textDecoration: "none",
        marginTop: "30px",
        marginBottom: "25px",
        minHeight: "32px",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
        marginTop: ".625rem",
        marginBottom: "0.75rem",
        minHeight: "auto",
        ...theme.typography,
        color: "white",
        fontSize: "1rem"
    },
    cardActions: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "150px"
    },
    cardHeader: {
        width: "auto",
        textAlign: "center",
        display: "flex",
        backgroundColor: theme.palette.primary.light,
        width: "90%",
        margin: "0 5%",
        position: "relative",
        justifyContent: "center"
    },
    items: {
        ...theme.typography,
        width: "200px",
        fontSize: "0.8rem",
        fontWeight: 700
    },
    card: {
        width: "250px",
        padding: "15px"
    }
})

export default styles