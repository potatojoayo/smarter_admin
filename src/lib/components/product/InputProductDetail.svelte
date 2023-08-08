<script>
	export let productMaster;

	const openFile = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (ev) => {
			productMaster.descriptionImage =
				ev.target.result;
		};
		reader.readAsDataURL(image);
	};
</script>

<div
	class="min-w-full min-h-[300px] border rounded mt-5 p-5 flex flex-col bg-white"
>
	<div class="flex">
		<span class="text-lg mb-10"> 상품 상세</span>
		<span class="text-red-500 ml-1">*</span>
	</div>

	<div
		class="{productMaster.descriptionImage
			? ''
			: 'w-40 h-40'} flex justify-center items-center mx-auto {productMaster.descriptionImage
			? ''
			: 'border-dashed'} border  relative overflow-hidden"
	>
		<input
			type="file"
			id="description"
			on:change={openFile}
			class="absolute top-0 right-0 opacity-0 h-40 w-40 cursor-pointer {productMaster.descriptionImage
				? 'invisible absolute'
				: 'visible'}"
		/>
		<i
			class="fa fa-plus text-primary text-3xl absolute {productMaster.descriptionImage
				? 'invisible absolute'
				: 'visible'}"
		/>
		<div
			class="group {productMaster.descriptionImage
				? 'visible'
				: 'invisible absolute'}"
		>
			<div
				class="absolute top-2 right-2 cursor-pointer"
				on:click={() => {
					productMaster.descriptionImage = null;
				}}
			>
				<i
					class="fa fa-circle-x text-gray-700 text-3xl ab {productMaster.descriptionImage
						? 'visible'
						: 'invisible absolute'}"
				/>
			</div>
			<img
				src={productMaster.descriptionImage}
				class="object-cover"
				alt="description"
			/>
		</div>
	</div>
</div>
