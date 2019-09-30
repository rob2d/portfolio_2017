import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import LoadingComponent from 'utils/components/LoadingComponent';
import { 
    mdiSkipPrevious,
    mdiSkipNext
} from '@mdi/js';
import Icon from '@mdi/react';

const useStyles = makeStyles( theme => ({
    container : {
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        fontSize : '13pt',
        width : '100%',
        textAlign : 'center',
        marginTop : '16px',
        color : theme.rc3.text,
        '& > *:nth-child(1)' : {
            alignItems : 'flex-end'
        },
        '& > *:nth-child(3)' : {
            alignItems : 'flex-start'
        }
    },
    progress : {
        display : 'block',
        height : 'auto'
    },
    button : {
        position : 'relative',
        display : 'inline-flex',
        justifyContent : 'center',
        height : '100%',
        fontSize : '17pt',
        minWidth : '48px'
    }
}), { name : 'PDFViewerNav' });

export default function PDFViewerNav ({
    pageNumber, pageCount, isLoaded, 
    handleNextPage, handlePrevPage
}) {
    const classes = useStyles();

    return (
        isLoaded ? 
        (
            <div className={ classes.container }>
                <Button
                    className={ classes.button }
                    disabled={ !(pageNumber > 1) }
                    onClick={ handlePrevPage }
                ><Icon
                    path={ mdiSkipPrevious }
                    size={ 1 }
                />
                </Button>
                <div>{
                    ( pageCount > 0 ) ?
                    `${pageNumber} / ${pageCount}` : 
                    '' 
                }
                </div>
                <Button
                    className={ classes.button }
                    disabled={ !(pageNumber < pageCount) }
                    onClick={ handleNextPage }
                ><Icon
                    path={ mdiSkipNext }
                    size={ 1 }
                />
                </Button>
            </div>
        ) : (
            <div className={classes.container}>
                <div className={classes.linearProgress}>
                    <LoadingComponent />
                </div>
            </div>
        )
    );
}