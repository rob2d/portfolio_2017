import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import pure        from 'recompose/pure'
import ButtonBase  from '@material-ui/core/ButtonBase'
import Themes      from 'constants/Themes'
import appHistory  from 'utils/appHistory'
import injectSheet from 'react-jss'
import Tooltip   from '@material-ui/core/Tooltip'


const styleSheet = {
    touchRipple : {
        color : ({ theme }) => ((theme == Themes.LIGHT) ? 
            '#000000' : '#FFFFFF'
        )
    },
    tooltip : {
        fontSize : '11pt',
        padding  : '4px 8px',
        minHeight: '20px',
        lineHeight: '20px'
    }
};

function ButtonLink ({ 
    url, 
    classes,
    containerClass, 
    children, 
    title=undefined,
    delay=250 
}) {
    let isAbsoluteURL = url.indexOf('://') != -1;

    const onClick = function(e){ 
        
        // keep synthetic event's reference
        // for duration of timeout 
        
        e.persist();

        // provide a small timeout so 
        // that animation can be seen
        
        setTimeout(function() {
            appHistory.goTo(url, e);
        }, delay);
    };

    title = title || (
        isAbsoluteURL ? `${url}` : undefined
    );

    const ButtonContent = (
        <ButtonBase 
                focusRipple 
                className={ containerClass }
                onMouseDown={ onClick }
                TouchRippleProps={{
                    classes : { ripple : classes.touchRipple }
                }}
            >{ children }
            </ButtonBase>
    );

    if(title && title.length) {
        return (
            <Tooltip
                enterDelay={ 600 }
                title={ title }
                classes={{ tooltip : classes.tooltip }}
            >
            {ButtonContent}
            </Tooltip>
        );
    } else {
        return ButtonContent;
    }
}

export default pure(connect(({ core }) => 
    ({ theme : core.theme }))
    (injectSheet(styleSheet)(ButtonLink))
);