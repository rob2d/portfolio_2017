import React, { useMemo, useCallback, useReducer } from 'react';
import C from 'color';
import { makeStyles, useTheme } from '@material-ui/styles';
import PDF from 'react-pdf-js';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import shouldShowHoverContent from 'utils/shouldShowHoverContent';
import PDFViewerNav from './PDFViewerNav';
import { Icon } from '@mdi/react';
import { mdiDownload } from '@mdi/js';

const useStyles = makeStyles(({ palette : { 
    secondary, common, type 
} }) => ({ 
    container : {
        position : 'relative',
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        height : 'auto',
        minHeight : '60px',
        alignItems : 'center',
        justifyContent : 'center',
        paddingTop : '32px',
        paddingBottom : '16px'
    },
    pdfContent : {
        display : 'inline-block',
        padding : 0,
        margin : 0,

        // resize pdf height according to 8.5x11
        
        '@media (max-width: 900px)': {
            maxWidth : '100%',
            height : 'auto !important'
        },
        '@media (min-width: 900px)': {
            width : '100%',
            maxWidth : '800px',
            height : 'auto !important'
        }
    },
    downloadP : {
        paddingLeft : '12px',
        paddingBottom : '12px',
        paddingTop : '12px'
    },
    downloadIcon : {
        fontSize : '24pt',
        color : common.white,
        fill : common.white,
        width : 'auto',
        height : '32px'
    },
    downloadButtonContainer : {
        position : 'fixed',
        bottom : '48px',
        right : '48px',
        '@media (max-width: 800px)': {
            bottom : '24px !important',
            right : '24px !important',
        }
    },
    downloadButton : {
        backgroundColor : secondary.main,
        color : common.white,
        '&:hover' : {
            backgroundColor : C(secondary.main).lighten(0.2).rgb()+''
        },
        '&:active' : {
            backgroundColor : common.active
        }
    },
    pdfContainer : {
        display : p => p.isLoading ? 'none' : 'block',
        filter : ( l => 
            `hue-rotate(${l?0:195}deg) ` + 
            `invert(${l?0:100}%) ` + 
            `saturate(${l?100:150}%) ` + 
            `brightness(${l?100:85}%)`
        )(type == 'light'),
        transitionDelay : '3s'
    }
}), { name : 'PDFViewer' });

const initialState = {
    pagenumber : 1,
    pageCount : 0,
    isLoaded : false,
    isRetriggering : false
};

function reducer (state={ initialState }, action) {
    const { type, payload } = action;

    switch(type) {
        case 'go-to-next-page': {
            return { ...state, pageNumber : (state.pageNumber + 1) };
        }
        case 'go-to-prev-page': {
            return { ...state, pageNumber : (state.pageNumber - 1) };
        }
        case 'load-content' : {
            return { ...state, isLoaded : true };
        }
        case 'unload-content' : {
            return { ...state, isLoaded : false };
        }
        case 'handle-document-complete' : {
            return { ...state, 
                pageCount : payload,
                pageNumber : 1,
                isLoaded : true 
            };
        }
        default : {
            return state;
        }
    }
}

export default function PDFViewer ({ fileURL }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const classes = useStyles({ isLoading : state.isLoading });
    const theme = useTheme();

    const handlePrevPage = useCallback( ()=>
        (state.pageNumber > 1) && 
            dispatch({ type : 'go-to-prev-page' })
    , [state.pageNumber]);

    const handleNextPage = useCallback( ()=> 
        (state.pageNumber < state.pageCount) && 
        dispatch({ type : 'go-to-next-page' })
    , [state.pageNumber, state.pageCount]);

    const onPageComplete = useCallback( pageNumber => 
        dispatch({ 
            type : 'handle-page-complete', 
            payload : pageNumber 
        }), 
    []);

    const onDocumentComplete = useCallback( pageCount => 
        dispatch({ 
            type : 'handle-document-complete',
            payload : pageCount
        }), 
    []);

    const downloadIcon = useMemo(()=> ( 
        <Icon path={ mdiDownload } className={ classes.downloadIcon } />
    ), [classes.downloadIcon]);

    const pdfContent = useMemo(()=> (
            <PDF file={ fileURL }
                onDocumentComplete={ onDocumentComplete }
                onPageComplete={ onPageComplete }
                page={ state.pageNumber }
                className={ classes.pdfContent }
            />
    ), [
        classes.pdfContent, 
        onDocumentComplete,
        onPageComplete, 
        state.pageNumber
    ]);
    
    return (
        <div className={ classes.container }>
            <div className={ classes.pdfContainer }>
                { pdfContent }
            </div>
            <a
                href={ fileURL }
                download={ 'RobertConcepcionResume' }
                className={ classes.downloadButtonContainer }>
                { shouldShowHoverContent ? 
                (
                    <Tooltip
                        id={ `resume-pdf-download-tooltip` }
                        enterDelay={ 400 } 
                        title={ `Download this PDF` }
                    >
                        <Fab 
                            className={ classes.downloadButton }
                            data-tip data-for={`resume-pdf-download-tooltip`}                        
                        >{ downloadIcon }
                        </Fab>
                    </Tooltip>
                ) : (
                <Fab className={ classes.downloadButton }>
                { downloadIcon }
                </Fab>
                )}
            </a>
            <PDFViewerNav
                pageNumber={ state.pageNumber }
                pageCount={ state.pageCount }
                handleNextPage={ handleNextPage }
                handlePrevPage={ handlePrevPage }
                isLoaded={ state.isLoaded }
                theme={ theme }
            />
        </div>
    );
}