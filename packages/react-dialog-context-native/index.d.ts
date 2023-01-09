import * as React from 'react';
import { IDialog, Dialog } from 'react-dialog-context';
import { ViewProps } from 'react-native';
export interface ReactNativeDialogContextProps extends ViewProps {
    name?: string;
}
export interface ReactNativeDialogContextState {
    dialogs: {
        [id: string]: Dialog;
    };
}
export default class ReactNativeDialogContext extends React.Component<ReactNativeDialogContextProps, ReactNativeDialogContextState> {
    name: string;
    constructor(props: any, context: any);
    state: {
        dialogs: {};
    };
    addHost(theDialog: IDialog): Promise<void>;
    removeHost(theDialog: IDialog): Promise<void>;
    render(): any;
}
