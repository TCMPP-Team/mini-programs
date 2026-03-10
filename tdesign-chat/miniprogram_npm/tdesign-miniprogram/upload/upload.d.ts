/// <reference types="miniprogram-api-typings" />
import { SuperComponent } from '../common/src/index';
import { UploadFile, SizeLimitObj } from './type';
export default class Upload extends SuperComponent {
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    data: {
        classPrefix: string;
        prefix: string;
        current: boolean;
        proofs: any[];
        customFiles: UploadFile[];
        customLimit: number;
        column: number;
        dragBaseData: {};
        rows: number;
        dragWrapStyle: string;
        dragList: any[];
        dragging: boolean;
        dragLayout: boolean;
    };
    properties: import("./type").TdUploadProps;
    controlledProps: {
        key: string;
        event: string;
    }[];
    observers: {
        'files, max, draggable'(files: UploadFile, max: number): void;
        gridConfig(): void;
    };
    lifetimes: {
        ready(): void;
    };
    handleLimit(customFiles: UploadFile[], max: number): void;
    triggerSuccessEvent(files: any): void;
    triggerFailEvent(err: any): void;
    onFileClick(e: WechatMiniprogram.BaseEvent): void;
    /**
     * 由于小程序暂时在ios上不支持返回上传文件的fileType，这里用文件的后缀来判断
     * @param mediaType
     * @param tempFilePath
     * @returns string
     * @link https://developers.weixin.qq.com/community/develop/doc/00042820b28ee8fb41fc4d0c254c00
     */
    getFileType(mediaType: string[], tempFilePath: string, fileType?: string): string;
    getRandFileName(filePath: any): string;
    checkFileSize(size: number, sizeLimit: SizeLimitObj | number, fileType?: string): boolean;
    onDelete(e: any): void;
    deleteHandle(index: number): void;
    updateGrid(): void;
    /**
     * 重置拖拽布局状态
     */
    resetDragLayout(): void;
    initDragLayout(): void;
    initDragList(): void;
    initDragBaseData(): void;
    methods: {
        getPreviewMediaSources(): WechatMiniprogram.MediaSource[];
        onPreview(e: WechatMiniprogram.BaseEvent): void;
        onPreviewImage(e: WechatMiniprogram.BaseEvent): void;
        onPreviewMedia(e: WechatMiniprogram.BaseEvent): void;
        uploadFiles(files: UploadFile[]): Promise<any>;
        startUpload(files: UploadFile[]): any;
        onAddTap(): void;
        chooseMedia(mediaType: any): void;
        chooseMessageFile(mediaType: any): void;
        afterSelect(files: any): void;
        dragVibrate(e: any): void;
        dragStatusChange(e: any): void;
        dragEnd(e: any): void;
        triggerDropEvent(files: any): void;
    };
}
