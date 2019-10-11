import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { Icon } from '@mdi/react';
import C from 'color';

const useStyles = makeStyles(({ palette : { common } }) => ({
    container : {
        display : 'block'
    },
    button : {
        display : 'block',
        height : 'auto',
        lineHeight : '24px',
        padding : '8px',
        minWidth : '60px',
        '& > *' : { // icon content
            position : 'relative',
            display : 'block',
            top : '2px',
        },
        '& svg' : {
            fontSize : '18pt',
            fill : '#FFF'
        }
    },
    '@media (max-width: 400px)': {
        button : { minWidth : '68px' }
    }
}), 'HeaderSectionButton');

export default function HeaderSectionButton({
    onClick, domId, name,
    iconPath, tooltipText,
    buttonDivRef, disabled
}) {
    const classes = useStyles();

    return (
        <div
            ref={ buttonDivRef }
            className={ classes.container }
        >
            <Tooltip
                enterDelay={ 400 }
                title={ tooltipText }
            >
                <Button
                    className={ classes.button }
                    disabled={ disabled }
                    id={ domId }
                    onMouseDown={ onClick }
                    variant={ 'text' }
                >
                    <Icon
                        path={ iconPath }
                        size={ 1.025 }
                    />
                </Button>
            </Tooltip>
        </div>
    );
}
