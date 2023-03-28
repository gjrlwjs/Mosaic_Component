<script>
  import { onMount } from 'svelte';
  import { Mosaic_Arr, Data_Infos } from './store.js';
  // import { get } from 'svelte/store';  
  import { Data_Infos_Clear } from './uStore_Function.js';
  import WebsocketWorker from './websocketWorker.svelte';

  import Mosaic from './Mosaic.svelte';
  import Sub_Window from './Sub_window.svelte';

  import { Router, Route } from 'svelte-routing';
  
  // onMount(() => {
  //   // Data_Info 초기화
  //   Data_Infos_Clear();
  //   // console.log("Data_Infos Clear ===========================================");
  //   // console.log(get(Data_Infos));

  //   // console.log(Data_Infos);
  // });

  // function onMouseDown_Main_bar_event(e) {
  //   // drag_node = null;

  //   // console.log("============Main Bar Down===========");

  //   // 마우스 다운 이벤트 발생 => 마우스의 움직임에 따라, onMouseMove 이벤트를 유지한다(onMouseUp이 될 때까지 or onMouseLeave)
  //   // 마우스 움직임에 따른 이벤트 등록
  //   let main_bar = e.target;
  //   main_bar.addEventListener('dragstart', onMouseDragstart_Main_bar_event);
  //   main_bar.addEventListener('drag',      onMouseDrag_Main_bar_event);
  //   main_bar.addEventListener('dragend',   onMouseDragend_Main_bar_event);

  //   // bar.addEventListener("touchmove", onMouseDrag_bar_event, TOUCH_EVENT_OPTIONS);
  //   // bar.addEventListener("touchend", onMouseDragend_bar_event, true);

  //   function onMouseDragstart_Main_bar_event(event) {
  //     // console.log("==========Main Bar Drag Start=========");

  //     // let cv = new ImageBitmap();
  //     // cv.width  = 0;
  //     // cv.height = 0;
  //     // event.dataTransfer.setDragImage(cv, 0, 0);      
  //   }    

  //   function onMouseDrag_Main_bar_event(event) {
  //     // console.log("===========Main Bar Drag===========");
  //     event.preventDefault();
  //   }

  //   function onMouseDragend_Main_bar_event(event) {
  //     // console.log("============Main Bar Up===========");
  //     // 배율 변경
  //     if (event.x > 0 || event.y > 0) {
  //       let tmp_ratio = 0;
  //       let tmp_A = document.getElementById("div_tree");
  //       let tmp_B = document.getElementById("div_mosaic");
  //       let tmp_C = document.getElementById("div_mosaic_main");
  //       let tmp_D = document.getElementById("div_grid");

  //       // 현재 마우스의 좌표를 기준으로, 몇퍼센트인지 역계산을 해줘야한다.
  //       // (마우스의 현재 좌표 / 부모의 길이) * 100
  //       // 대상이 main_Col | main_Row 에 따라 다르다.
  //       if (main_bar.id === "main_Col") {
  //         tmp_ratio = ((event.clientX)      / window.innerWidth)  * 100;
  //       } else {
  //         tmp_ratio = ((event.clientY - 40) / window.innerHeight) * 100;
  //       } 
  //       if (tmp_ratio < 15) {
  //         tmp_ratio = 15;
  //       } else if (tmp_ratio > 85) {
  //         tmp_ratio = 85;
  //       }

  //       // debugger;
  //       if (main_bar.id === "main_Col") {
  //         tmp_A.style.width  =        tmp_ratio  + '%';
  //         tmp_B.style.width  = (100 - tmp_ratio) + '%';

  //         // console.log( tmp_A.style.width);
  //         // console.log( tmp_B.style.width);
  //       } else {
  //         tmp_C.style.height =        tmp_ratio  + '%';
  //         tmp_D.style.height = (100 - tmp_ratio) + '%';

  //         // console.log( tmp_C.style.height);
  //         // console.log( tmp_D.style.height);
  //       }             
  //       // `${e.right.inset_top}% ${e.right.inset_right}% ${e.right.inset_bottom}% ${e.right.inset_left}%` 
  //       // tmp_r.ratio = 100 - tmp_l.ratio;

  //       // // inset 재조정
  //       // bst.resize_div(arr);

  //       // // 배열 갱신
  //       // setArr([...arr]);        

  //       // console.log("=============client 좌표");
  //       // console.log(event.clientX + " / " + event.clientY);
  //     };

  //     main_bar.removeEventListener('dragstart', onMouseDragstart_Main_bar_event);          
  //     main_bar.removeEventListener('drag',      onMouseDrag_Main_bar_event);
  //     main_bar.removeEventListener('dragend',   onMouseDragend_Main_bar_event);

  //     // bar.removeEventListener("touchmove", onMouseDrag_bar_event,TOUCH_EVENT_OPTIONS);
  //     // bar.removeEventListener("touchend", onMouseDragend_bar_event, true);

  //     // console.log(arr);

  //     // // inset 재조정
  //     // bst.resize_div(arr);

  //     // // 배열 갱신
  //     // setArr([...arr]);
  //   }    
  // };

  // const onClick_Mosaic_Add (){
  //   Mosaic.Add_div(e);
  // };
</script>

<!-- HTML -->
<div id="div_mosaic">
  <!-- <Router>
    <Route path="/" component={Mosaic} />
    <Route path="/sub" component={Sub_Window} />
  </Router> -->
  <Mosaic />
</div>	


<style>
  /* #theme_type {
    float: left;
  } */

</style>