import React from "react";
import styles from "./MyListItem.module.css";

interface MyListItemProps {
    children: React.ReactNode;
}

export const MyListItem = function(props: MyListItemProps) {
    return (
        <li className={styles["list-item"]}>
            {props.children}
        </li>
    );
}