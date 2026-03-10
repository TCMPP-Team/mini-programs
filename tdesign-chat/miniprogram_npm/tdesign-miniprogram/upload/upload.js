import { __decorate, __rest } from "tslib";
import { SuperComponent, wxComponent } from '../common/src/index';
import props from './props';
import config from '../common/config';
import { isOverSize, isWxWork, isPC } from '../common/utils';
import { isObject } from '../common/validator';
const { prefix } = config;
const name = `${prefix}-upload`;
let Upload = class Upload extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.options = {
            multipleSlots: true,
        };
        this.data = {
            classPrefix: name,
            prefix,
            current: false,
            proofs: [],
            customFiles: [],
            customLimit: 0,
            column: 4,
            dragBaseData: {},
            rows: 0,
            dragWrapStyle: '',
            dragList: [],
            dragging: true,
            dragLayout: false, // 是否开启拖拽布局
        };
        this.properties = props;
        this.controlledProps = [
            {
                key: 'files',
                event: 'success',
            },
        ];
        this.observers = {
            'files, max, draggable'(files, max) {
                this.handleLimit(files, max);
            },
            gridConfig() {
                this.updateGrid();
            },
        };
        this.lifetimes = {
            ready() {
                this.handleLimit(this.data.customFiles, this.data.max);
                this.updateGrid();
            },
        };
        this.methods = {
            getPreviewMediaSources() {
                const previewMediaSources = [];
                this.data.customFiles.forEach((ele) => {
                    const mediaSource = {
                        url: ele.url,
                        type: ele.type,
                        poster: ele.thumb || undefined,
                    };
                    previewMediaSources.push(mediaSource);
                });
                return previewMediaSources;
            },
            onPreview(e) {
                this.onFileClick(e);
                const { preview } = this.properties;
                if (!preview)
                    return;
                const usePreviewMedia = this.data.customFiles.some((file) => file.type === 'video');
                if (usePreviewMedia) {
                    this.onPreviewMedia(e);
                }
                else {
                    this.onPreviewImage(e);
                }
            },
            onPreviewImage(e) {
                var _a;
                const { index } = e.currentTarget.dataset;
                const urls = this.data.customFiles.filter((file) => file.percent !== -1).map((file) => file.url);
                const current = (_a = this.data.customFiles[index]) === null || _a === void 0 ? void 0 : _a.url;
                wx.previewImage({
                    urls,
                    current,
                    fail() {
                        wx.showToast({ title: '预览图片失败', icon: 'none' });
                    },
                });
            },
            onPreviewMedia(e) {
                const { index: current } = e.currentTarget.dataset;
                const sources = this.getPreviewMediaSources();
                wx.previewMedia({
                    sources,
                    current,
                    fail() {
                        wx.showToast({ title: '预览视频失败', icon: 'none' });
                    },
                });
            },
            uploadFiles(files) {
                return Promise.resolve().then(() => {
                    // 开始调用上传函数
                    const task = this.data.requestMethod(files);
                    if (task instanceof Promise) {
                        return task;
                    }
                    return Promise.resolve({});
                });
            },
            startUpload(files) {
                // 如果传入了上传函数，则进度设为0并开始上传，否则跳过上传
                if (typeof this.data.requestMethod === 'function') {
                    return this.uploadFiles(files)
                        .then(() => {
                        files.forEach((file) => {
                            file.percent = 100;
                        });
                        this.triggerSuccessEvent(files);
                    })
                        .catch((err) => {
                        this.triggerFailEvent(err);
                    });
                }
                // 如果没有上传函数，success事件与微信api上传成功关联
                this.triggerSuccessEvent(files);
                this.handleLimit(this.data.customFiles, this.data.max);
                return Promise.resolve();
            },
            onAddTap() {
                const { disabled, mediaType, source } = this.properties;
                if (disabled)
                    return;
                if (source === 'media') {
                    this.chooseMedia(mediaType);
                }
                else {
                    this.chooseMessageFile(mediaType);
                }
            },
            chooseMedia(mediaType) {
                const { customLimit } = this.data;
                const { config, sizeLimit } = this.properties;
                if (isWxWork || isPC) {
                    wx.chooseImage(Object.assign(Object.assign({ count: Math.min(20, customLimit) }, config), { success: (res) => {
                            const files = [];
                            res.tempFiles.forEach((temp) => {
                                const { path, size } = temp;
                                if (this.checkFileSize(size, sizeLimit, 'image'))
                                    return;
                                const name = this.getRandFileName(path);
                                files.push({
                                    name,
                                    type: 'image',
                                    url: path,
                                    size: size,
                                    percent: 0,
                                });
                            });
                            this.afterSelect(files);
                        }, fail: (err) => {
                            this.triggerFailEvent(err);
                        }, complete: (res) => {
                            this.triggerEvent('complete', res);
                        } }));
                }
                else {
                    wx.chooseMedia(Object.assign(Object.assign({ count: Math.min(20, customLimit), mediaType }, config), { success: (res) => {
                            const files = [];
                            // 支持单/多文件
                            res.tempFiles.forEach((temp) => {
                                const { size, fileType, tempFilePath, width, height, duration, thumbTempFilePath } = temp, res = __rest(temp, ["size", "fileType", "tempFilePath", "width", "height", "duration", "thumbTempFilePath"]);
                                if (this.checkFileSize(size, sizeLimit, fileType))
                                    return;
                                const name = this.getRandFileName(tempFilePath);
                                files.push(Object.assign({ name, type: this.getFileType(mediaType, tempFilePath, fileType), url: tempFilePath, size: size, width: width, height: height, duration: duration, thumb: thumbTempFilePath, percent: 0 }, res));
                            });
                            this.afterSelect(files);
                        }, fail: (err) => {
                            this.triggerFailEvent(err);
                        }, complete: (res) => {
                            this.triggerEvent('complete', res);
                        } }));
                }
            },
            chooseMessageFile(mediaType) {
                const { customLimit } = this.data;
                const { config, sizeLimit } = this.properties;
                wx.chooseMessageFile(Object.assign(Object.assign({ count: Math.min(100, customLimit), type: Array.isArray(mediaType) ? 'all' : mediaType }, config), { success: (res) => {
                        const files = [];
                        // 支持单/多文件
                        res.tempFiles.forEach((temp) => {
                            const { size, type: fileType, path: tempFilePath } = temp, res = __rest(temp, ["size", "type", "path"]);
                            if (this.checkFileSize(size, sizeLimit, fileType))
                                return;
                            const name = this.getRandFileName(tempFilePath);
                            files.push(Object.assign({ name, type: this.getFileType(mediaType, tempFilePath, fileType), url: tempFilePath, size: size, percent: 0 }, res));
                        });
                        this.afterSelect(files);
                    }, fail: (err) => this.triggerFailEvent(err), complete: (res) => this.triggerEvent('complete', res) }));
            },
            afterSelect(files) {
                this._trigger('select-change', {
                    files: [...this.data.customFiles],
                    currentSelectedFiles: [files],
                });
                this._trigger('add', { files });
                this.startUpload(files);
            },
            dragVibrate(e) {
                var _a;
                const { vibrateType } = e;
                const { draggable } = this.data;
                const dragVibrate = (_a = draggable === null || draggable === void 0 ? void 0 : draggable.vibrate) !== null && _a !== void 0 ? _a : true;
                const dragCollisionVibrate = draggable === null || draggable === void 0 ? void 0 : draggable.collisionVibrate;
                if ((dragVibrate && vibrateType === 'longPress') || (dragCollisionVibrate && vibrateType === 'touchMove')) {
                    wx.vibrateShort({
                        type: 'light',
                    });
                }
            },
            dragStatusChange(e) {
                const { dragging } = e;
                this.setData({ dragging });
            },
            dragEnd(e) {
                const { dragCollisionList } = e;
                let files = [];
                if (dragCollisionList.length === 0) {
                    files = this.data.customFiles;
                }
                else {
                    files = dragCollisionList.reduce((list, item) => {
                        const { realKey, data, fixed } = item;
                        if (!fixed) {
                            list[realKey] = Object.assign({}, data);
                        }
                        return list;
                    }, []);
                }
                this.triggerDropEvent(files);
            },
            triggerDropEvent(files) {
                const { transition } = this.properties;
                if (transition.backTransition) {
                    const timer = setTimeout(() => {
                        this.triggerEvent('drop', { files });
                        clearTimeout(timer);
                    }, transition.duration);
                }
                else {
                    this.triggerEvent('drop', { files });
                }
            },
        };
    }
    handleLimit(customFiles, max) {
        if (max === 0) {
            max = Number.MAX_SAFE_INTEGER;
        }
        this.setData({
            customFiles: customFiles.length > max ? customFiles.slice(0, max) : customFiles,
            customLimit: max - customFiles.length,
            dragging: true,
        });
        this.initDragLayout();
    }
    triggerSuccessEvent(files) {
        this._trigger('success', { files: [...this.data.customFiles, ...files] });
    }
    triggerFailEvent(err) {
        this.triggerEvent('fail', err);
    }
    onFileClick(e) {
        const { file, index } = e.currentTarget.dataset;
        this.triggerEvent('click', { index, file });
    }
    /**
     * 由于小程序暂时在ios上不支持返回上传文件的fileType，这里用文件的后缀来判断
     * @param mediaType
     * @param tempFilePath
     * @returns string
     * @link https://developers.weixin.qq.com/community/develop/doc/00042820b28ee8fb41fc4d0c254c00
     */
    getFileType(mediaType, tempFilePath, fileType) {
        if (fileType)
            return fileType; // 如果有返回fileType就直接用
        if (mediaType.length === 1) {
            // 在单选媒体类型的时候直接使用单选媒体类型
            return mediaType[0];
        }
        // 否则根据文件后缀进行判读
        const videoType = ['avi', 'wmv', 'mkv', 'mp4', 'mov', 'rm', '3gp', 'flv', 'mpg', 'rmvb'];
        const temp = tempFilePath.split('.');
        const postfix = temp[temp.length - 1];
        if (videoType.includes(postfix.toLocaleLowerCase())) {
            return 'video';
        }
        return 'image';
    }
    // 选中文件之后，计算一个随机的短文件名
    getRandFileName(filePath) {
        const extIndex = filePath.lastIndexOf('.');
        const extName = extIndex === -1 ? '' : filePath.substr(extIndex);
        return parseInt(`${Date.now()}${Math.floor(Math.random() * 900 + 100)}`, 10).toString(36) + extName;
    }
    checkFileSize(size, sizeLimit, fileType) {
        if (isOverSize(size, sizeLimit)) {
            let title = `${fileType === 'video' ? '视频' : '图片'}大小超过限制`;
            if (isObject(sizeLimit)) {
                const { size: limitSize, message: limitMessage } = sizeLimit;
                title = limitMessage === null || limitMessage === void 0 ? void 0 : limitMessage.replace('{sizeLimit}', String(limitSize));
            }
            wx.showToast({ icon: 'none', title });
            return true;
        }
        return false;
    }
    onDelete(e) {
        const { index } = e.currentTarget.dataset;
        this.deleteHandle(index);
    }
    deleteHandle(index) {
        const { customFiles } = this.data;
        const delFile = customFiles[index];
        this.triggerEvent('remove', { index, file: delFile });
    }
    updateGrid() {
        let { gridConfig = {} } = this.properties;
        if (!isObject(gridConfig))
            gridConfig = {};
        const { column = 4, width = 160, height = 160 } = gridConfig;
        this.setData({
            gridItemStyle: `width:${width}rpx;height:${height}rpx`,
            column: column,
        });
    }
    /**
     * 重置拖拽布局状态
     */
    resetDragLayout() {
        this.setData({
            dragBaseData: {},
            dragWrapStyle: '',
            dragLayout: false,
        });
    }
    initDragLayout() {
        const { draggable, disabled } = this.properties;
        const { customFiles } = this.data;
        if (!draggable || disabled || customFiles.length === 0) {
            this.resetDragLayout();
            return;
        }
        this.initDragList();
        this.initDragBaseData();
    }
    initDragList() {
        let i = 0;
        const { column, customFiles, customLimit } = this.data;
        const dragList = [];
        customFiles.forEach((item, index) => {
            dragList.push({
                realKey: i,
                sortKey: index,
                tranX: `${(index % column) * 100}%`,
                tranY: `${Math.floor(index / column) * 100}%`,
                data: Object.assign({}, item),
            });
            i += 1;
        });
        if (customLimit > 0) {
            const listLength = dragList.length;
            dragList.push({
                realKey: listLength,
                sortKey: listLength,
                tranX: `${(listLength % column) * 100}%`,
                tranY: `${Math.floor(listLength / column) * 100}%`,
                fixed: true,
            });
        }
        this.data.rows = Math.ceil(dragList.length / column);
        this.setData({
            dragList,
        });
    }
    initDragBaseData() {
        const { classPrefix, rows, column } = this.data;
        const query = this.createSelectorQuery();
        const selectorGridItem = `.${classPrefix} >>> .t-grid-item`;
        const selectorGrid = `.${classPrefix} >>> .t-grid`;
        query.select(selectorGridItem).boundingClientRect();
        query.select(selectorGrid).boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec((res) => {
            const [{ width, height }, { left, top }, { scrollTop }] = res;
            const dragBaseData = {
                rows,
                classPrefix,
                itemWidth: width,
                itemHeight: height,
                wrapLeft: left,
                wrapTop: top + scrollTop,
                columns: column,
            };
            const dragWrapStyle = `height: ${rows * height}px`;
            this.setData({
                dragBaseData,
                dragWrapStyle,
                dragLayout: true,
            }, () => {
                // 为了给拖拽元素加上拖拽方法，同时控制不拖拽时不取消穿透
                const timer = setTimeout(() => {
                    this.setData({ dragging: false });
                    clearTimeout(timer);
                }, 0);
            });
        });
    }
};
Upload = __decorate([
    wxComponent()
], Upload);
export default Upload;

//# sourceMappingURL=upload.js.map
