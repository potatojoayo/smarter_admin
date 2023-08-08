<script>
	export let productMaster;
	export let newImages;
	export let deletedImageIds;

	const openFile = (e) => {
		const image = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			newImages.pop();
			newImages.push({
				file: image,
				image: e.target.result
			});
			newImages.push(null);
			newImages = newImages;
		};
		reader.readAsDataURL(image);
	};
</script>

<div class="flex flex-col mt-3">
	<div class="text-lg mb-3">
		<span class="mr-2">추가 이미지</span>
	</div>
	<div class="flex flex-wrap">
		{#each productMaster.images as image}
			<div
				class="w-40 h-40 flex justify-center items-center mr-5 {image
					? ''
					: 'border-dashed'} border  relative overflow-hidden"
			>
				<div class="group">
					<div
						class="absolute top-2 right-2 cursor-pointer"
						on:click={() => {
							productMaster.images =
								productMaster.images.filter(
									(i) => !i || i.id !== image.id
								);
							deletedImageIds.push(image.id);
						}}
					>
						<i
							class="fa fa-circle-x text-gray-700"
						/>
					</div>
					<img
						src={image.url}
						class="object-cover"
						alt="image"
					/>
				</div>
			</div>
		{/each}
		{#each newImages as image}
			<div
				class="w-40 h-40 flex justify-center items-center mr-5 bg-white {image
					? ''
					: 'border-dashed'} border  relative overflow-hidden"
			>
				{#if !image}
					<input
						type="file"
						on:change={(e) => {
							openFile(e);
						}}
						class="absolute top-0 right-0 opacity-0 h-40 w-40 cursor-pointer"
					/>
					<i
						class="fa fa-plus text-primary text-3xl"
					/>
				{:else}
					<div class="group">
						<div
							class="absolute top-2 right-2 cursor-pointer"
							on:click={() => {
								newImages = newImages.filter(
									(i) =>
										!i || i.image !== image.image
								);
							}}
						>
							<i
								class="fa fa-circle-x text-gray-700"
							/>
						</div>
						<img
							src={image.image}
							class="object-cover"
							alt="image"
						/>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
