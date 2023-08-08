<script>
	export let productMaster;
	const openFile = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (ev) => {
			productMaster.thumbnail = ev.target.result;
		};
		reader.readAsDataURL(image);
	};
</script>

<div class="flex flex-col mt-3">
	<div class="text-lg mb-3">
		<div class="flex">
			<span class="mr-2">대표 이미지</span>
			<span class="text-red-500">*</span>
		</div>
	</div>
	<div>
		<div
			class="w-40 h-40 flex justify-center items-center {productMaster.thumbnail
				? ''
				: 'border-dashed'} border  relative overflow-hidden"
		>
			<input
				id="thumbnail"
				type="file"
				on:change={openFile}
				class="absolute top-0 right-0 opacity-0 h-40 w-40 cursor-pointer
						{productMaster.thumbnail
					? 'invisible '
					: 'visible'}
						"
			/>
			<i
				class="fa fa-plus text-primary text-3xl absolute{productMaster.thumbnail
					? 'invisible absolute'
					: 'visible'}
				{productMaster.thumbnail
					? 'invisible '
					: 'visible'}
"
			/>
			<div
				class="group flex
						{productMaster.thumbnail
					? 'visible'
					: 'invisible absolute'}
"
			>
				<div
					class="absolute top-2 right-2 cursor-pointer"
					on:click={() => {
						productMaster.thumbnail = null;
					}}
				>
					<i
						class="fa fa-circle-x text-gray-700"
					/>
				</div>
				<img
					src={productMaster.thumbnail}
					class="object-cover"
					alt="thumbnail"
				/>
			</div>
		</div>
	</div>
</div>
