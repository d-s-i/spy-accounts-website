import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

interface expandedState {
  [key: string]: {
      value: boolean, 
      setTrue: () => void, 
      setFalse: () => void
  }
}


interface CustomizedAccordionProps {
  index: string;
  title: string;
  details: string | React.ReactNode;
  initiallyOpen: boolean;
  forceExpandAll: boolean;
  onExpandAllChange?: () => void;
  getStateForIndex?: (settersObject: expandedState) => void; 
  width?: string | number;
}

export function CustomizedAccordion(props: CustomizedAccordionProps) {
    const [expanded, setExpanded] = React.useState<boolean>(props.initiallyOpen);

    const changeHandler = function() {
      props.forceExpandAll && props.onExpandAllChange && props.onExpandAllChange();
      
      !props.forceExpandAll && setExpanded(prevState => {
        return !prevState;
      });
    }

    const setExpandedTrue = function() {
      setExpanded(true);
    }

    const setExpandedFalse = function() {
      setExpanded(false);
    }

    React.useEffect(() => {
      props.getStateForIndex && props.getStateForIndex({
        [props.index]: { value: expanded, setTrue: setExpandedTrue, setFalse: setExpandedFalse } 
      });
    }, [expanded]);
  
    return (
      <Accordion 
        expanded={expanded} 
        onChange={changeHandler} 
        sx={{ border: "1px #000000 solid", width: props.width || "100%" }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography component="span">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">{props.details}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  }
