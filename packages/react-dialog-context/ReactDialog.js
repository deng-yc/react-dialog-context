import React from "react";
import { DialogContext } from "./context";
export function ReactDialog(props) {
    const dialog = props.dialog;
    let content;
    if (React.isValidElement(dialog.owner)) {
        content = dialog.owner;
    }
    else {
        content = React.createElement(dialog.owner, { dialog: dialog, ...dialog.activationData });
    }
    return React.createElement(DialogContext.Provider, { value: { dialog } }, content);
}
export default ReactDialog;
//# sourceMappingURL=ReactDialog.js.map