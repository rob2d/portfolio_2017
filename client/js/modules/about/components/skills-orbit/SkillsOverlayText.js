import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { about as strings} from 'strings'
import skillPoints from 'constants/skillPoints'
import ValueBar from './ValueBar'

const useStyles = makeStyles( theme => ({
    container : {
        position       : 'absolute',
        bottom         : '0',
        width          : '180px',
        height         : '100%',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        pointerEvents  : 'none',
        flexDirection  : 'column',
        opacity        : p => (p.isVisible ? 1.0 : 0.0),
        transition     : p => `opacity 0.5s ease ${ !p.isVisible ? 1: 0 }s`,
        overflowX      : 'hidden',
        overflowY      : 'visible',
        color          : theme.rc3.text
    },
    textItem : {
        boxSizing      : 'border-box',
        display        : 'flex',
        width          : '100%',
        justifyContent : 'flex-end',
        alignItems     : 'center',
        height         : (Math.round(100/skillPoints.length) * 0.62) + '%'
    },
    namespace : {
        display        : 'flex',
        flexDirection  : 'row',
        width          : '75%',
        justifyContent : 'flex-start',
        fontFamily     : 'roboto_light',
        fontSize       : '11pt'
    },
    value : {
        display        : 'flex',
        flexDirection  : 'row',
        width          : '25%',
        justifyContent : 'flex-end',
        fontFamily     : 'roboto_regular',
        fontSize       : '11pt'
    }
}));

export default function SkillsOverlayText({ isVisible }) {
    const classes = useStyles({ isVisible });
    let skillStrings = strings.skills;

    const skillContent = useMemo(()=> (
        skillPoints.sort((sp1, sp2)=> (
            sp2.value-sp1.value
            )).map(({ namespace, value }, index) => (
            <React.Fragment key={`skillText_${namespace}_${index}`}>
                <div className={ classes.textItem }>
                    <p className={ classes.namespace }>
                        { skillStrings[namespace] } 
                    </p> 
                    <p className={ classes.value }>
                        { parseFloat(value).toFixed(2) }
                    </p>
                </div>
                <ValueBar 
                    isVisible={isVisible}
                    value={value} 
                    index={index} 
                />
            </React.Fragment>
        ))
    ), [classes, skillPoints]);

    return (
        <div className={ classes.container }>
            { skillContent }
        </div>
    );
}