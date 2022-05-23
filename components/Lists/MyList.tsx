import * as React from 'react';

interface MyListProps {
  children: React.ReactNode;
}

export function MyList(props: MyListProps) {
  return (
    <ul>
      {props.children}
    </ul>
  );
}
