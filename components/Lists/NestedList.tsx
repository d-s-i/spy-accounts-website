import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Button from "@mui/material/Button";
import { TypographyColor } from '../../utils/constants';
import { Container } from '@mui/material';


interface NestedListProps {
    items: {
        title: string;
        content: string | React.ReactNode;
    }[] | undefined;
    initiallyOpen: boolean;
}

interface KeyBoolObj { [key: number]: boolean };

export function NestedList(props: NestedListProps) {
  const [open, setOpen] = React.useState<KeyBoolObj>({});
  const [isAllExpanded, setIsAllExpanded] = React.useState<boolean>(props.initiallyOpen);

  const handleClick = (index: number) => {
    setOpen((prevState) => {
        return { ...prevState, [index]: !prevState[index] };
    });
    setIsAllExpanded(false);
  };

  React.useEffect(() => {
      let openObj: KeyBoolObj = {};
      for(const i in props.items) {
        openObj[parseFloat(i)] = props.initiallyOpen;
      }
      setOpen((prevState) => {
          return { ...prevState, openObj };
      });
  }, []);

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
        <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button 
                variant="outlined" 
                size="small" 
                onClick={() => {
                    setIsAllExpanded((prevState) => {
                        let openObj: KeyBoolObj = {};
                        for(const i in props.items) {
                          openObj[parseFloat(i)] = !prevState;
                        }
                        setOpen(openObj);
                        return !prevState;
                    })
                }}
                sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }}
            >
                Expand All
            </Button>
        </Container>
        {props.items?.map((item, i) => {
            return (
                <React.Fragment key={item.title}>
                    <ListItemButton onClick={() => handleClick(i)}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary={item.title} />
                        {!open[i] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open[i] || isAllExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding >
                            <ListItemButton sx={{ pl: 4 }} disableRipple >
                                {item.content}
                            </ListItemButton>
                        </List>
                    </Collapse>
                </React.Fragment>
            );
        })}
    </List>
  );
}
