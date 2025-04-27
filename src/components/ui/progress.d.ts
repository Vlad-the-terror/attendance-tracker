declare module '@radix-ui/react-progress' {
  import * as React from 'react';
  
  export interface ProgressProps extends React.ComponentPropsWithoutRef<'div'> {
    value?: number;
  }
  
  const Root: React.ForwardRefExoticComponent<ProgressProps>;
  const Indicator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'>>;
  
  export { Root, Indicator };
} 