import React from 'react'
import connect from 'react-redux/lib/connect/connect'
import pure from 'recompose/pure'
import { withStyles } from 'material-ui/styles'

/**
 * usage : connectPureWithStyles(styleSheet)(connectParams)(component)
 * @param styleSheet
 * @returns {function(*=)}
 */
export const connectPureWithStyles = (styleSheet)=>
{
    const styleWrapper = withStyles(styleSheet);
    return (connectParams)=> {
        return (component)=>(pure(connect(connectParams)(component)));
    };
};

export default {
    connectPureWithStyles
}