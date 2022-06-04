import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

import { TypographyColor } from "../../utils/constants";

export const DappButton = function() {

    const router = useRouter();
    
    return (
        <Button 
            sx={{ 
                backgroundColor: TypographyColor, 
                borderRadius: "2em",
                padding: "10px 1% 10px 1%",
                "&:hover": {
                    backgroundColor: "#cccccc"
                }
            }}
            onClick={() => router.push("/yesterday")}
      >Launch App</Button>
    );
}