import React from 'react'
import injectSheet from 'react-jss'

function calculateBorderEdge ({ index, buttonWidth }) {
    if(index == -1) {
        return '6px solid transparent';
    } else {
        return `${(buttonWidth/2)}px solid #c51162`;
    }
}

function getHeight (index) {
    return (index!=-1)?4:6;
}

const styleSheet = {
    sectionHighlighter : {
        position : 'absolute',
        width : '0px',
        height: '0px',
        borderLeft : calculateBorderEdge,
        borderRight : calculateBorderEdge,
        borderBottom : ({ index })=>(
            `${getHeight(index)}px solid #c51162`
        ),
        // we'll need to offset the button based on
        // its position because of discrepencies between
        // chrome/firefox/ie

        // we also offset based on whether a project
        // is selected (currently, if index == -1 or not)
        top : ({ appBarHeight, index })=>(
            appBarHeight - getHeight(index)
        ),
        // shift the left position towards the last active
        // known button (+4px) when that is available
        left : ({ lastKnownIndex, buttonXPositions, leftPadding=0 }) => {
            return (
                (buttonXPositions && 
                buttonXPositions.hasOwnProperty(lastKnownIndex) && 
                        ((buttonXPositions[lastKnownIndex] )+parseInt(leftPadding) )+'px')
        )},
        transform : 'translateX(-50%)',
        opacity : 1,
        transition : 'left 0.55s ease-out 0.25s, opacity 0.4s, ' +
                     'border-color 0.27s linear, border-left 0.27s linear, ' + 
                     'border-right 0.27s linear, border-bottom 0.27s linear, ' + 
                     'bottom 0.27s linear'
    }
}
function SectionHighlighter ({ buttonXPositions, index, lastKnownIndex, classes }) {
    return (<div className={classes.sectionHighlighter}></div>);
}

export default injectSheet(styleSheet)(SectionHighlighter);