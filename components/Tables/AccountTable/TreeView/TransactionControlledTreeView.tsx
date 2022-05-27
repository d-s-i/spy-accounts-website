import * as React from "react";

import { useNetworkContext } from "../../../../context/network-context";;

import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import { FunctionCallPerAccount } from "../../../../types";
import { TransactionContent } from "../TransactionContent";
import { TypographyColor } from "../../../../utils/constants";

interface TransactionControlledTreeViewProps {
  functionCallsPerAccount: FunctionCallPerAccount[] | undefined;
}

export function TransactionControlledTreeView(props: TransactionControlledTreeViewProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const networkContext = useNetworkContext();

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) => {
      return (oldExpanded.length === 0 && props.functionCallsPerAccount) ? props.functionCallsPerAccount.map((_, i) => `${i + 1}`) : [];

    });
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      {props.functionCallsPerAccount && props.functionCallsPerAccount.length > 0 && <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button 
          onClick={handleExpandClick} 
          sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }} 
          variant="outlined"
          size="small"
        >
          {expanded.length === 0 ? "Expand Transactions" : "Collapse Transactions"}
        </Button>
      </Box>}
      {props.functionCallsPerAccount && props.functionCallsPerAccount.length > 0 && <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
        multiSelect
      >
        {props.functionCallsPerAccount?.map((fnCall, i) => {
          return (
            <TreeItem 
              nodeId={`${i + 1}`} 
              label={`Hash: ${fnCall.transactionHash}`} 
              key={i + 1}
            >
              <a 
                target="_blank" 
                href={`${networkContext.explorer.voyager.urls.transaction}/${fnCall.transactionHash}`} 
                rel="noopener noreferrer"
              >
                <Typography sx={{ padding: "2% 0% 2% 0%", textDecoration: "underline" }} align="center">Click to see tx on explorer</Typography>
              </a>
              <TransactionContent 
                organizedFunctionCalls={fnCall.fnCallsPerTx}
                rowHeight={fnCall.rowSize.height}
                rowWidth={fnCall.rowSize.width}
              />
            </TreeItem>
          );
        })}
      </TreeView>}
    </Box>
  );
}