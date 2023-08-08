<script>
	export let file = null;
	export let image = null;
	export let classes = '';
	export let size = '40';

	const openFile = (e) => {
		file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (ev) => {
			image = ev.target.result;
		};
		reader.readAsDataURL(file);
	};
</script>

<div
	class="{classes} w-{size} h-{size} flex justify-center items-center {file
		? ''
		: 'border-dashed'} border  relative overflow-hidden"
>
	{#if !image}
		<input
			type="file"
			on:change={openFile}
			class="absolute top-0 right-0 opacity-0 h-{size} w-{size} cursor-pointer"
		/>
		<i class="fa fa-plus text-primary text-3xl" />
	{:else}
		<div class="group">
			<div
				class="absolute top-2 right-2 cursor-pointer"
				on:click={() => {
					file = null;
					image = null;
				}}
			>
				<i class="fa fa-circle-x text-gray-700" />
			</div>
			<img
				src={image}
				class="object-cover"
				alt="image"
			/>
		</div>
	{/if}
</div>
