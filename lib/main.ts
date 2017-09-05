/* jshint esversion:6 */

import {isUndefined} from "util";
import {resolveTxt} from "dns";

/**
 * Storage Box Item
 */
export default class SBI {
    /**
     * Constructor
     */
    constructor() {
        // create storage object if not exist
        if (isUndefined((<any>process).sbi)) {
            Object.defineProperty(process, 'sbi', {
                value: {},
                configurable: false,
                writable: true,
            });
        }
        // attach SBI to process pid
        if (!(<any>process).sbi[process.pid]) {
            Object.defineProperty((<any>process).sbi, '' + process.pid, {
                value: {},
            });
        }
    }

    /**
     * Get storage by process pid
     * @returns {{IBox} | boolean}
     */
    private getStorageByPid(): {IBox} {
        return (<any>process).sbi[process.pid];
    }

    public boxes(): {IBox} {
        return this.getStorageByPid();
    }

    /**
     * Get keys
     * @returns {string[]}
     */
    public keys(): string[] {
        const boxes = this.boxes();
        if (boxes) {
            return Object.keys(boxes);
        }else {
            return [];
        }
    }

    public get(key: string): BoxBase {
        const storage = this.getStorageByPid();
        if (storage && storage.hasOwnProperty(key)) {
            return <BoxBase>storage[key];
        }else {
            return new BoxBase({key});
        }
    }

    /**
     * Save box to storage
     * @param {IBox} box
     * @returns {BoxBase}
     */
    public set(box: IBox): BoxBase {
        const boxObj = new BoxBase(box);
        const storage = this.getStorageByPid();
        if (storage) {
            storage[box.key] = boxObj;
        }
        return boxObj;
    }

    /**
     * Get sbi instance
     * @returns {SBI}
     */
    public static newInstance(): SBI {
        return new SBI();
    }
}

export interface IBox {
    key: string;
    value?: any;
}

export class BoxBase {
    private _key: string;
    private _value: any;
    private _items: object = {};

    constructor(box: IBox) {
        this._key = box.key;
        this._value = box.value || undefined;
    }

    /**
     * Add value to items
     * @param {string} key
     * @param value
     * @returns {BoxBase}
     */
    public add(key: string, value: any): BoxBase {
        this._items[key] = value;
        (<any>process).sbi[this._key] = this;
        return this;
    }

    /**
     * Get single or value by key
     * @param {string} key
     * @returns {any}
     */
    public item(key?: string): any {
        return (!isUndefined(key)) ? this._items[key] : this._value;
    }

    /**
     * Get all items
     * @returns {Object}
     */
    public items() {
        return this._items;
    }
}