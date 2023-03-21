<script>
	import { scaleLinear } from 'd3';
  import { onMount } from 'svelte';
  import { WebReceiveLineData } from './store';

  export let data = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 }
  ];
  // const data = [
    // { x: 1979, y: 7.19 },
    // { x: 1980, y: 7.83 },
    // { x: 1981, y: 7.24 },
    // { x: 1982, y: 7.44 },
    // { x: 1983, y: 7.51 },
    // { x: 1984, y: 7.10 },
    // { x: 1985, y: 6.91 },
    // { x: 1986, y: 7.53 },
    // { x: 1987, y: 7.47 },
    // { x: 1988, y: 7.48 },
    // { x: 1989, y: 7.03 },
    // { x: 1990, y: 6.23 },
    // { x: 1991, y: 6.54 },
    // { x: 1992, y: 7.54 },
    // { x: 1993, y: 6.50 },
    // { x: 1994, y: 7.18 },
    // { x: 1995, y: 6.12 },
    // { x: 1996, y: 7.87 },
    // { x: 1997, y: 6.73 },
    // { x: 1998, y: 6.55 },
    // { x: 1999, y: 6.23 },
    // { x: 2000, y: 6.31 },
    // { x: 2001, y: 6.74 },
    // { x: 2002, y: 5.95 },
    // { x: 2003, y: 6.13 },
    // { x: 2004, y: 6.04 },
    // { x: 2005, y: 5.56 },
    // { x: 2006, y: 5.91 },
    // { x: 2007, y: 4.29 },
    // { x: 2008, y: 4.72 },
    // { x: 2009, y: 5.38 },
    // { x: 2010, y: 4.92 },
    // { x: 2011, y: 4.61 },
    // { x: 2012, y: 3.62 },
    // { x: 2013, y: 5.35 },
    // { x: 2014, y: 5.28 },
    // { x: 2015, y: 4.63 },
    // { x: 2016, y: 4.72 },
    // { x: 2017, y: 4.82 },
    // { x: 2018, y:	4.79 },
    // { x: 2019, y: 4.36 },
    // { x: 2020, y: 4 },
    // { x: 2021, y: 4.92 }
  // ];
const default_data = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
    { x: 7, y: 0 },
    { x: 8, y: 0 },
    { x: 9, y: 0 },
  ];  

	let xTicks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const yTicks = [0, 50, 100];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200;

  $:{data.length === 0 ? data = default_data : null};
  // console.log(data[0]);
  // if (data[0] = undefined) {
  //   data = [
  //     { x: 0, y: 0 },
  //     { x: 1, y: 10 },
  //     { x: 2, y: 20 },
  //     { x: 3, y: 30 },
  //     { x: 4, y: 40 },
  //     { x: 5, y: 50 },
  //     { x: 6, y: 60 },
  //     { x: 7, y: 70 },
  //     { x: 8, y: 80 },
  //     { x: 9, y: 90 }
  //   ];
  // }

  // if ((!data) || (data.length == 0)) {
  // // if (data.length == 0) {
  //   data = [...default_data];
  // }

	$: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	// let minX = 0;
	// let maxX = xTicks.length -1;
	// $: minX = data[0].x;
	// $: maxX = data[data.length - 1].x;
	// $: path = `M${data.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
	// $: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;
	$: minX = (data.length == 0 ? 0 : data[0].x);
	$: maxX = (data.length == 0 ? 9 : data[data.length - 1].x);
	$: path = `M${data.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
	$: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

	function formatMobile (tick) {
		return "'" + tick.toString().slice(-2);
	};

  WebReceiveLineData.subscribe((Item) => {
    // console.log("==============Line Data================");
    // console.log(Item);

		let tmp_Main = Item;
    let tmp_Sub = [];
    let tmp_Data = [];
		let tmp_Tick = [];

    for (let i = 0; i < tmp_Main.length; i++) {
      tmp_Sub = tmp_Main[i];
      tmp_Data.push({
        // x: parseInt(tmp_Sub[0]),
        x: i,
				y: parseInt(tmp_Sub[4])
      });

			// tmp_Tick.push(parseInt(tmp_Sub[0]));
      tmp_Tick.push(i);
    };

		if (tmp_Tick.length > 0) {
			xTicks = tmp_Tick;
		} else {
			xTicks = [0,1,2,3,4,5,6,7,8,9];
		};
		
		if (tmp_Data.length > 0) {
    	data = tmp_Data;
		};

		// console.log(xTicks);
  });	
</script>

<!-- {#if ((data == "undefined") || (data.length == 0))} -->
{#if (data.length > 0)}
  <!-- {console.log("Line data.length = 0")} -->
  <!-- {data = default_data} -->
  <div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
    <svg>
      <!-- y axis -->
      <g class="axis y-axis" transform="translate(0, {padding.top})">
        {#each yTicks as tick}
          <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
            <line x2="100%"></line>
            <text y="-4">{tick} {tick === 8 ? ' ' : ''}</text>
          </g>
        {/each}
      </g>
  
      <!-- x axis -->
      <g class="axis x-axis">
        {#each xTicks as tick}
          <g class="tick tick-{ tick }" transform="translate({xScale(tick)},{height})">
            <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0"></line>
            <text y="-2">{width > 380 ? tick : formatMobile(tick)}</text>
          </g>
        {/each}
      </g>
  
      <!-- data -->
      <path class="path-area" d={area}></path>
      <path class="path-line" d={path}></path>
    </svg>
  </div>    
{/if}
<!-- {console.log(data)} -->

<!-- {#if (data.length > 0)}

{/if} -->

<style>
	.chart {
		width: 100%;
    height: 95%;
		max-width: 95%;
		margin-left: auto;
		margin-right: auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.tick {
		font-size: .725em;
		font-weight: 200;
	}

	.tick line {
		stroke: rgb(14, 13, 13);
		stroke-dasharray: 2;
	}

	.tick text {
		fill: rgb(8, 8, 8);
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke: rgb(186, 253, 0);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
    transition: 0.5s;
	}

	.path-area {
		fill: rgba(81, 83, 221, 0.2);
    transition: 0.5s;    
	}
</style>