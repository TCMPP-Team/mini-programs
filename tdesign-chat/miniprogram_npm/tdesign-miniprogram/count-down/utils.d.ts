export interface TimeData {
    DD: number;
    HH: number;
    mm: number;
    ss: number;
    SSS: number;
}
export declare const TimeDataUnit: {
    DD: string;
    HH: string;
    mm: string;
    ss: string;
    SSS: string;
};
export declare const parseTimeData: (time: number) => TimeData;
export declare const isSameSecond: (time1: number, time2: number) => boolean;
export declare type TTimeList = {
    digit: string;
    unit: string;
    match: string;
}[];
/**
 *
 * @param time 倒计时时间，毫秒单位
 * @param format 倒计时格式化字符串，例如：dd天hh小时mm分ss秒SSS毫秒，hh:mm:ss.SSS，hh:mm:ss
 */
export declare const parseFormat: (time: number, format: string) => {
    timeText: string;
    timeList: TTimeList;
};
