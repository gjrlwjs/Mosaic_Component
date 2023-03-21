<script>
  import { Mosaic_Arr, WebReceiveGridData } from "./store";
  // import VirtualList from '@sveltejs/svelte-virtual-list';
  import VirtualList from './onTuneScroll.svelte';

  export let data = [
    { hostname: "-", 
      col1: 0,     col2: 0,     col3: "-" ,  col4: "-" ,  col5: "-" ,  col6: "-" ,  col7: "-" ,  col8: "-" ,  col9: "-" ,  col10: "-", 
      col11: "-" , col12: "-" , col13: "-" , col14: "-" , col15: "-" , col16: "-" , col17: "-" , col18: "-" , col19: "-" , col20: "-" , 
      col21: "-" , col22: "-" , col23: "-" , col24: "-" , col25: "-" , col26: "-" , col27: "-" , col28: "-" , col29: "-" , col30: "-"  
    }
  ];

  const default_data = [
  { hostname: "-", 
    col1: 0,     col2: 0,     col3: "-" ,  col4: "-" ,  col5: "-" ,  col6: "-" ,  col7: "-" ,  col8: "-" ,  col9: "-" ,  col10: "-", 
    col11: "-" , col12: "-" , col13: "-" , col14: "-" , col15: "-" , col16: "-" , col17: "-" , col18: "-" , col19: "-" , col20: "-" , 
    col21: "-" , col22: "-" , col23: "-" , col24: "-" , col25: "-" , col26: "-" , col27: "-" , col28: "-" , col29: "-" , col30: "-"  
  }
  ];  

  // if (data.length == 0) {
  //   data = [...default_data];
  // };

	$:{data.length === 0 ? data = default_data : null};
  // $:{isNaN(document.getElementById("width_bar").offsetWidth) == false ? tmp_width = document.getElementById("width_bar").offsetWidth : 0};

  WebReceiveGridData.subscribe((Item) => {
    let tmp_Main = Item;
    let tmp_Sub = [];
    let tmp_Data = [];


    // let my_Node = $Mosaic_Arr[my_ID];
    // // my_Hieght = 402.5 div 30 => 14 x 3
    // let my_Hieght = my_Node.inset_bottom - my_Node.inset_bottom;

    // 현재 스크롤의 위치와 Hieght를 받아와서 얼마만큼 데이터를 뽑아다가 컴포넌트에 던져줄지 결정해서 추출한다.
    for (let i = 0; i < tmp_Main.length; i++) {
      tmp_Sub = tmp_Main[i];
      tmp_Data.push({
        hostname: tmp_Sub[0], 
        col1: parseInt(tmp_Sub[3]), col2: parseInt(tmp_Sub[4]), col3: tmp_Sub[5],  col4: tmp_Sub[6],  col5: tmp_Sub[10],  col6: tmp_Sub[11],  col7: tmp_Sub[12],  col8: tmp_Sub[13],  col9: tmp_Sub[14],  col10: tmp_Sub[17], 
        col11: tmp_Sub[18], col12: tmp_Sub[21], col13: tmp_Sub[22], col14: tmp_Sub[23], col15: tmp_Sub[24], col16: tmp_Sub[25], col17: tmp_Sub[26], col18: tmp_Sub[27], col19: tmp_Sub[28], col20: tmp_Sub[29], 
        col21: tmp_Sub[30], col22: tmp_Sub[31], col23: tmp_Sub[32], col24: tmp_Sub[33], col25: tmp_Sub[34], col26: tmp_Sub[35], col27: tmp_Sub[36], col28: tmp_Sub[37], col29: tmp_Sub[38], col30: tmp_Sub[39]  
      });
    };

    data = tmp_Data;

    // Top | Bottom Div의 padding 변경
    // ???
  });  

  // const data = [
  //   { name: "John", email: "john@example.com", col1: "가", col2: "A", col3: "a", col4: "1", col5: arr1, col6: arr1[0], col7: arr1[1], col8: "1", col9: "1", col10: "1"},
  //   { name: "Mark", email: "mark@gmail.com", col1: "나", col2: "B", col3: "b", col4: "2", col5: arr1, col6: arr1[0], col7: arr1[1], col8: "2", col9: "2", col10: "2"},
  //   { name: "John", email: "mark@gmail.com", col1: "나", col2: "B", col3: "b", col4: "2", col5: arr1[0], col6: arr1[0], col7: arr1[1], col8: "3", col9: "3", col10: "3"},
  //   { name: "John", email: "mark@gmail.com", col1: "나", col2: "B", col3: "b", col4: "2", col5: arr1[0], col6: arr1[0], col7: arr1[1], col8: "4", col9: "4", col10: "4"},
  //   { name: "John", email: "mark@gmail.com", col1: "나", col2: "B", col3: "b", col4: "2", col5: arr1[0], col6: arr1[0], col7: arr1[1], col8: "5", col9: "5", col10: "5"},
  //   { name: "John", email: "mark@gmail.com", col1: "나", col2: "B", col3: "b", col4: "2", col5: arr1[0], col6: arr1[0], col7: arr1[1], col8: "6", col9: "6", col10: "6"},
  //   { name: "John", email: "mark@gmail.com", col1: "나", col2: "B", col3: "b", col4: "2", col5: arr1[0], col6: arr1[0], col7: arr1[1], col8: "7", col9: "7", col10: "7"},
  // ]
</script>

<!-- Grid -->
<div class="div_Grid">
  <!-- 헤더 -->
  <!-- <div class="header_div" style="height: 36px;">
    <div class="header_cell">hostname</div>
    <div class="header_cell">col1</div>
    <div class="header_cell">col2</div>
    <div class="header_cell">col3</div>
    <div class="header_cell">col4</div>
    <div class="header_cell">col5</div>
    <div class="header_cell">col6</div>
    <div class="header_cell">col7</div>
    <div class="header_cell">col8</div>
    <div class="header_cell">col9</div>
    <div class="header_cell">col10</div>
    <div class="header_cell">col11</div>
    <div class="header_cell">col12</div>
    <div class="header_cell">col13</div>
    <div class="header_cell">col14</div>
    <div class="header_cell">col15</div>
    <div class="header_cell">col16</div>
    <div class="header_cell">col17</div>
    <div class="header_cell">col18</div>
    <div class="header_cell">col19</div>
    <div class="header_cell">col20</div>
    <div class="header_cell">col21</div>
    <div class="header_cell">col22</div>
    <div class="header_cell">col23</div>
    <div class="header_cell">col24</div>
    <div class="header_cell">col25</div>
    <div class="header_cell">col26</div>
    <div class="header_cell">col27</div>
    <div class="header_cell">col28</div>
    <div class="header_cell">col29</div>
    <div class="header_cell">col30</div>
  </div> -->

  <!-- {console.log(data)} -->
  <!-- <div class="data_div" style={`height: calc(100% - 36px)`}> -->
  <div class="data_div">
    <VirtualList items={data} let:item>
      <!-- {#each data as item, index} -->
        <!-- {console.log(index)} -->
        <div class="row_div">
          <div class="row_cell">{item.hostname}</div>
          <div class="row_cell" id="width_bar">
            <div style='width: 40px; height: 100%;'>{item.col1}%</div>

            <div class="div_width_bar" style={`width: calc(100% - 40px); height: 100%; border-color: white; border-width: 1px; border-style: double;`}>
              <div style='width: {item.col1}%; background-color: rgb(112, 118, 194); height: 100%; max-width: 100%; transition: 0.5s;'></div>
            </div>
          </div>
          <div class="row_cell">{item.col2}</div>
          <div class="row_cell">{item.col3}</div>
          <div class="row_cell">{item.col4}</div>
          <div class="row_cell">{item.col5}</div>
          <div class="row_cell">{item.col6}</div>
          <div class="row_cell">{item.col7}</div>
          <div class="row_cell">{item.col8}</div>
          <div class="row_cell">{item.col9}</div>
          <div class="row_cell">{item.col10}</div>
          <div class="row_cell">{item.col11}</div>
          <div class="row_cell">{item.col12}</div>
          <div class="row_cell">{item.col13}</div>
          <div class="row_cell">{item.col14}</div>
          <div class="row_cell">{item.col15}</div>
          <div class="row_cell">{item.col16}</div>
          <div class="row_cell">{item.col17}</div>
          <div class="row_cell">{item.col18}</div>
          <div class="row_cell">{item.col19}</div>
          <div class="row_cell">{item.col20}</div>
          <div class="row_cell">{item.col21}</div>
          <div class="row_cell">{item.col22}</div>
          <div class="row_cell">{item.col23}</div>
          <div class="row_cell">{item.col24}</div>
          <div class="row_cell">{item.col25}</div>
          <div class="row_cell">{item.col26}</div>
          <div class="row_cell">{item.col27}</div>
          <div class="row_cell">{item.col28}</div>
          <div class="row_cell">{item.col29}</div>
          <div class="row_cell">{item.col30}</div>      
        </div>
      <!-- {/each} -->
    </VirtualList>
  </div>
</div>
<!-- Row -->
  <!-- col 1 ~ n -->

<style>
  .div_Grid{
    width: 100%;
    height: 100%;

    position: relative;
  }
/* 
  .header_div {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 2;

    background-color: midnightblue;
    display: flex;
  }

  .header_cell {
    width: 150px;
    height: 30px;
    min-width: 150px;
    display: flex;

    justify-content: left;
    align-items: center;

    font-family: sans-serif;
    color: white;
    font-weight: 600;
    padding-left: 6px;
    background-color: rgb(85, 84, 84);

    border-color: white;
    border-style: groove;
  } 
*/
  .data_div {
    position: relative;
    background-color: black;
    height: 100%;
    display: flex;  
  }

  .row_div {
    position: relative;
    background-color: black;
    display: flex;  
  }

  .row_cell {
    width: 150px;
    height: 30px;
    min-width: 150px;

    justify-content: left;
    align-items: center;

    font-family: sans-serif;
    color: white;
    background-color: black;
    padding-left: 12px;

    display: flex;
  }

  /* Grid Scroll */
  .div_Grid::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  .div_Grid::-webkit-scrollbar-thumb {
    background-color: #404247;
    border-radius: 10px;
  }

  .div_Grid::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }

  .div_Grid::-webkit-scrollbar-button{
    background-color: white;
    width: 16px;
    height: 16px;
    /* display: block; */
    /* border-style: solid; */
  }

  /* 스크롤 버튼 */
  /* Up */
  .div_Grid::-webkit-scrollbar-button:vertical:decrement {
    background-image: url("img/grid_scroll/scroll_up_N.png");
  }
  .div_Grid::-webkit-scrollbar-button:vertical:decrement:hover {
    background-image: url("img/grid_scroll/scroll_up_H.png");
  }

  /* Down */
  .div_Grid::-webkit-scrollbar-button:vertical:increment {
    background-image: url("img/grid_scroll/scroll_down_N.png");
  }  
  .div_Grid::-webkit-scrollbar-button:vertical:increment:hover {
    background-image: url("img/grid_scroll/scroll_down_H.png");
  }  

  /* Left */
  .div_Grid::-webkit-scrollbar-button:horizontal:decrement {
    background-image: url("img/grid_scroll/scroll_left_N.png");
  }
  .div_Grid::-webkit-scrollbar-button:horizontal:decrement:hover {
    background-image: url("img/grid_scroll/scroll_left_H.png");
  }

  /* Right */
  .div_Grid::-webkit-scrollbar-button:horizontal:increment {
    background-image: url("img/grid_scroll/scroll_right_N.png");
  }  
  .div_Grid::-webkit-scrollbar-button:horizontal:increment:hover {
    background-image: url("img/grid_scroll/scroll_right_H.png");
  }  



  /* Left */
  /* .div_Grid::-webkit-scrollbar-button::decrement {
    border-width: 0 8px 8px 8px;
    border-color: transparent transparent #404247 transparent;
  } */
  /* .div_Grid::-webkit-scrollbar-button:horizontal:decrement:hover {
    border-color: transparent transparent #777777 transparent;
  } */

  /* Right */
  /* .div_Grid:-webkit-scrollbar-button:horizontal:increment {
    border-width: 8px 8px 0 8px;
    border-color: #404247 transparent transparent transparent;
  } */
  /* .div_Grid::-webkit-scrollbar-button:horizontal:increment:hover {
    border-color: #777777 transparent transparent transparent;
  }     */
</style>