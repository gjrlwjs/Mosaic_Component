<script>
    import TreeView from './ontuneTreeTypeTwoComponent.svelte'
    
    export let nodeCount;
    export let isReverse;
    export let updateCount;

    class TreeChilren {
        constructor(name) {
            this.label = name;
        }
    }

    class TreeDataClass {
        constructor(groupName, treeCount) {
            this.label = groupName;
            this.children = [];
            for(let i = 0; i< treeCount; i++) {
                let itemData = {label: groupName + "Host" + i.toString()};
                this.children.push(itemData);
            }
        }
    }

    class TreeMaker {
        constructor(groupName, treeCount){
            this.TreeData = new TreeDataClass(groupName, treeCount);
        }

        GetJsonData() {
            let jsonData = JSON.stringify(this.TreeData);
            return JSON.parse(jsonData);
        }
    }
    
    let ANewTree, BNewTree;

    function newTreeMaker() {
        let makeTreeData = new TreeMaker("VMHost", nodeCount);
        ANewTree = makeTreeData.GetJsonData();

        let makeTreeData2 = new TreeMaker("VMHost", nodeCount);
        BNewTree = makeTreeData2.GetJsonData();
    }
    
    newTreeMaker();
</script>

<p/>

{#if isReverse}
    <TreeView tree = {ANewTree} updateCount={updateCount} finalIcon="img/hostOS_icon_linux_un.png" isReverse={isReverse} />
    {:else}
    <TreeView tree = {BNewTree} updateCount={updateCount} finalIcon="img/hostOS_icon_linux_un.png" isReverse={isReverse} />
{/if}

<!-- {console.log(tree)} -->