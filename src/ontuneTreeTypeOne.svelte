<script>
  import {TreeView, TreeBranch, TreeLeaf} from "svelte-tree-view-component";
  // import {Svrollbar, Svroller} from "svrollbar";    
  import VirtualList from './onTuneScroll_Tree.svelte';    

  export let nodeItem;
  export let updateCount;
  export let isReverse;
  let viewport;
  let contents;
  let onsrc = "img/hostOS_icon_linux.png";
  let offsrc = "img/hostOS_icon_linux_un.png";

  // $: {
  //   console.log(nodeItem);
  // }
</script>

<style>
  .treeImage {
    vertical-align: text-bottom;
  }
    
</style>


  <!-- <TreeView branchHoverColor="yellow" iconColor="black"  >
    <TreeBranch rootContent="Linux" >
      {#each nodeItem as item, i (item)}
        <TreeLeaf>
            {#if (i % 2) === 0 && isReverse && i < updateCount}
            <img class="treeImage" src={onsrc} alt="onimage"  />
            {:else}
            <img class="treeImage" src={offsrc} alt="offimage" />
            {/if}
            linux {item}
        </TreeLeaf>
      {/each}
    </TreeBranch>
  </TreeView>  
-->
<TreeView branchHoverColor="yellow" iconColor="black"  >
  <TreeBranch rootContent="Linux" >
    <!-- {#each nodeItem as item, i (item)}
      <TreeLeaf>
          linux {item}
      </TreeLeaf>
    {/each} -->
    <!-- <div style={`width: 200px; height: ${nodeItem.length * 36}px;`}> -->
    <div style="border-left:solid 2px white; margin-left:-8px">
      <div style={`width: 273px; height: 871px;`}>
        <VirtualList items={nodeItem} updateCount={updateCount} isReverse={isReverse} >
          <!-- <TreeLeaf>
            linux {item.hostname}
          </TreeLeaf> -->
        </VirtualList>
      </div>
    </div>
  </TreeBranch>
</TreeView>  









    <!-- <div class="wrapper">
      <div bind:this={viewport} class="viewport">
          <div bind:this={contents} class="contents">
              <TreeView branchHoverColor="yellow" iconColor="black"  >
                  <TreeBranch rootContent="Linux" >
                      {#each nodeItem as item, i (item)}
                      <TreeLeaf> linux{item}</TreeLeaf>
                      {/each}
                    </TreeBranch>
              </TreeView>
          </div>
        </div>
        <Svrollbar {viewport} {contents} />
      </div> -->