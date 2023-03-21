<!-- <script>
	import { onMount, tick } from 'svelte';
  // import {TreeLeaf} from "svelte-tree-view-component";

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
		const { scrollTop } = viewport;

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
			viewport.scrollTo(0, scrollTop + d);
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
		position: relative;
		/* overflow-y: auto; */
    overflow: auto;
		-webkit-overflow-scrolling:touch;
		display: block;
	}

	svelte-virtual-list-contents, svelte-virtual-list-row {
		display: block;
	}

	svelte-virtual-list-row {
		/* overflow: hidden; */
	}
</style>

<svelte-virtual-list-viewport
	bind:this={viewport}
	bind:offsetHeight={viewport_height}
	on:scroll={handle_scroll}
	style="height: {height};"
>
	<svelte-virtual-list-contents
		bind:this={contents}
		style="padding-top: {top}px; padding-bottom: {bottom}px;"
	>
		{#each visible as row (row.index)}
			<svelte-virtual-list-row>
				<slot item={row.data}>Missing template</slot>
			</svelte-virtual-list-row>
		{/each}
	</svelte-virtual-list-contents>
</svelte-virtual-list-viewport> -->
<script>
	import { onMount, tick } from 'svelte';
  import {TreeLeaf} from "svelte-tree-view-component";	

	// props
	export let items;
	export let height = '100%';
	export let itemHeight = undefined;
	export let isReverse;
	export let updateCount;

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

  let onsrc = "img/hostOS_icon_linux.png";
  let offsrc = "img/hostOS_icon_linux_un.png";	

	$: visible = items.slice(start, end).map((data, i) => {
		return { index: i + start, data };
	});

	// whenever `items` changes, invalidate the current heightmap
	$: if (mounted) refresh(items, viewport_height, itemHeight);

	async function refresh(items, viewport_height, itemHeight) {
		const { scrollTop } = viewport;

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
		const { scrollTop } = viewport;

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
			viewport.scrollTo(0, scrollTop + d);
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
		position: relative;
		/* overflow-y: auto; */
    overflow: auto;
		-webkit-overflow-scrolling:touch;
		display: block;
	}

	svelte-virtual-list-contents, svelte-virtual-list-row {
		display: block;
	}

	svelte-virtual-list-row {
		/* overflow: hidden; */
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
	bind:offsetHeight={viewport_height}
	on:scroll={handle_scroll}
	style="height: {height};"
>
	<svelte-virtual-list-contents
		bind:this={contents}
		style="padding-top: {top}px; padding-bottom: {bottom}px;"
	>
		{#each visible as row, i (row.index)}
			<svelte-virtual-list-row>
				<TreeLeaf>
					{#if (i % 2) === 0 && isReverse && i < updateCount}
						<img class="treeImage" src={onsrc} alt="onimage"  />
					{:else}
						<img class="treeImage" src={offsrc} alt="offimage" />
					{/if}					
					linux {row.data.hostname}
				</TreeLeaf>				
				<!-- <slot item={row.data}>Missing template</slot> -->
			</svelte-virtual-list-row>
		{/each}
	</svelte-virtual-list-contents>
</svelte-virtual-list-viewport>
