import * as React from 'react';
import { dialog, ReactDialog } from 'react-dialog-context';
import { View } from 'react-native';
let cached = {};
export default class ReactNativeDialogContext extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dialogs: {}
        };
        dialog.addContext(props.name || "default", this);
        cached[this.name] = {};
    }
    addHost(theDialog) {
        cached[this.name][theDialog.id] = theDialog;
        return new Promise(resolve => {
            this.setState({ dialogs: cached[this.name] }, resolve);
        });
    }
    removeHost(theDialog) {
        delete cached[this.name][theDialog.id];
        return new Promise(resolve => {
            this.setState({ dialogs: cached[this.name] }, resolve);
        });
    }
    render() {
        const { name, style, children, ...viewProps } = this.props;
        var viewStyles = [styles.dialogContext];
        if (style) {
            if (Array.isArray(style)) {
                viewStyles.push(...style);
            }
            else {
                viewStyles.push(style);
            }
        }
        var dialogs = this.state.dialogs;
        var components = [];
        for (const id in dialogs) {
            const dialog = dialogs[id];
            if (dialog) {
                components.push(React.createElement(ReactDialog, { key: dialog.id, dialog: dialog }));
            }
        }
        return React.createElement(View, { style: viewStyles, ...viewProps },
            components,
            children);
    }
}
const styles = {
    dialogContext: {}
};
//# sourceMappingURL=index.js.map