// 申明外部 npm 插件模块
declare module 'splitpanes';
declare module 'js-cookie';
declare module '@wangeditor/editor-for-vue';
declare module 'sortablejs';

// 声明一个模块，防止引入文件时报错
// declare module '*.json';
// declare module '*.png';
// declare module '*.jpg';
// declare module '*.scss';
// declare module '*.ts';
// declare module '*.js';

// 声明文件，*.vue 后缀的文件交给 vue 模块来处理
declare module '*.vue' {
    import type { DefineComponent } from 'vue'

    const component: DefineComponent<{}, {}, any>   // eslint-disable-line
    export default component
}

// 声明文件，定义全局变量
/* eslint-disable */
declare interface Window {
	nextLoading: boolean;
}

// 声明路由当前项类型
declare type RouteItem<T = any> = {
	path: string;
	name?: string | symbol | undefined | null;
	redirect?: string;
	k?: T;
	meta?: {
		title?: string;
		isLink?: string;
		isHide?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
		isDynamic?: boolean;
		isDynamicPath?: string;
		isIframeOpen?: string;
		loading?: boolean;
	};
	children: T[];
	query?: { [key: string]: T };
	params?: { [key: string]: T };
	contextMenuClickId?: string | number;
	commonUrl?: string;
	isFnClick?: boolean;
	url?: string;
	transUrl?: string;
	title?: string;
	id?: string | number;
};

// 声明路由 to from
declare interface RouteToFrom<T = any> extends RouteItem {
	path?: string;
	children?: T[];
}

// 声明路由当前项类型集合
declare type RouteItems<T extends RouteItem = any> = T[];



// 申明 数组
declare type EmptyArrayType<T = any> = T[];

// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};





// search搜索项 数据格式公共类型
declare interface SearchDataType<T = any, U = any> {
    data: T,
    // config: {
    //     [key in keyof T]: { label: string, slot?: boolean, placeholder: string, width: string }
    // },
    config: { column: { label: string, prop: keyof T, [key: string]: any; }, slot?: boolean, placeholder?: string, width?: string }[]
    searchFunc: () => void,     // 查询方法
    hideBtn?: boolean
    showAll?: boolean
}


interface TableHeader<T, U> {
    property: keyof T | 'operate',
    label: string,
    slot?: string,
    [key in U]: U[keyof U];
}

// table 数据格式公共类型
declare interface CoTableType<T = any, U = any> {
    data: T[],
    tableHeader: {
        property: keyof T | 'operate' | '',
        label: string,
        slot?: boolean,
        [key: string]: any;
    }[],
    pagination: {
        total: number,
        page: number,
        page_size: number,
        page_sizes: number[],
    };
    loading?: boolean
}
