import { IDialog, IDialogContext } from './types';
export declare class Dialog {
    getNextDialogId(): number;
    /**
     * 新增context
     * @param name
     * @param dialogContext
     */
    addContext(name: string, dialogContext: IDialogContext): void;
    /**
     * 删除context
     * @param name
     */
    removeContext(name: string): void;
    /**
     * 获取context
     * @param name
     */
    getContext(name?: string): IDialogContext;
    /**
     * 获取对象关联的对话框
     * @param obj
     */
    getDialog(obj: any): IDialog;
    /**
     * 关闭对话框
     * @param obj
     * @param rest
     */
    close(obj: any, result: any): void;
    /**
     * 显示对话框
     * @param obj
     * @param activationData
     * @param context
     */
    show<T>(obj: any, activationData?: any, context?: string): Promise<T>;
}
type addPrefixToObject<T, P extends string> = {
    [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};
type DialogShowMethod = (obj: any, addData?: any) => Promise<any>;
type DialogContextTypes = {
    WithRouter: DialogShowMethod;
    [key: string]: DialogShowMethod;
};
export declare const dialog: Dialog & addPrefixToObject<DialogContextTypes, "show">;
export default dialog;
