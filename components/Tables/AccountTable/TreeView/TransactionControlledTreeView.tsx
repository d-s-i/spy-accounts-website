import * as React from "react";

import { useNetworkContext } from "../../../../context/network-context";;

import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { TableFooter } from "../TableFooter";

import { FunctionCallPerAccount } from "../../../../types";
import { TransactionContent } from "../TransactionContent";
import { TypographyColor } from "../../../../utils/constants";

interface TransactionControlledTreeViewProps {
  functionCallsPerAccount: FunctionCallPerAccount[] | undefined;
}

export function TransactionControlledTreeView(props: TransactionControlledTreeViewProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [amount, setAmount] = React.useState<number>(5);

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
              key={i + 1}
              nodeId={`${i + 1}`} 
              label={`Hash: ${fnCall.transactionHash}`} 
            >
              <a 
                target="_blank" 
                href={`${networkContext.explorer.urls.transaction}/${fnCall.transactionHash}`} 
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
        }).slice(0, amount)}
        <TableFooter 
          amountToDisplay={amount}
          totalAmount={props.functionCallsPerAccount.length}
          setAmountToDisplay={setAmount}
          batch={5}
        />
        {/* <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button 
            color="secondary" 
            sx={{  textTransform: "none" }} 
            onClick={() => setAmount((prevAmount) => prevAmount + 5)} 
            variant="text"
          >
            +
          </Button>
          <Button 
            color="secondary" 
            sx={{  textTransform: "none" }} 
            onClick={() => setAmount((prevAmount) => prevAmount - 5)} 
            variant="text"
          >
            -
          </Button>
        </Box> */}
      </TreeView>}
    </Box>
  );
}
