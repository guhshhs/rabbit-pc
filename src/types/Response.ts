//  接口返回的数据
export interface XtxResponse<T> {
    code: string,
    msg: string,
    result: T  // 数据源
}

export interface Pagination<T> {
    page: number;
    pages: number;
    pageSize: number;
    counts: number;
    items: T[];
}