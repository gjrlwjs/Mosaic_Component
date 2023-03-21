<script>
// @ts-nocheck

  import { Tabs, TabList, TabPanel, Tab } from 'svelte-tabs'; 
  import OntuneTreeTypeOne from './ontuneTreeTypeOne.svelte';
  import OntuneTreeTypeTwo from './ontuneTreeTypeTwo.svelte';
  import { fade, draw, fly } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { expoInOut } from 'svelte/easing';
  import {onMount, tick} from 'svelte';
  import  {WebReceiveData} from './store.js';
  import { get } from 'svelte/store';
  

  import {Svrollbar, Svroller} from "svrollbar"    


  let activeTab;
  let workEvent;
  let alterWorkTimer;
  let timeOutTimer;
  let isSend = false;
  let drawCount = 1000;
  let updateCount = 500;
  let workIntervalTime = 1;
  let SetWorkIntervalTime = 1;
  let isReverse = false;
  let ItemList;
  let visibleTestMode = false;
  let updateDrawCount = 1000;
  let UpdateListItem = ItemList;
  let StoreUpdateList;
  let copyupdateCount = updateCount;

  WebReceiveData.subscribe(value => {
    // StoreUpdateList = String(value.data).split(",");
    // if (isReverse === true) { 
    //     isReverse = false; 
    //   } else {
    //     isReverse = true;
    // }

    // UpdateListItem = StoreUpdateList;

    
    StoreUpdateList = String(value.data).split(",");
    let tmp_Data = [];

    // 현재 스크롤의 위치와 Hieght를 받아와서 얼마만큼 데이터를 뽑아다가 컴포넌트에 던져줄지 결정해서 추출한다.
    for (let i = 0; i < StoreUpdateList.length; i++) {
      tmp_Data.push({hostname: StoreUpdateList[i]});
    };

    if (isReverse === true) { 
        isReverse = false; 
      } else {
        isReverse = true;
    };

    UpdateListItem = tmp_Data;   
    // console.log(tmp_Data); 
  })

  init();

  function init() {
    ItemList = Array.from({ length: 0 }).map((_, i) => `item ${i}`);    
    UpdateListItem = ItemList;
  }
  
  const progress = tweened(0, {
		duration: 400,
		easing: expoInOut
	});

  function updateTreeList(listData) {
    if (isReverse === true) { 
          isReverse = false; 
        } else {
          isReverse = true;
        }
    
    ItemList = listData;
    UpdateListItem = ItemList;
  }

  function updateItemList(e) {
    if (e.data != 'error') {
       updateTreeList(e.data);
      }
  }

  function testWorker() {
    workEvent = new Worker('ontuneTreeListMaker.js');
    workEvent.onmessage = updateItemList;
    loopEvent();    
  }

  function loopEvent() {
    clearTimeout(timeOutTimer);
    timeOutTimer = setTimeout( function() {
      workEvent.postMessage(updateDrawCount);
      loopEvent();
    },SetWorkIntervalTime * 1000);
  }  
  
  function tabChange(e) {
      activeTab = e.detail;
      console.log(e.detail);
    }

  function ChangeChangeCount() {
    copyupdateCount = updateCount;
  }

  function ChangeWorkIntervalTime() {    
    if (workIntervalTime > 0) {
      if(window.Worker) {
        SetWorkIntervalTime = workIntervalTime;

        console.log("possible worker");
        testWorker();
      }    
  
      //StartProcess();
    }
    else {
      console.log("0초니까 ");
      workEvent.terminate();
      clearInterval(alterWorkTimer);     
    }
  }

    function ChangeNodeCount() {
      updateDrawCount = drawCount;
      updateTreeList(ItemList);
    }

    function EnterWork(e) {
      if(e.key === "Enter") {
        ChangeNodeCount();
      }
    }

    function ResizeTree(event) {
      let data = document.getElementById("wrapper");

    }

    // function StartProcess() {
    //   clearInterval(alterWorkTimer);   
    //   alterWorkTimer = setInterval(() => {
    //     let findBar = document.getElementsByClassName(indeterminate-progress-bar);
    //     if (isSend === false) {
    //         isSend = true;
    //         progress.set(1.0);
    //     } else {
    //         isSend = false;
    //         progress.set(0.0)            
    //     }

    //   }, 1000);   
    // }

    let viewport;
    let contents;

</script>

<style>
  .inputtext {
    width : 50px;
  }
  .inputbutton {
    width : 160px;
  }
  label {
    color: azure;
    font-size: medium;
  }

  #tabsection{  
    position: relative;  
    height: 100%;
    margin-right: 6px;

    /* overflow: hidden; */
  }

  .wrapper {
    position: absolute;
    inset: "0% 0% 0% 0%";

    width: 100%;
    height: 96.3%;

  }
  
  .viewport {
    /* position: relative; */
    display: flex;
    /* height: 100%; */
    width:auto;
    height: inherit;
    /* right: 0px; */
    overflow: scroll;
    /* overflow-y: 100%; */
    /* border: 1px solid gray; */
    /* box-sizing: context-box; */

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  
    .viewport::-webkit-scrollbar {
      /* hide scrollbar */
      display: none;
    }

    .contents {
        font: 800;
    }

    :global(.svelte-tabs li.svelte-tabs__tab) {
      color:white;
    }

    :global(.svelte-tabs li.svelte-tabs__selected){
      color: #4F81E5;
    }


    .indeterminate-progress-bar {
    /* Color */
    background-color: #d1d5db;

    /* Rounded border */
    border-radius: 9999px;

    /* Size */
    height: 0.5rem;

    position: relative;
    overflow: hidden;
}

.indeterminate-progress-bar__progress {
    /* Color */
    background-color: #3b82f6;

    /* Rounded border */
    border-radius: 9999px;

    /* Absolute position */
    position: absolute;
    bottom: 0;
    top: 0;
    width: 50%;

    /* Move the bar infinitely */
    animation-duration: 2s;
    animation-iteration-count: 0;
    animation-name: indeterminate-progress-bar;
}

@keyframes indeterminate-progress-bar {
    from {
        left: -50%;
    }
    to {
        left: 100%;
    }
}
   
   

</style>

<section id="tabsection">
  <label>
    <input type="checkbox" bind:checked={visibleTestMode}>testMode
  </label>
  <br>
  {#if visibleTestMode}
  <div class="centered" display=none>
    <!-- <input type="text" id="txt_showCount" class="inputtext"  bind:value={drawCount} on:keydown={EnterWork}/>
    <button id="btn_showCount" class="inputbutton" on:click={ChangeNodeCount} >표시할 host 개수</button>
    <br>
    데이터 업데이트 주기
    <br>
    <input type="number" id="txt_updateTime" class="inputtext"  bind:value={workIntervalTime} on:keydown={(e) => {if (e.key === "Enter") {ChangeWorkIntervalTime();}}} />
    <input type="range" bind:value={workIntervalTime} min = 0 max = 60 />
    <br> -->
    <input type="text" id="txt_updateCount" class="inputtext" bind:value={updateCount} on:keydown={(e) => {if (e.key === "Enter") {ChangeChangeCount();}}} />
    <button id="btn_updateCount" class="inputbutton" on:click={ChangeChangeCount} >Update개수변경</button>
    <br>
    <!-- <button id="btn_updateTime" class="inputbutton" on:click={ChangeWorkIntervalTime}>자동변경 타이머 시작</button>
    <br>
    <progress value={$progress}></progress> -->
    <!-- <div class="indeterminate-progress-bar">
      <div class="indeterminate-progress-bar__progress"></div>
    </div> -->
  </div>
  {/if}

  
  <Tabs on:tabChange={tabChange}  >
    <TabList>
      <Tab HtmlTag="host">host</Tab>
      <Tab HtmlTag="vmhost">VMHost</Tab>
      <Tab HtmlTag="group">group</Tab>
    </TabList>
    <div class="wrapper">
      <div bind:this={viewport} class="viewport">
          <div bind:this={contents} class="contents">
              
      <TabPanel>
          <OntuneTreeTypeOne nodeItem={UpdateListItem} isReverse={isReverse} updateCount={copyupdateCount}  />
      </TabPanel>
      <TabPanel>
        <!-- <OntuneTreeTypeTwo nodeCount={updateDrawCount} isReverse={isReverse} updateCount={copyupdateCount} /> -->
      </TabPanel>
      <TabPanel>
        <!-- <h1>또다른 그룹</h1> -->
      </TabPanel>
    </div>
  </div>
  <!-- <Svrollbar {viewport} {contents} alwaysVisible={true} /> -->
  </div>
  </Tabs>

</section>







