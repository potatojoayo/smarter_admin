<script>
	export let title;
	export let dataList = [];
	export let classes = '';
</script>

<div
	class="{classes} rounded-lg shadow flex flex-col flex-1 mr-2 h-fit"
>
	<div>
		<h3 class="text-lg p-5">{title}</h3>
		<div class="px-5 bg-white">
			<slot />
		</div>
	</div>
	<dl>
		{#each dataList as data}
			<div
				class="odd:bg-gray-50 py-4 px-5 flex justify-between"
			>
				<dt class="whitespace-nowrap text-sm">
					{data.title}
				</dt>
				<div class="mx-5" />
				<dd
					class="text-right whitespace-normal break-words lg:max-w-[800px] max-w-[400px] {data.bold
						? 'font-bold text-lg'
						: ''} {data.background
						? 'bg-primary text-white p-2 rounded'
						: ''}"
				>
					{data.data}
				</dd>
			</div>
		{/each}
	</dl>
</div>
