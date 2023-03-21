<script>
	import { onMount, tick } from 'svelte';

	// props
	export let items;
	export let height = '100%';
	export let itemHeight = undefined;

	let foo;

	// read-only, but visible to consumers via bind:start
	export let start = 0;
	export let end = 0;

	// local state
	let height_map = [];
	let rows;
	let viewport;
	let contents;
	let viewport_height = 0;
	let visible;
	let mounted;

	let top = 0;
	let bottom = 0;
	let average_height;

	$: visible = items.slice(start, end).map((data, i) => {
		return { index: i + start, data };
	});

	// whenever `items` changes, invalidate the current heightmap
	$: if (mounted) refresh(items, viewport_height, itemHeight);

	async function refresh(items, viewport_height, itemHeight) {
		const { scrollTop } = viewport;

		// console.log(scrollLeft);
		await tick(); // wait until the DOM is up to date

		let content_height = top - scrollTop;
		let i = start;

		while (content_height < viewport_height && i < items.length) {
			let row = rows[i - start];

			if (!row) {
				end = i + 1;
				await tick(); // render the newly visible row
				row = rows[i - start];
			}

			const row_height = height_map[i] = itemHeight || row.offsetHeight;
			content_height += row_height;
			i += 1;
		}

		end = i;

		const remaining = items.length - end;
		average_height = (top + content_height) / end;

		bottom = remaining * average_height;
		height_map.length = items.length;

	}

	async function handle_scroll() {
		const { scrollTop, scrollLeft } = viewport;

		const old_start = start;

		for (let v = 0; v < rows.length; v += 1) {
			height_map[start + v] = itemHeight || rows[v].offsetHeight;
		}

		let i = 0;
		let y = 0;

		while (i < items.length) {
			const row_height = height_map[i] || average_height;
			if (y + row_height > scrollTop) {
				start = i;
				top = y;

				break;
			}

			y += row_height;
			i += 1;
		}

		while (i < items.length) {
			y += height_map[i] || average_height;
			i += 1;

			if (y > scrollTop + viewport_height) break;
		}

		end = i;

		const remaining = items.length - end;
		average_height = y / end;

		while (i < items.length) height_map[i++] = average_height;
		bottom = remaining * average_height;

		// prevent jumping if we scrolled up into unknown territory
		if (start < old_start) {
			await tick();

			let expected_height = 0;
			let actual_height = 0;

			for (let i = start; i < old_start; i +=1) {
				if (rows[i - start]) {
					expected_height += height_map[i];
					actual_height += itemHeight || rows[i - start].offsetHeight;
				}
			}

			const d = actual_height - expected_height;
			// viewport.scrollTo(0, scrollTop + d);
			viewport.scrollTo(scrollLeft, scrollTop + d);
		}

		// TODO if we overestimated the space these
		// rows would occupy we may need to add some
		// more. maybe we can just call handle_scroll again?
	}

	// trigger initial refresh
	onMount(() => {
		rows = contents.getElementsByTagName('svelte-virtual-list-row');
		mounted = true;
	});
</script>

<style>
	svelte-virtual-list-viewport {
		/* position: absolute; */
		position: relative;
		/* overflow-x: hidden; */
		overflow: auto;		
    /* overflow: auto; */
		-webkit-overflow-scrolling:touch;
		display: block;
	}

	svelte-virtual-list-contents, svelte-virtual-list-row {
		display: block;
	}

	svelte-virtual-list-row {
		/* overflow: hidden; */
	}

  .header_div {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 2;

    background-color: midnightblue;
    display: flex;
    /* white-space: nowrap; */
    /* overflow: auto; */
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


  /* Grid Scroll */
  svelte-virtual-list-viewport::-webkit-scrollbar {
    width: 16px;
    height: 16px;
		background-color: grey;
  }

  svelte-virtual-list-viewport::-webkit-scrollbar-thumb {
    background-color: #404247;
    border-radius: 10px;
  }

  svelte-virtual-list-viewport::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }

  svelte-virtual-list-viewport::-webkit-scrollbar-button{
    background-color: white;
    width: 16px;
    height: 16px;
    /* display: block; */
    /* border-style: solid; */
  }

  /* 스크롤 버튼 */
  /* Up */
  svelte-virtual-list-viewport::-webkit-scrollbar-button:vertical:decrement {
    background-image: url("img/grid_scroll/scroll_up_N.png");
  }
  svelte-virtual-list-viewport::-webkit-scrollbar-button:vertical:decrement:hover {
    background-image: url("img/grid_scroll/scroll_up_H.png");
  }

  /* Down */
  svelte-virtual-list-viewport::-webkit-scrollbar-button:vertical:increment {
    background-image: url("img/grid_scroll/scroll_down_N.png");
  }  
  svelte-virtual-list-viewport::-webkit-scrollbar-button:vertical:increment:hover {
    background-image: url("img/grid_scroll/scroll_down_H.png");
  }  

  /* Left */
  svelte-virtual-list-viewport::-webkit-scrollbar-button:horizontal:decrement {
    background-image: url("img/grid_scroll/scroll_left_N.png");
  }
  svelte-virtual-list-viewport::-webkit-scrollbar-button:horizontal:decrement:hover {
    background-image: url("img/grid_scroll/scroll_left_H.png");
  }

  /* Right */
  svelte-virtual-list-viewport::-webkit-scrollbar-button:horizontal:increment {
    background-image: url("img/grid_scroll/scroll_right_N.png");
  }  
  svelte-virtual-list-viewport::-webkit-scrollbar-button:horizontal:increment:hover {
    background-image: url("img/grid_scroll/scroll_right_H.png");
  }  	
</style>
<svelte-virtual-list-viewport
	bind:this={viewport}
	bind:offsetWidth={viewport_height}	
	bind:offsetHeight={viewport_height}
	on:scroll={handle_scroll}	
	style="height: {height};"
>
	<svelte-virtual-list-contents
		bind:this={contents}
		style="padding-top: {top}px; padding-bottom: {bottom}px;"
	>
	<!-- <slot></slot> -->
		<!-- 헤더 -->
		<div class="header_div" style="height: 36px;">
			<!-- Col 1 ~ n -->
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
		</div>

		{#each visible as row (row.index)}
			<svelte-virtual-list-row>
				<slot item={row.data}>Missing template</slot>
			</svelte-virtual-list-row>
		{/each}
	</svelte-virtual-list-contents>
</svelte-virtual-list-viewport>
