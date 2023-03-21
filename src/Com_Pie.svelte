<script>
    import { tweened } from "svelte/motion";
    import ArcGauge from "./arc_Gauge.svelte";
    import { WebReceivePieData } from './store.js';

    export let size = 200;
    export let bgColor = 'cornflowerblue';
    export let fgColor = 'orange';
    let data = [];
    data = [0, 0];
    let arcWidth = 0, arcHeight = 0; 
    
    const bindData1 = tweened(0, {duration:500});
    const bindData2 = tweened(0, {duration:500});

    $:{data.length === 0 ? data = [0,0] : null};	

    WebReceivePieData.subscribe((value) => {
        if(Number.isNaN(value.value1) == false && Number.isNaN(value.value2) == false)
        {
            data = [value.value1, value.value2];
        }
    });

    $: bindData1.set(data[0]);
    $: bindData2.set(data[1]);
    
    $: size = ((arcWidth / 2)>arcHeight?arcHeight:(arcWidth/2)) - 50;
    $: viewBox = `0 0 ${size} ${size}`;
    
    $: radius = size / 2;
    $: halfCircumference = Math.PI * radius;
    $: pie1Size = halfCircumference * ($bindData1 / 100);
    $: pie2Size = halfCircumference * ($bindData2 / 100);
    $: dash1Array = `0 ${halfCircumference - pie1Size} ${pie1Size}`;
    $: dash2Array = `0 ${halfCircumference - pie2Size} ${pie2Size}`;

  </script>
  
<div id="PieChartDiv" bind:clientWidth={arcWidth} bind:clientHeight={arcHeight}>
    <div class="Data" id="Value1" >
        <ArcGauge bindData={data[0]} sizeData={size} />
    </div>

        
    
    <div class="Data" id="Value2" >
        <ArcGauge bindData={data[1]} sizeData={size} />
        <!-- <svg width={size} height={size} {viewBox} >
            <circle r={radius} cx={radius} cy={radius} fill={bgColor} />
            <circle
            r={radius / 2}
            cx={radius}
            cy={radius}
            fill={bgColor}
            stroke={fgColor}
            stroke-width={radius}
            stroke-dasharray={dash2Array}
            />
            <text y="50%" x="50%" >{data[1]}%</text>
        </svg> -->
    </div>
</div>


    <style>
        #PieChartDiv {
            width: 100%;
            height: 100%;

            position: relative;
            justify-content: center;
            align-items: center;
            display: flex;
            
        }
        .Data#Value1 {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

        }

        .Data#Value2 {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

        }
        #PieChartDiv .Data text {
            fill:aquamarine;
            font-size: 100%;
            text-anchor:middle;
            alignment-baseline:middle;
            /* font-size-adjust: "spacingAndGlyphs"; */
        }
    </style>