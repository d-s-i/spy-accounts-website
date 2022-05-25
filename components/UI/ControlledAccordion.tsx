export {};
// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { GridContainer } from "./GridContainer";

// interface AccordionProps {
//     title: string,
//     description: string,
//     children?: React.ReactNode
// }

// export default function ControlledAccordion(props: AccordionProps) {
//   const [expanded, setExpanded] = React.useState<string | false>(false);

//   const handleChange =
//     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//       setExpanded(isExpanded ? panel : false);
//     };

//   return (
//     <div>
//       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <GridContainer boxSx={{ width: "100%", padding: "0% 0% 0% 2%" }}>
//             <Typography noWrap>{props.title}</Typography>
//             <Typography sx={{ marginLeft: "5%" }}>{props.description}</Typography>
//           </GridContainer>
//         </AccordionSummary>
//         <AccordionDetails>
//           {props.children}
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }