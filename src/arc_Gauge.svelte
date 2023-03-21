<script>
    import { writable } from 'svelte/store';
	import { tweened, spring } from 'svelte/motion';
	import { backInOut } from 'svelte/easing';
	import { arc as d3arc } from 'd3-shape';
	import { scaleLinear } from 'd3-scale';

    export let bindData = 0;
    export let sizeData = 0;

    let width = 200;
	let height = 200;

    $: width = sizeData;
    $: height = sizeData;

    let value = spring(0, { stiffness: .1 });
    let min = 0;
	let max = 100;
	
	let startAngle = 90;
	let endAngle = -270;
	let innerRadius = 50;
	let outerRadius = 60;
	let cornerRadius = 10;

    $:innerRadius = (sizeData / 2) * 0.7;
    $:outerRadius = (sizeData / 2) * 0.7 + 10;

    $:value.set(bindData);
	
	$: scale = scaleLinear()
		.domain([min, max])
		.range([startAngle, endAngle]);
	
	$: valueAngle = scale($value);

	$: arc = d3arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.startAngle(startAngle * Math.PI / 180)
		.endAngle(valueAngle * Math.PI / 180)
		.cornerRadius(cornerRadius);
	
	$: trackArc = d3arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.startAngle(startAngle * Math.PI / 180)
		.endAngle(endAngle * Math.PI / 180)
		.cornerRadius(cornerRadius);
	
	$: trackArcCentroid = trackArc.centroid()
  // $: console.log(trackArcCentroid)
	
	let trackArcEl
	$: boundingBox = trackArc && trackArcEl ? trackArcEl.getBBox() : {};
  // $: console.log(boundingBox)
	
	$: textArcCenterOffset = {
		x: (outerRadius - (boundingBox.width  / 2)),
    // x: 0,
		y: (outerRadius - (boundingBox.height  / 2)) * -1
	}
  // $: console.log(textArcCenterOffset)
	
		$: textArcBottomOffset = {
		x: (outerRadius - (boundingBox.width  / 2)),
    // x: 0,
		y: (outerRadius - (boundingBox.height)) * -1
	}
  // $: console.log(textArcBottomOffset)
	
</script>

<svg {width} {height}>
    <circle r={(innerRadius + outerRadius) / 2} cx={width/2} cy={height/2} fill="none" stroke="gray" stroke-width="2"/>
	<path d={trackArc()} transform="translate({width/2}, {height/2})" class="track" bind:this={trackArcEl} />
	<path d={arc()} transform="translate({width/2}, {height/2})" />

    <text y="50%" x="50%">
        {Math.round($value)}%
    </text>

</svg>
<style>
	svg {
		background-color: none;

	}
	path {
		fill: rgb(20, 200, 200);
        width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
/* 		fill: red; */
/* 		fill: conic-gradient(gold 40%, #f06 0); */
		
	}
	
	.track {
		/* stroke: rgb(20, 200, 200);
		stroke-width: 1px; */
        width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
		fill: none;
	}
	
	text {
		fill: rgb(20, 200, 200);
		font-size: 2rem;
		text-anchor: middle;
        alignment-baseline:middle;
        width: 100%;
            height: 100%;
	}
	
	/* input[type=number] {
    width: 72px;
	} */
</style>
