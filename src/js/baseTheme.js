import { createMuiTheme } from '@material-ui/core/styles'
import { indigo, teal, lightGreen, red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: 
    {
        primary: indigo, // Purple and green play nicely together.
        accent: lightGreen,
        error: red,
        "accent": {
            "50"  : "#e8eaf6",
        "100" : "#c5cae9",
            "200" : "#9fa8da",
            "300" : "#7986cb",
            "400" : "#5c6bc0",
            "500" : "#3f51b5",
            "600" : "#3949ab",
            "700" : "#303f9f",
            "800" : "#283593",
            "900" : "#1a237e",
            "A100": "#8c9eff",
            "A200": "#536dfe",
            "A400": "#3d5afe",
            "A700": "#304ffe",
            "contrastDefaultColor": "light"
        },
    },
    overrides : {
        MuiToolbar : {
            root : {

            }
        },
        MuiAppBar : {
            colorPrimary : {
                color : '#FFFFFF',
                backgroundColor : '#000000'
            }
        }
    }
});

export default theme;