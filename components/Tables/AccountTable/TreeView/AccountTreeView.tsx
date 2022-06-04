import * as React from 'react';

import { useNetworkContext } from "../../../../context/network-context";;

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TypographyColor } from "../../../../utils/constants";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { TransactionControlledTreeView } from "./TransactionControlledTreeView";
import { FunctionCallsSummaryTree } from "./FunctionCallsSummaryTree";

import { FunctionCallPerAccount, CallsSummary } from "../../../../types";
import { Typography } from '@mui/material';

interface AccountTreeViewProps {
  callsSummary: CallsSummary,
  functionCallsPerAccount: FunctionCallPerAccount[] | undefined,
  accountAddress: string
}

export function AccountTreeView(props: AccountTreeViewProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [callsSummary, setCallsSummary] = React.useState<{ name: string, amount: string, addresses: string[] }[]>([]);

  const networkContext = useNetworkContext();
  
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
      return (oldExpanded.length === 0 && callsSummary) ? ["0", "2"] : [];
    });
  };

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-end" }}>
        <a target="_blank" href={`${networkContext.explorer.urls.contract}/${props.accountAddress}`} rel="noopener noreferrer">
          <Button 
            sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }} 
            variant="outlined"
            size="small"
          >
            See on explorer
          </Button>
        </a>
        {callsSummary && callsSummary.length > 0 && <Button 
          onClick={handleExpandClick} 
          sx={{ color: TypographyColor, borderColor: TypographyColor, "&:hover": { borderColor: TypographyColor } }} 
          variant="outlined"
          size="small"
        >
          {expanded.length === 0 ? "Expand all" : "Collapse all"}
        </Button>}
      </Box>
      {props.functionCallsPerAccount && props.functionCallsPerAccount.length > 0 && (
        <TreeView
          aria-label="controlled"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          onNodeToggle={handleToggle}
          multiSelect
        >
          <TreeItem 
            nodeId="0" 
            label={<Typography sx={{ fontSize: "1.3em" }}>Functions</Typography>}
            sx={{ marginTop: "3%" }}
          >
            <FunctionCallsSummaryTree callsSummary={props.callsSummary} />
          </TreeItem>
          <TreeItem 
            nodeId={`${callsSummary.length + 1}`} 
            label={<Typography sx={{ fontSize: "1.3em" }}>{`Transactions (${props.functionCallsPerAccount.length})`}</Typography>}
            sx={{ marginTop: "3%" }}
          >
            <TransactionControlledTreeView functionCallsPerAccount={props.functionCallsPerAccount} />
          </TreeItem>
        </TreeView>
      )}
      {!props.functionCallsPerAccount || props.functionCallsPerAccount.length === 0 && <Typography>Couldn&apos;t organize transaction for this account.</Typography>}
    </Box>
  );
}
