<script lang="ts">
	import ModalButton from '$data/classes/ModalButton';
	import { ButtonColor } from '$data/enums/ButtonColor';
	import LgBlack from '../base/LgBlack.svelte';
	import MdGray from '../base/MdGray.svelte';
	import ModalDialog from './ModalDialog.svelte';
	export let open = false,
		productName = '',
		productMemo = '';
</script>

<ModalDialog
	title={productName}
	buttons={[
		new ModalButton({
			title: '닫기',
			color: ButtonColor.red,
			onClick: () => {
				open = false;
			}
		})
	]}
>
	<LgBlack>상품메모</LgBlack>
	<MdGray
		classes=" p-4 min-w-[500px] min-h-[200px]  whitespace-pre-wrap"
	>
		{productMemo}
	</MdGray>
</ModalDialog>
