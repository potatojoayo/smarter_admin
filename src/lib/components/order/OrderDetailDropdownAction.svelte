<script>
	import {
		changeState,
		checkedOrderDetails,
		finishWork,
		openDraftDialog,
		openStartShippingDialog
	} from '../../../stores/order';

	export let orderDetail;
	export let order;

	let buttons = [];

	$: {
		buttons = [];
		if (orderDetail.state === '결제완료') {
			buttons.push(
				{
					title: '출고준비',
					action: async () => {
						if (
							confirm(
								'선택한 상품을 출고준비 상태로 변경하시겠습니까?'
							)
						) {
							const success = await changeState(
								[orderDetail.orderDetailNumber],
								'출고준비'
							);
							if (!success) {
								alert(`실패`);
							} else {
								alert(
									'선택하신 주문이 출고준비 상태로 변경되었습니다.'
								);
								location.reload();
							}
						}
					}
				},
				{
					title: '작업실배정',
					action: () => {
						openDraftDialog(order, orderDetail);
					}
				}
			);
		} else if (orderDetail.state === '작업중') {
			let title = '작업완료';
			let action = async () => {
				if (
					confirm(
						'선택하신 주문의 작업을 완료하시겠습니까?'
					)
				) {
					const success = await changeState(
						$checkedOrderDetails.map(
							(o) => o.orderDetailNumber
						),
						'작업완료'
					);
					if (!success) {
						alert(`실패`);
					} else {
						alert(
							'선택하신 주문의 작업이 완료되었습니다.'
						);
						location.reload();
					}
				}
			};
			buttons.push({ title, action });
		} else if (orderDetail.state === '작업완료') {
			buttons.push(
				{
					title: '출고준비',
					action: async () => {
						if (
							confirm(
								'선택한 상품을 출고준비 상태로 변경하시겠습니까?'
							)
						) {
							const success = await changeState(
								[orderDetail.orderDetailNumber],
								'출고준비'
							);
							if (!success) {
								alert(`실패`);
							} else {
								alert(
									'선택하신 주문이 출고준비 상태로 변경되었습니다.'
								);
								location.reload();
							}
						}
					}
				},
				{
					title: '작업실배정',
					action: () => {
						openDraftDialog(order, orderDetail);
					}
				}
			);
		} else if (orderDetail.state === '출고준비') {
			let title = '배송시작';
			let action = () => {
				if (
					confirm(
						'선택한 상품배송을 시작하시겠습니까?'
					)
				)
					openStartShippingDialog(
						order,
						orderDetail
					);
			};
			buttons.push({ title, action });
		} else if (orderDetail.state === '배송중') {
			let title = '배송완료';
			let action = async () => {
				if (
					confirm(
						'선택하신 주문을 배송완료 상태로 변경하시겠습니까?'
					)
				) {
					const success = await changeState(
						$checkedOrderDetails.map(
							(o) => o.orderDetailNumber
						),
						'배송완료'
					);
					if (!success) {
						alert(`실패`);
					} else {
						alert(
							'선택한 주문의 배송이 완료되었습니다.'
						);
						//	location.reload();
					}
				}
			};
			buttons.push({ title, action });
		}
	}

	let open = false;
</script>

{#if buttons.length > 0}
	<div
		class="border rounded flex relative justify-between cursor-pointer w-28 p-2 items-center hover:bg-primary hover:text-white {open
			? 'bg-primary text-white'
			: ''}"
		on:click|stopPropagation={() => {
			open = !open;
			const windowClickHandler = () => {
				open = false;
			};
			if (open) {
				window.addEventListener(
					'click',
					windowClickHandler
				);
			} else {
				window.removeEventListener(
					'click',
					windowClickHandler
				);
			}
		}}
	>
		<div />
		<span> 상태변경 </span>

		<i class="fa fa-chevron-down" />

		{#if open}
			<div
				class="absolute top-[110%] left-0 bg-white z-20 w-full border rounded text-black"
			>
				{#each buttons as button}
					<div
						class="p-2 hover:bg-primary hover:text-white"
						on:click|stopPropagation={() => {
							open = false;
							button.action();
						}}
					>
						{button.title}
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
