import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints }) => ({
    container: {
        display: 'flex',
        boxSizing: 'border-box',
        padding: '16px 48px 16px 48px',
        maxWidth: 'min(1600px, 100vw)',
        position: 'relative',
        flexDirection: 'column',
        flexGrow: 1,
        [breakpoints.up('md')]: {
            padding: '32px 48px 32px 48px'
        }
    }
}), { name: 'SectionBodyContainer' });

export default function SectionBodyContainer({ children, className }) {
    const classes = useStyles();

    return (
        <div className={ clsx(classes.container, className) }>
            { children }
        </div>
    );
}
