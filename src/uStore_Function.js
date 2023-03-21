
  import { Mosaic_Arr, Data_Infos } from './store.js';
  import { get } from 'svelte/store';   

  export class Node_Item {
    constructor(
      Node_ID = -1,
      Host_List = []
    ) {
      this.Node_ID = Node_ID;
      this.Host_List = Host_List;
    };

    exist_HostId(id){
      // for (let i = 0; i < this.Host_List.length; i++) {
      //   if (this.Host_List[i]) {

      //   };
      // };
      return this.Host_List.find(id) ? true:false;
    };
  };

  export class Info_Item {
    constructor(
      Code = 0,
      Flag_YN = false,
      Node_List = []
    ) {
      this.Code = Code;
      this.Flag_YN = Flag_YN;
      this.Node_List = Node_List;
    };

    update_Node(Node_ID, Host_List){
      let index = this.Node_List.indexOf(Node_ID);

      // this의 Node_List에 Node ID에 대한 데이터 추가 or 갱신
      if (index == -1) {
        // 찾는 Node ID가 없으므로, 추가한다.
        let item = new Node_Item(Node_ID, Host_List);

        this.Flag_YN = true;
        this.Node_List.push(item);

        return true;
      } else {
        this.Node_List[index].Host_List = Host_List;

        return true;
      };
      
      // return false;
    };

    delete_Node(Node_ID){
      let index = this.Node_List.indexOf(Node_ID);

      // this의 Node_List에 Node ID에 대한 데이터 삭제
      if (index > -1) {
        // 찾는 Node ID가 있으므로, 삭제한다.
        this.Node_List = this.Node_List.filter(Node_Item => Node_Item.Node_ID != Node_ID);

        this.Flag_YN = this.Node_List.length > 0 ? true:false;
        return true;
      };
      return false;
    };

    // exist_HostId(id){
    //   for (let i = 0; i < this.Node_Host_List.length; i++) {
    //     if (this.Node_Host_List[i]) {

    //     };
    //   };
    //   return this.Host_List.find(id) ? true:false;
    // };
  };

  export function Data_Infos_Clear() {
    let Host_Item = new Info_Item(2, false, []);  
    let Lastperf_Item = new Info_Item(4, false, []);  
    let Basic_Item = new Info_Item(8, false, []);  
    let Cpu_Item = new Info_Item(16, false, []);  
    let Mem_Item = new Info_Item(32, false, []);  
    let Net_Item = new Info_Item(64, false, []);  
    let Disk_Item = new Info_Item(128, false, []);  

    Data_Infos.set(
      {
        HOST_CODE:     Host_Item,
        LASTPERF_CODE: Lastperf_Item,
        BASIC_CODE:    Basic_Item,
        CPU_CODE:      Cpu_Item,
        MEM_CODE:      Mem_Item,
        NET_CODE:      Net_Item,
        DISK_CODE:     Disk_Item
      }
    );

  };

  export function Data_Infos_Refresh() {
    Data_Infos_Clear();

    // console.log(get(Mosaic_Arr).length);
    // console.log(get(Mosaic_Arr)[0]);

    // $Data_Info를 다시 셋팅한다.(arr[] 기준으로 다시...)
    let tmp_arr  = get(Mosaic_Arr);
    let tmp_Data = get(Data_Infos);
    // console.log("----------------------");    
    // console.log(tmp_arr[0]);

    // tmp_arr[0].node_text = 9999999;

    // console.log(get(Mosaic_Arr)[0]);
    // console.log(tmp_arr[0]);
    // console.log("----------------------");    
    
    for (let i = 0; i < tmp_arr.length; i++) {
      // 노드의 상태와 (node_text = Chart_Type)에 따라, List를 다시 꾸며야한다.
      if (tmp_arr[i].node_type === "P") {
        if (tmp_arr[i].left.node_type === "C"){
          // node_text를 보고 Chart의 성격별로 Item을 생성하여 넣어준다.
          switch (tmp_arr[i].left.node_text) {
            case "None":
              break;
            case "Grid":
              tmp_Data.LASTPERF_CODE.update_Node(tmp_arr[i].left.id, tmp_arr[i].left.host_List);
              break;
            case "Bar Chart":
              tmp_Data.BASIC_CODE.update_Node(tmp_arr[i].left.id, tmp_arr[i].left.host_List);
              break;
            case "Line Chart":
              tmp_Data.CPU_CODE.update_Node(tmp_arr[i].left.id, tmp_arr[i].left.host_List);
              break;
            case "Pie Chart":
              tmp_Data.NET_CODE.update_Node(tmp_arr[i].left.id, tmp_arr[i].left.host_List);
              break;
            // default:
            //   alert( "어떤 값인지 파악이 되지 않습니다." );
          };
        };

        if (tmp_arr[i].right.node_type === "C"){
          // node_text를 보고 Chart의 성격별로 Item을 생성하여 넣어준다.
          switch (tmp_arr[i].right.node_text) {
            case "None":
              break;
            case "Grid":
              tmp_Data.LASTPERF_CODE.update_Node(tmp_arr[i].right.id, tmp_arr[i].right.host_List);
              break;
            case "Bar Chart":
              tmp_Data.BASIC_CODE.update_Node(tmp_arr[i].right.id, tmp_arr[i].right.host_List);
              break;
            case "Line Chart":
              tmp_Data.CPU_CODE.update_Node(tmp_arr[i].right.id, tmp_arr[i].right.host_List);
              break;
            case "Pie Chart":
              tmp_Data.NET_CODE.update_Node(tmp_arr[i].right.id, tmp_arr[i].right.host_List);
              break;
            // default:
            //   alert( "어떤 값인지 파악이 되지 않습니다." );
          };
        };        
      } else if (tmp_arr[i].div_type === "N" && tmp_arr[i].node_type !== "D" && tmp_arr[i].p_id == null) {
        if (tmp_arr[i].node_type === "C"){
          // node_text를 보고 Chart의 성격별로 Item을 생성하여 넣어준다.
          switch (tmp_arr[i].node_text) {
            case "None":
              break;
            case "Grid":
              tmp_Data.LASTPERF_CODE.update_Node(tmp_arr[i].id, tmp_arr[i].host_List);
              break;
            case "Bar Chart":
              tmp_Data.BASIC_CODE.update_Node(tmp_arr[i].id, tmp_arr[i].host_List);
              break;
            case "Line Chart":
              tmp_Data.CPU_CODE.update_Node(tmp_arr[i].id, tmp_arr[i].host_List);
              break;
            case "Pie Chart":
              tmp_Data.NET_CODE.update_Node(tmp_arr[i].id, tmp_arr[i].host_List);
              break;
            // default:
            //   alert( "어떤 값인지 파악이 되지 않습니다." );
          };
        };    
      };
    };
    
    Data_Infos.set(tmp_Data);
  };

  export function load_Key_Flag() {

    let tmp_Flag = 2;
    let tmp_Data = get(Data_Infos);

    if (tmp_Data.LASTPERF_CODE.Flag_YN == true) {tmp_Flag += tmp_Data.BASIC_CODE.Code};
    if (tmp_Data.BASIC_CODE.Flag_YN == true)    {tmp_Flag += tmp_Data.BASIC_CODE.Code};
    if (tmp_Data.CPU_CODE.Flag_YN == true)      {tmp_Flag += tmp_Data.CPU_CODE.Code};
    if (tmp_Data.MEM_CODE.Flag_YN == true)      {tmp_Flag += tmp_Data.MEM_CODE.Code};
    if (tmp_Data.NET_CODE.Flag_YN == true)      {tmp_Flag += tmp_Data.NET_CODE.Code};
    if (tmp_Data.DISK_CODE.Flag_YN == true)     {tmp_Flag += tmp_Data.DISK_CODE.Code};


    return tmp_Flag;
  };