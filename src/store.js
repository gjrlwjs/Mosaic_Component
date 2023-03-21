import { writable } from "svelte/store";

export const Mosaic_Arr = writable([]);
export const Float_Arr = writable([]);
export const Data_Infos = writable({
  // DATAKEY_CODE:null,
  HOST_CODE: null,
  LASTPERF_CODE: null,
  BASIC_CODE: null,
  CPU_CODE: null,
  MEM_CODE: null,
  NET_CODE: null,
  DISK_CODE: null,
});
export const WebReceiveData = writable({ code: null, data: null });
export const WebSendData = writable();

export const WebReceiveGridData = writable([]);
export const WebReceiveBarData = writable([]);
export const WebReceiveLineData = writable([]);
export const WebReceivePieData = writable({ value1: 0, value2: 0 });
