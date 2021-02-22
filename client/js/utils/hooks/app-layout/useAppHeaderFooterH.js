import useViewportSizes from 'use-viewport-sizes';
import { useState, useLayoutEffect } from 'react';

/**
 * retrieves the size of the app header + app footer
 * so that content can be measured as the inverse
 * using CSS calc(100vh - negativeContentH[[px]])
 */
export default function useAppHeaderFooterH() {
    const [vpW, vpH] = useViewportSizes();
    const [height, setHeight] = useState(() => 0 );

    // measure the header and footer to size the
    // remaining paragraph area

    useLayoutEffect(() => {
        const header = document.querySelector('[data-id=app-header]');
        const footer = document.querySelector('[data-id=app-footer]');

        setHeight(
            header.getBoundingClientRect().height +
            footer.getBoundingClientRect().height
        );
    }, [vpW, vpH]);

    return height;
}
