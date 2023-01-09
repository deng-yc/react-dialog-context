import * as React from 'react';
import { DetailedHTMLProps } from 'react';
import { Dialog, IDialog } from 'react-dialog-context';
export interface ReactDialogContextProps extends DetailedHTMLProps<React.HTMLAttributes<any>, any> {
    name?: string;
}
export interface ReactDialogContextState {
    dialogs: {
        [id: string]: Dialog;
    };
}
export default class ReactDialogContext extends React.Component<ReactDialogContextProps, ReactDialogContextState> {
    name: string;
    constructor(props: any, context: any);
    state: {
        dialogs: {};
    };
    addHost(theDialog: IDialog): Promise<void>;
    removeHost(theDialog: IDialog): Promise<void>;
    render(): any;
}
