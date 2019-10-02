import React, { 
    useState, 
    useMemo, 
    useCallback,
    useContext
} from 'react';
import C from 'color';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import DayNightSVGIcon from 'app-root/resources/svg-icons/DayNightSVGIcon';
import { ThemeContext } from 'app-root/ThemeContextProvider';

let themeTargets = {
    'light' : { 
        name : 'Dark',
        flipped : 'dark' 
    }, 
    'dark' : { 
        name : 'Light',
        flipped : 'light'
    }
};

const useStyles = makeStyles(({ palette : { text } }) => ({
    container : {
        cursor : 'pointer',
        fontSize : '18pt',
        height : '48px',
        '& svg ' : {
            width : '26px',
            height : '26px'
        },
        '&,& *': {
            color : text.secondary,
            fill :  text.secondary,
            stroke :  text.secondary
        }
    },
    '@global' : {
        ['.themeicon__star'] : {
            transformOrigin : '50% 50%',
            stroke : C(text.secondary).alpha(0).rgb()+'',
            strokeWidth : '2px'
        },
    
        ['.themeicon__moon'] : {
            stroke :  C(text.secondary).alpha(1).rgb()+'',
            fill : 'none'
        },
    
        ['.light .themeicon__star'] : { 
            transition : 'transform 0.35s ease-in 0.125s',
            stroke : C(text.secondary).alpha(0).rgb()+'',
        },
    
    
        ['.dark .themeicon__star'] : { 
            transition: 'transform 0.35s ease-in 0s',
            stroke: C(text.secondary).alpha(0).rgb()+'',
        },
    
        ['.light > .themeicon__moon'] : {
            opacity : 0,
            transformOrigin : '50% 52%',
            transform : 'scale(0.475)',
            transition : 'opacity 0.5s ease 0.25s, transform 0.25s linear 0s',
            stroke : C(text.secondary).alpha(1).rgb()+'',
            fill : 'none'
        },
    
        ['.dark > .themeicon__moon'] : {
            opacity : 1,
            transformOrigin : '50% 52%',
            transition : 'opacity 0.5s ease, transform 0.25s linear 0.20s',
            stroke : C(text.secondary).alpha(1).rgb()+'',
            fill : 'none'
        },
    
        ['.dark > .themeicon__sun'] : {
            opacity : '0',
            transition : 'opacity 0.75s ease 0.1s',
            stroke : C(text.secondary).alpha(1).rgb()+'',
            fill : 'none'
        },
    
        ['.light > .themeicon__sun'] : {
            opacity : 1,
            transition : 'opacity 0.75s ease 0.25s',
            stroke : C(text.secondary).alpha(1).rgb()+'',
            fill : 'none'
        },
    
        ['.light > .themeicon__stara1'] : {
            transform : 'scaleX(0.5) scaleY(0.6) translateX(29%) ' + 
                        'translateY(-50%) rotateZ(-108deg)'
        },
    
        ['.light > .themeicon__stara2'] : {
            transform : 'scaleX(0.5) scaleY(0.6) translateX(-75%) ' + 
                        'translateY(-25%) rotateZ(-290deg)'
        },
    
        ['.light > .themeicon__stara3'] : {
            transform : 'scaleX(0.5) scaleY(0.6) translateX(-75%) ' + 
                        'translateY(40%) rotateZ(50deg)'
        },
    
        ['.light > .themeicon__starb1'] : {
            transform : 'scaleX(0.7) scaleY(0.8) ' + 
                        'translateX(25%) translateY(3%) rotateZ(-65deg)'
        },
    
        ['.light > .themeicon__starb2'] : {
            transform : 'scaleX(0.7) scaleY(0.8) ' + 
                        'translateX(30%) translateY(40%) rotateZ(-60deg)'
        },
    
        ['.light > .themeicon__starb3'] : {
            transform : 'scaleX(0.7) scaleY(0.8) translateX(-5%) ' + 
                        'translateY(66%) rotateZ(-73.5deg)'
        }
    }
}), 'ThemeButton');

export default function ThemeButton () {
    const [isToggling, setIsToggling] = useState(false);
    const [themeState, setThemeState] = useState(()=> 'light');
    const { setThemeType, themeType } = useContext(ThemeContext);

    const classes = useStyles();

    /**
     * upon clicking, launch sequence to toggle
     * theme and provide some ample time
     * for animation transition to smoothly play out
     */
    const onClick = useCallback( e => {
        if(!isToggling) {
            setIsToggling(true);
            setThemeState(themeTargets[themeType].flipped);
            setTimeout(()=> {
                setThemeType(themeTargets[themeState].flipped);
                setIsToggling(false);
            }, 750);
        }

    }, [setThemeType, themeType, isToggling]);

    const tooltip = useMemo(()=> (
        <span>Switch to the&nbsp;
            <b>{themeTargets[themeState].name}</b> theme
        </span>
    ), [themeState]);

    return (
        <Tooltip enterDelay={ 400 } title={ tooltip } >
            <Button onClick={ onClick } className={ classes.container } > 
                <DayNightSVGIcon className={ themeState } />
            </Button>
        </Tooltip>
    );
}