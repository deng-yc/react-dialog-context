import {
  IDialog,
  IDialogContext,
} from './types';

const contexts: { [name: string]: IDialogContext } = {};

let last_dialogId = 1000;

const getNextDialogId = () => {
    last_dialogId = last_dialogId + 1;
    return last_dialogId;
};

export class Dialog {
    getNextDialogId() {
        return getNextDialogId();
    }

    /**
     * 新增context
     * @param name
     * @param dialogContext
     */
    addContext(name: string, dialogContext: IDialogContext) {
        dialogContext.name = name;
        contexts[name] = dialogContext;
        var helperName = "show" + name.substr(0, 1).toUpperCase() + name.substr(1);
        this[helperName] = function (obj, activationData) {
            return this.show(obj, activationData, name);
        };
    }

    /**
     * 删除context
     * @param name
     */
    removeContext(name: string) {
        if (contexts[name]) {
            delete contexts[name];
        }
    }

    /**
     * 获取context
     * @param name
     */
    getContext(name = "default") {
        return contexts[name];
    }

    /**
     * 获取对象关联的对话框
     * @param obj
     */
    getDialog(obj): IDialog {
        if (obj) {
            var __dialog__ = obj.__dialog__;
            if (__dialog__) {
                if (typeof __dialog__ == "function") {
                    return __dialog__.call(obj);
                }
                return obj.__dialog__;
            }
        }
        return undefined;
    }

    /**
     * 关闭对话框
     * @param obj
     * @param rest
     */
    close(obj, result) {
        var theDialog = this.getDialog(obj);
        if (theDialog) {
            theDialog.close(result);
        }
    }
    /**
     * 显示对话框
     * @param obj
     * @param activationData
     * @param context
     */
    show<T>(obj: any, activationData?, context = "default"): Promise<T> {
        var dialogContext = contexts[context];
        if (!dialogContext) {
            throw new Error("dialogHost[" + context + "]不存在");
        }
        return new Promise((resolve) => {
            var theDialog;
            const id = getNextDialogId();
            theDialog = theDialog || {
                id: `dialog-${id}`,
                owner: obj,
                zIndex: (dialogContext.initialZIndex || 10000) + id,
                activationData,
                context: dialogContext,
                closing(fn) {
                    theDialog.closeingEvents = theDialog.closeingEvents || [];
                    theDialog.closeingEvents.push(fn);
                },
                close: async (result: T) => {
                    if (theDialog.closeingEvents) {
                        for (const fn of theDialog.closeingEvents) {
                            await fn();
                        }
                    }
                    dialogContext.removeHost(theDialog).then(() => {
                        resolve(result);
                    });
                },
            };
            if (obj.prototype) {
                obj.prototype.__dialog__ = function () {
                    if (this.props) {
                        return this.props.dialog;
                    }
                };
            } else {
                try {
                    obj.__dialog__ = theDialog;
                } catch (ex) {}
            }
            dialogContext.addHost(theDialog);
        });
    }
}
type addPrefixToObject<T, P extends string> = {
    [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

type DialogShowMethod = (obj: any, addData?: any) => Promise<any>;

type DialogContextTypes = {
    WithRouter: DialogShowMethod;
    [key: string]: DialogShowMethod;
};
export const dialog: Dialog & addPrefixToObject<DialogContextTypes, "show"> = new Dialog() as any;
export default dialog;
