<script context="module">
	// retain module scoped expansion state for each tree node
	const _expansionState = {
		/* treeNodeId: expanded <boolean> */
	}
</script>
<script>
//	import { slide } from 'svelte/transition'
 	const onsrc = "img/hostOS_icon_linux.png";
    const offsrc = "img/hostOS_icon_linux_un.png";
	export let updateCount;
	export let tree
	export let finalIcon;
	export let isReverse;
	const {label, children} = tree

	let expanded = _expansionState[label] || false
	const toggleExpansion = () => {
		expanded = _expansionState[label] = !expanded
	}
	$: arrowDown = expanded
</script>
<ul><!-- transition:slide -->
	<li>
		{#if children}
			<span on:click={toggleExpansion}>
				<span class="arrow" class:arrowDown>&#x25b6</span>
				{label}
			</span>
			{#if expanded}
				{#each children as child, idx}				
					{#if idx < updateCount}
						{#if isReverse === false} 
							<svelte:self tree={child} finalIcon={offsrc} updateCount={updateCount} isReverse={isReverse} />
						{:else}
							{#if idx % 2 === 0}
								<svelte:self tree={child} finalIcon={onsrc} updateCount={updateCount} isReverse={isReverse} />
							{:else}
								<svelte:self tree={child} finalIcon={offsrc} updateCount={updateCount} isReverse={isReverse} />
							{/if}
						{/if}
					{:else}
						<svelte:self tree={child} finalIcon={offsrc} updateCount={updateCount} isReverse={isReverse} />
					{/if}
				{/each}
			{/if}
		{:else}
			<span>
				<span class="no-arrow"/>			
				<img class="treeImage" src={finalIcon} alt="StatusImage"  />
				{label}
			</span>
		{/if}
	</li>
</ul>

<style>
	ul {
		margin: 0;
        color:aliceblue;
		list-style: none;
		padding-left: 1.2rem; 
		user-select: none;
	}
	.no-arrow { padding-left: 1.0rem; }
	.arrow {
		cursor: pointer;
		display: inline-block;
		/* transition: transform 200ms; */
	}
	.arrowDown { transform: rotate(90deg); }
	.treeImage {
      vertical-align: text-bottom;
    }
</style>
