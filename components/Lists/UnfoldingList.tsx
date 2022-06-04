import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { TypographyColor } from '../../utils/constants';

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

interface UnfoldingListProps {
  title: string;
  items: { title: string, content: string | JSX.Element }[] | undefined;
  containerSx?: { [key: string]: string | number };
}

export function UnfoldingList(props: UnfoldingListProps) {

  const [open, setOpen] = React.useState(false);
  
  return (
    <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "1%" }}>
      <Paper elevation={0} sx={{ ...props.containerSx, width: "100%" }}>
        <FireNav component="nav" disablePadding sx={{ color: TypographyColor }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
              pb: open ? 2 : 0,
              paddingBottom: "3%"
            }}
          >
            <ListItemButton
              alignItems="flex-start"
              disableGutters
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary={props.title}
                primaryTypographyProps={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 'medium',
                  lineHeight: '20px',
                  mb: '2px',
                }}
                secondary={props.items?.map(item => item.title).join(", ")}
                secondaryTypographyProps={{
                  display: "flex",
                  justifyContent: "center",
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: '16px',
                  color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                  transition: '0.2s',
                }}
              />
            </ListItemButton>
            {open &&
              props.items?.map((item, i) => {
                return <ListItemButton
                  disableGutters
                  disableRipple
                  key={`$${item.title}-${i}`}
                  sx={{ 
                    padding: 0,
                    py: 0, minHeight: 32, 
                    color: 'rgba(255,255,255,.8)', 
                    display: "flex", 
                    justifyContent: "center" 
                  }}
                >
                  <ListItemText
                    primary={
                      <span style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        {item.title && <span >{item.title}</span>}
                        {item.title && <span>{item.content}</span>}
                        {!item.title && <span style={{ width: "100%" }}>{item.content}</span>}
                      </span>
                    }
                    primaryTypographyProps={{ 
                      fontSize: 14, 
                      fontWeight: 'medium', 
                      display: "flex", 
                      justifyContent: "center",
                    }}
                  />
              </ListItemButton>
            })}
          </Box>
        </FireNav>
      </Paper>
    </Box>
  );
}