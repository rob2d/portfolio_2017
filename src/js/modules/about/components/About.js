import React, { Component } from 'react'
import { connect } from 'react-redux'
import pure from 'recompose/pure'
import injectSheet from 'react-jss'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { about as strings } from 'strings'
import Avatar from 'material-ui/Avatar'

const styleSheet = {
    mainContainer : {
        marginLeft     : 'auto',
        marginRight    : 'auto',
        maxWidth       : '700px',
        flexGrow       : 1,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
        padding        : '16px',
        alignItems     : 'center',
        boxSizing      : 'border-box' // for padding in landscape
    },
    pText : {
        paddingLeft  : '16px',
        paddingRight : '16px',
        textAlign    : 'left'
    },
    wipNote : {
        fontStyle : 'italic',
        fontSize : '10pt !important'
    },
    sig : {
        textAlign : 'right !important',
        marginRight : '72px !important'
    },
    avatar : {
        width  : '128px',
        height : '128px',
        margin : '32px auto'
    },
    '@media (max-width: 700px) and (min-width : 341px) and (orientation:portrait)': {
        // don't want the avatar to dominate the 
        // mobile screen :)
        avatar : {
            margin : '24px auto 16px !important',
            width : '116px !important',
            height: '116px !important'
        }
    },
    '@media (max-width: 340px) and (orientation:portrait)': {
        // accomodations for micro phones like iP5
        avatar : {
            margin : '16px auto 8px !important',
            width : '80px !important',
            height: '80px !important'
        }
    },
    '@media (orientation:landscape)': {
        avatar : {
            margin : '16px 16px 8px !important',
            marginLeft  : '16px',
            marginRight : '16px'
        },
        mainContainer : {
            flexDirection : 'row !important',
            boxSizing : 'border-box'
        }
    },
    // for general mobile devices in landscape
    '@media (orientation:landscape) and (max-width:900px)': {
        avatar : {
            width : '80px !important',
            height: '80px !important',
        },
        pText : {
            fontSize : '11pt'
        }
    },
    // again, for iPhone 5
    '@media (orientation:landscape) and (max-height:320px)': {
        pText : {
            marginTop : '8px',
            marginBottom : '8px'
        }
    },
    // make certain things larger on non-mobile devices
    '@media (min-width:901px)' : {
        avatar : {
            width : '180px !important',
            height: '180px !important'
        },
        mainContainer : {
            maxWidth : '800px !important'
        },
        pText : {
            paddingLeft  : '32px !important',
            paddingRight : '32px !important',
            fontSize     : '14pt !important'
        },
        wipNote : {
            fontSize : '12pt !important'
        }
    }
};

function About ({ classes }) {
    return (
        <div className={classes.mainContainer}>
            <Avatar alt={'Rob'} src="img/about/robtalk.jpg" className={classes.avatar}/>
            <div className={classes.textContent}>
                <p className={classes.pText}>
                    {strings.aboutThisSite}
                </p>
                <p className={classes.pText}>
                    {strings.toClickHere}
                    <a href="http://www.github.com/rob2d/portfolio_2017">
                        {strings.linkClickHere}
                    </a>.
                </p>
                <p className={`${classes.pText} ${classes.wipNote}`}>
                    {strings.thisIsWIP}
                </p>
                <p className={`${classes.pText} ${classes.sig}`}>
                    {strings.sig}
                </p>
            </div>
        </div>
    );
};

let VisibleAbout = pure(injectSheet(styleSheet)(connect(
    (state,ownProps)=> ({ language : state.core.language }),
    null
)(About)));
export default VisibleAbout;