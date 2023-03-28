<script>
  import { onMount } from 'svelte';
  export let node_item;
	export let win;

  onMount(() => {
    console.log('Mount~~')
  });	


  function close_Modal() {
		win.opener.postMessage("sub_Window_Close", "*");

		if (win !== null) {
			win.close();
		};
  };
</script>

<style>
	body{
		margin: 0;
		padding: 0;
		/* box-sizing: inherit; */

		width: 100%;
		height: 100%;

		overflow: hidden;
	} 

  .div_Background {
    margin: 0;
		background-color: blue;
		position: relative;

		width: 100%;
		height: 100%;

		overflow: auto;
  }

  .title{
	padding-left: 10px;
	color: white;
	display: flex;
	align-items: center;
  }

	.div_Title_Area {
		display: flex;
		justify-content: space-between;
		height: 30px;
		/* padding-left: 10px;
		background-color: blueviolet;
		height: 30px;

		display : flex;
		justify-content : left;
		align-items : center;

		cursor: move; */
	}

	.div_Button {
		background-color: chocolate;
		width: 70px;
		height: 30px;
		display : flex;
		justify-content : space-between;
		align-items : center;
		/* column-gap: 10px; */
	}	

	.div_Body {
		/* flex: 0.7; */
		border: 0;
		width: 100%;
		height: calc(100% - 30px);
		background-color: aqua;

		display : flex;
		justify-content : center;
		align-items : center;

		user-select: none;
		/* position: relative; */
		/* overflow: hidden; */
	}

	.button_Type {
		margin: 0;
		padding: 0;

		width: 30px;
		height: 30px;
		background-color: coral;

		display : flex;
		justify-content : center;
		align-items : center;

		/* overflow: hidden; */
	}	

	.button_Exit {
		margin: 0;
		padding: 0;

		width: 30px;
		height: 30px;
		background-color: rgb(255, 0, 0);

		display : flex;
		justify-content : center;
		align-items : center;

		/* position: relative; */
		/* overflow: hidden; */
	}
</style>

<!-- <body style="margin: 0; padding: 0;"> -->
<body>
	<div class="div_Background"> 
		<div class="div_Title_Area">
			<div class="title" draggable="true">title</div>
			<div class="div_Button">
				<button class="button_Type" on:click={close_Modal}>D</button>
				<button class="button_Exit">X</button>
			</div>
		</div>
		<div class="div_Body">
			{node_item.id}
		</div>
	</div>
</body>