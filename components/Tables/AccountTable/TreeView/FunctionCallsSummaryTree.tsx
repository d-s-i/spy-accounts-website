import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import { useNetworkContext } from "../../../../context/network-context";;

import { CallsSummary } from "../../../../types";
import { TypographyColor } from "../../../../utils/constants";

interface FunctionCallsSummaryTreeProps {
    callsSummary: CallsSummary;
}

export function FunctionCallsSummaryTree(props: FunctionCallsSummaryTreeProps) {

  const networkContext = useNetworkContext();
  
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [callsSummary, setCallsSummary] = React.useState<{ name: string, amount: string, addresses: string[] }[]>([]);
  
  React.useEffect(() => {
    let listItems = [];
    for(const [key, value] of Object.entries(props.callsSummary)) {
        listItems.push({ name: key, amount: value.amount.toString(), addresses: value.addresses });
    }
    setCallsSummary(listItems);

  }, [props.callsSummary]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => {
      return (oldExpanded.length === 0 && callsSummary) ? callsSummary.map((_, i) => `${i + 1}`) : [];
    });
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      {callsSummary && callsSummary.length > 0 && <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button 
          onClick={handleExpandClick} 
          sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }} 
          variant="outlined"
          size="small"
        >
          {expanded.length === 0 ? "Expand Functions" : "Collapse Functions"}
        </Button>
      </Box>}
      {callsSummary && <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
        multiSelect
      >
        {callsSummary.map((callSummary, i) => {
          return (
            <TreeItem nodeId={`${i + 1}`} label={`${callSummary.name} (${callSummary.amount})`} key={i + 1}>
              <ul>
                  {callSummary.addresses.map(addr => {
                    return (
                      <a 
                        key={addr}
                        target="_blank" 
                        href={`${networkContext.explorer.urls.contract}/${addr}`} 
                        rel="noopener noreferrer"
                      >
                        <li >{addr}</li>
                      </a>
                    );
                  })}
              </ul>
            </TreeItem>
          );
        })}
      </TreeView>}
    </Box>
  );
}
