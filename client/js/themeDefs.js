import C from 'color';
import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import deepMerge from 'utils/themer/deepMerge';
import createDerivedTheme from 'utils/themer/createDerivedTheme';

let themeDefs = {
    light : [],
    dark : []
};

const commonRules = {
    overrides : {
        MuiTooltip : {
            popper : {
                fontSize : '11pt',
                padding  : '4px 8px',
                minHeight: '20px',
                lineHeight: '20px'
            }
        },
        MuiTypography : {
            body1 : {
                fontFamily : 'roboto_light',
                fontSize : '0.95rem'
            }
        },
        MuiAppBar : {
            colorPrimary : {
                position : 'relative',
                minHeight : '56px',
                transition : '0.5s all'
            },
            positionFixed : {
                
                // started off with previous version,
                // so this keeps things playing nicely

                position : 'relative'
            }
        },
        MuiPaper : {
            elevation1 : { // for card anims
                boxShadow : 'none'
            }
        },
        MuiTooltip : {
            tooltip : {
                fontSize : '11pt',
                padding  : '4px 8px',
                letterSpacing : '0.04rem',
                minHeight: '20px',
                lineHeight: '20px'
            },
            popper : {
                opacity : 0.74
            }
        }
    }
};

themeDefs.light.push({
    palette : {
        type : 'light',
        primary : {
            main : grey['900'],
            dark : '#000'
        },
        secondary : {
            main : '#ec407a',
            dark : '#c51162'
        },
        common : {
            white : '#FFF',
            background1 : '#FFF',
            active : '#00b8d4',
            shadow : '#000',
            contrast : '#000'
        },
        text : {
            primary : '#000',
            secondary : '#455A64'
        }
    },
    overrides : {
        MuiTooltip : {
            popper : {
                fontSize : '11pt',
                padding  : '4px 8px',
                minHeight: '20px',
                lineHeight: '20px'
            }
        },
        MuiTypography : {
            body1 : {
                fontFamily : 'roboto_light',
                fontSize : '0.95rem'
            }
        }
    }
});

themeDefs.dark.push({
    type : 'dark',
    palette : {
        primary : {
            main : grey['A100'],
            dark : grey['800']
        },
        secondary : {
            main : '#ec407a',
            dark : '#c51162'
        },
        common : {
            background1 : '#000',
            white : '#FFF',
            active : '#00b8d4',
            shadow : '#787878',
            contrast : '#FFF'
        },
        text : {
            primary : '#FFF',
            secondary : '#616161'
        }
    },
    overrides : {
        MuiTooltip : {
            popper : {
                fontSize : '11pt',
                padding  : '4px 8px',
                minHeight: '20px',
                lineHeight: '20px'
            }
        },
        MuiTypography : {
            body1 : {
                fontFamily : 'roboto_light',
                fontSize : '0.95rem'
            }
        }
    }
});

Object.keys(themeDefs).forEach( type => {

    // assign base palette type field
    // for MUI  (light/dark)

    themeDefs[type][0].palette.type = type;

    // apply rules in common
    
    themeDefs[type][0] = deepMerge(
        commonRules, 
        themeDefs[type][0]
    );
    
});

// generate next layer rules based 
// on themes/common definitions 

Object.keys(themeDefs).forEach( type => {
    const [{ 
        palette : { primary, secondary, common, text } 
    }] = themeDefs[type];

    themeDefs[type].push({
        overrides : {
            MuiAppBar : {
                colorPrimary : {
                    backgroundColor : primary.dark,
                    '& .MuiButton-root' : {
                        backgroundColor : C(common.white).alpha(0).rgb()+'',
                        transition : 'background-color 0.40s ease'
                    },
                    '& .MuiButton-root:hover' : {
                        backgroundColor : C(common.white).alpha(0.16).rgb()+'',
                    }
                }
            },
            MuiCircularProgress : {
                root : {
                    color : secondary.main
                },
                colorPrimary : {
                    color : text.primary
                }
            },
            MuiPaper : {
                root : {
                    backgroundColor : common.background1
                },
                elevation4 : {
                    boxShadow : `0px 2px 4px -1px ${C(common.shadow).alpha(0.2)}, ` + 
                                `0px 4px 5px 0px ${C(common.shadow).alpha(0.14)}, ` + 
                                `0px 1px 10px 0px ${C(common.shadow).alpha(0.12)}`
                }
            },
            MuiTooltip : {
                tooltip : {
                    backgroundColor : primary.dark
                }
            }
        }
    })
});

const themes = {};

/**
 * grabs a theme; otherwise creates and caches a theme
 * corresponding to the theme entered
 */
const getTheme = theme => {
    if(!themes[theme]) {
        themes[theme] = createMuiTheme(
            createDerivedTheme(themeDefs[theme])
        );
    }

    return themes[theme];
};

export default { themes, themeDefs, getTheme }
export { themes, themeDefs, getTheme }