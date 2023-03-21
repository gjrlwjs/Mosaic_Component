<script>
  import { WebReceiveData, Mosaic_Arr, Data_Infos, WebReceivePieData, WebSendData, WebReceiveGridData, WebReceiveBarData, WebReceiveLineData} from './store.js';
  import { writable, get } from 'svelte/store';
  import { onDestroy, onMount } from 'svelte';
  import { load_Key_Flag } from './uStore_Function.js';


  let workEvent;
    onMount(() => {
        console.log('workerInit');
        workEvent = new Worker('dataRecever.js');
        workEvent.onmessage = updateItemList;
        WebSendData.subscribe((value) => {
            if (Number.isInteger(value))
            {
                workEvent.postMessage(value);
            }
        });

        Data_Infos.subscribe((Item) => {
        // console.log(get(Data_Infos));

        if (Item.BASIC_CODE != null) {
            let tmp_Flag = 2;

            tmp_Flag += Item.LASTPERF_CODE.Flag_YN === true ? Item.LASTPERF_CODE.Code:0;
            tmp_Flag += Item.BASIC_CODE.Flag_YN    === true ? Item.BASIC_CODE.Code:0;
            tmp_Flag += Item.CPU_CODE.Flag_YN      === true ? Item.CPU_CODE.Code:0;
            tmp_Flag += Item.MEM_CODE.Flag_YN      === true ? Item.MEM_CODE.Code:0;
            tmp_Flag += Item.NET_CODE.Flag_YN      === true ? Item.NET_CODE.Code:0;
            tmp_Flag += Item.DISK_CODE.Flag_YN     === true ? Item.DISK_CODE.Code:0;

            //console.log(tmp_Flag);
            console.log("=============load Key Flag E ============");

            // console.log("==============Flag Change and Send Data===========");
            if (tmp_Flag > 2) {
                workEvent.postMessage(tmp_Flag);
            };
        };
        });
        
        console.log('Add worker');
    })
    function updateItemList(e) {
        try {
            let Parsedata = JSON.parse(e.data);
            switch(Parsedata.code) {
                case 2:
                    WebReceiveData.set({code : Parsedata.code, data : Parsedata.data});
                    break;
                case 4:
                    //console.log("Code 4 Data Recv ====== Lastperf ====== Grid");
                    // console.log(Parsedata.data);
                    WebReceiveGridData.set(Parsedata.data);
                    break;                
                case 8:
                    //console.log("Code 8 Data Recv ====== Basic ====== Bar");
                    // console.log(Parsedata.data);
                    WebReceiveBarData.set(Parsedata.data);
                    break;
                case 16:
                    //console.log("Code 16 Data Recv ====== CPU ====== Line");
                    // console.log(Parsedata.data);
                    WebReceiveLineData.set(Parsedata.data);
                    break;                
                case 32:
                    console.log("Code 34 Data Recv");
                    break;                
                case 64:
                    //console.log("Code 64 Data Recv ====== Mem ====== Pie");

                    let arrayData = String(Parsedata.data).split(",");
                    let num1 = 0;
                    let num2 = 0;
                    if (Number.isNaN(arrayData[3]) === false)
                        num1 = Number(arrayData[3]);

                    if (Number.isNaN(arrayData[4]) === false)
                        num2 = Number(arrayData[4]);

                    WebReceivePieData.set({value1: num1,value2: num2});
                    break;
                case 128:
                    console.log("Code 128 Data Recv");
                    break;                                
            };
            // Mosaic Arr 갱신...?
        }
        catch(e) {
            console.log(e);
            return;
        }
        
    }

    // const ss_DataInfos = Data_Infos.subscribe((Item) => {
    //     console.log("items ~~~~~~~~~~~");
    //     console.log(Item);
    //     // console.log(get(Data_Infos));

    //     if (Item.BASIC_CODE != null) {
    //         console.log("=============load Key Flag S ============");

    //         let tmp_Flag = 2;

    //         console.log(Item.LASTPERF_CODE.Flag_YN);
    //         console.log(Item.LASTPERF_CODE.Code);

    //         tmp_Flag += Item.LASTPERF_CODE.Flag_YN === true ? Item.LASTPERF_CODE.Code:0;
    //         tmp_Flag += Item.BASIC_CODE.Flag_YN    === true ? Item.BASIC_CODE.Code:0;
    //         tmp_Flag += Item.CPU_CODE.Flag_YN      === true ? Item.CPU_CODE.Code:0;
    //         tmp_Flag += Item.MEM_CODE.Flag_YN      === true ? Item.MEM_CODE.Code:0;
    //         tmp_Flag += Item.NET_CODE.Flag_YN      === true ? Item.NET_CODE.Code:0;
    //         tmp_Flag += Item.DISK_CODE.Flag_YN     === true ? Item.DISK_CODE.Code:0;

    //         console.log(tmp_Flag);
    //         console.log("=============load Key Flag E ============");

    //         // console.log("==============Flag Change and Send Data===========");
    //         if (tmp_Flag > 2) {
    //             sendDataKey(tmp_Flag);
    //         };
    //     };
    // });

    // onDestroy(ss_DataInfos);    


</script>