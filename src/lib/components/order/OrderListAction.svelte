<script>
	import Button from '../Button.svelte';
	import {
		changeState,
		checkedOrderDetails,
		checkedOrderMasters,
		completePaymentsWithoutBank,
		deleteOrderMasters,
		easyOrderToPaid,
		isBundleDelivery,
		openStartShippingDialog,
		pickUp,
		proceedPaidOrder,
		proceedPaidOrderDetails,
		readyForDelivery
	} from '../../../stores/order.js';
	import { assignWork } from '../../../stores/work.js';
	import mixpanel from 'mixpanel-browser';

	let buttons = [];
	export let state;

	$: {
		let title;
		let action;
		let newButtons = [];
		switch (state) {
			case '간편주문':
				title = '삭제';
				action = async () => {
					if ($checkedOrderMasters.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 간편주문을 삭제하시겠습니까?'
						)
					) {
						const orderNumbers =
							$checkedOrderMasters.map(
								(o) => o.orderNumber
							);
						const success =
							await deleteOrderMasters(
								orderNumbers
							);
						if (success) {
							$checkedOrderMasters.forEach(
								(om) => {
									mixpanel.track(
										'간편주문 삭제',
										om
									);
								}
							);
							alert(`삭제되었습니다.`);
						} else {
							alert('삭제 실패');
						}
						location.reload();
					}
				};
				newButtons.push({ title, action });
				title = '무통장입금 결제완료';
				action = async () => {
					if ($checkedOrderMasters.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문의 무통장입금 결제를 확인하셨습니까?'
						)
					) {
						const orderNumbers =
							$checkedOrderMasters.map(
								(o) => o.orderNumber
							);
						const success = await easyOrderToPaid(
							orderNumbers
						);
						if (success) {
							alert(
								`무통장입금 결제 완료 처리 되었습니다.`
							);

							$checkedOrderMasters.forEach(
								(om) => {
									mixpanel.track(
										'간편주문 무통장입금 결제 완료',
										om
									);
								}
							);
						} else {
							alert('결제완료 처리 실패');
						}
						location.reload();
					}
				};
				newButtons.push({ title, action });
				break;
			case '무통장입금':
				title = '주문삭제';
				action = async () => {
					if ($checkedOrderMasters.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문을 삭제하시겠습니까?'
						)
					) {
						const orderNumbers =
							$checkedOrderMasters.map(
								(o) => o.orderNumber
							);
						if (
							await deleteOrderMasters(
								orderNumbers
							)
						) {
							$checkedOrderMasters.forEach(
								(om) => {
									mixpanel.track(
										'무통장입금 주문 삭제',
										om
									);
								}
							);
							alert(
								`선택하신 주문이 삭제되었습니다.`
							);
							location.reload();
						} else {
							alert('삭제 실패');
						}
					}
				};
				newButtons.push({ title, action });
				title = '결제완료';
				action = async () => {
					if ($checkedOrderMasters.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문의 결제를 완료하시겠습니까?'
						)
					) {
						const orderNumbers =
							$checkedOrderMasters.map(
								(o) => o.orderNumber
							);

						$checkedOrderMasters.forEach((om) => {
							mixpanel.track(
								'무통장입금 결제 완료',
								om
							);
						});
						const success =
							await completePaymentsWithoutBank(
								orderNumbers
							);
						if (success) {
							alert(
								`선택하신 주문이 결제완료되었습니다.`
							);
						} else {
							alert('결제완료 처리 실패');
						}
						location.reload();
					}
				};
				newButtons.push({ title, action });
				break;
			case '결제완료':
				title = '추후배송';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문을 추후배송 상태로 변경하시겠습니까?'
						)
					) {
						const success = await changeState(
							$checkedOrderDetails.map(
								(o) => o.orderDetailNumber
							),
							'추후배송'
						);
						if (!success) {
							alert(`실패`);
						} else {
							$checkedOrderDetails.forEach(
								(o) => {
									mixpanel.track('추후배송', o);
								}
							);
							alert(
								'선택하신 주문이 추후배송 상태로 변경되었습니다.'
							);
							location.reload();
						}
					}
				};
				newButtons.push({ title, action });
				title = '주문진행';
				action = async () => {
					if ($checkedOrderMasters.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문을 진행하시겠습니까?'
						)
					) {
						const success =
							await proceedPaidOrder(
								$checkedOrderMasters.map(
									(o) => o.orderMasterId
								)
							);
						if (!success) {
							alert(`실패`);
						} else {
							$checkedOrderMasters.forEach(
								(o) => {
									mixpanel.track('주문진행', o);
								}
							);
							alert(
								'선택하신 주문이 진행되었습니다.'
							);
							location.reload();
						}
					}
				};
				newButtons.push({ title, action });
				break;
			case '추후배송':
				title = '주문진행';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문을 진행하시겠습니까?'
						)
					) {
						const success =
							await proceedPaidOrderDetails(
								$checkedOrderDetails.map(
									(o) => o.id
								)
							);
						if (!success) {
							alert(`실패`);
						} else {
							$checkedOrderMasters.forEach(
								(o) => {
									mixpanel.track('주문진행', o);
								}
							);
							alert(
								'선택하신 주문이 진행되었습니다.'
							);
							location.reload();
						}
					}
				};
				newButtons.push({ title, action });
				break;
			case '전처리작업중':
				break;
			case '후작업중':
				break;
			case '전처리작업완료':
				for (let subcontractor of subcontractors.filter(
					(s) =>
						!s.isOutWorking && !s.isPreWorking
				)) {
					newButtons.push({
						title: `${subcontractor.name} (${subcontractor.dailyCumulativeWork})`,
						action: async () => {
							if (
								confirm(
									`선택하신 주문을 ${subcontractor.name}에 배정하시겠습니까?`
								)
							) {
								if (
									$checkedOrderDetails.length ===
									0
								) {
									return alert(
										'주문을 선택해주세요.'
									);
								}
								if (
									await assignWork(
										$checkedOrderDetails.map(
											(o) => o.id
										),
										subcontractor.id
									)
								) {
									$checkedOrderDetails.forEach(
										(o) => {
											mixpanel.track(
												'작업실 배정',
												{ ...o, subcontractor }
											);
										}
									);
									alert(
										`선택하신 주문이 ${subcontractor.name}에 배정되었습니다.`
									);
									return location.reload();
								}
								alert('실패');
							}
						}
					});
				}
				break;
			case '후작업완료':
				title = '추후배송';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문을 추후배송 상태로 변경하시겠습니까?'
						)
					) {
						const success = await changeState(
							$checkedOrderDetails.map(
								(o) => o.orderDetailNumber
							),
							'추후배송'
						);
						if (!success) {
							alert(`실패`);
						} else {
							$checkedOrderDetails.forEach(
								(o) => {
									mixpanel.track('추후배송', o);
								}
							);
							alert(
								'선택하신 주문이 추후배송 상태로 변경되었습니다.'
							);
							location.reload();
						}
					}
				};
				newButtons.push({ title, action });
				title = '출고준비';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if (
						confirm(
							'선택하신 주문을 출고준비 상태로 변경하시겠습니까?'
						)
					) {
						const success =
							await readyForDelivery(
								$checkedOrderDetails.map(
									(o) => o.orderDetailNumber
								)
							);
						if (!success) {
							alert(`실패`);
						} else {
							$checkedOrderDetails.forEach(
								(o) => {
									mixpanel.track('출고준비', o);
								}
							);
							alert(
								'선택하신 주문이 출고준비 상태로 변경되었습니다.'
							);
							location.reload();
						}
					}
				};
				newButtons.push({ title, action });
				break;
			case '출고준비':
				title = '방문수령';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					let orderMasterIds = [];
					let orderMasters = [];
					for (let orderDetail of $checkedOrderDetails) {
						if (
							!orderMasterIds.includes(
								orderDetail.orderMaster
									.orderMasterId
							)
						) {
							orderMasters.push(
								orderDetail.orderMaster
							);
							orderMasterIds.push(
								orderDetail.orderMaster
									.orderMasterId
							);
						}
					}
					const success = await pickUp(
						orderMasterIds
					);
					if (!success) {
						alert(`실패`);
					} else {
						orderMasters.forEach((o) => {
							mixpanel.track('방문수령', o);
						});
						alert(
							'선택하신 주문이 방문수령되었습니다.'
						);
						location.reload();
					}
				};
				newButtons.push({ title, action });
				title = '배송시작';
				action = () => {
					if ($checkedOrderDetails.length === 0) {
						return alert(
							'배송을 시작할 주문 상품을 선택해주세요.'
						);
					}
					openStartShippingDialog();
				};
				newButtons.push({ title, action });
				break;
			case '묶음배송':
				title = '방문수령';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					let orderMasterIds = [];
					let orderMasters = [];
					for (let orderDetail of $checkedOrderDetails) {
						if (
							!orderMasterIds.includes(
								orderDetail.orderMaster
									.orderMasterId
							)
						) {
							orderMasterIds.push(
								orderDetail.orderMaster
									.orderMasterId
							);
							orderMasters.push(
								orderDetail.orderMaster
							);
						}
					}
					const success = await pickUp(
						orderMasterIds
					);
					if (!success) {
						alert(`실패`);
					} else {
						alert(
							'선택하신 주문이 방문수령되었습니다.'
						);

						orderMasters.forEach((o) => {
							mixpanel.track('방문수령', o);
						});
						location.reload();
					}
				};
				newButtons.push({ title, action });
				title = '묶음배송';
				action = () => {
					isBundleDelivery.set(true);
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if ($checkedOrderDetails.length === 0) {
						return alert(
							'배송을 시작할 주문 상품을 선택해주세요.'
						);
					}
					openStartShippingDialog();
				};
				newButtons.push({ title, action });
				title = '일반배송';
				action = () => {
					isBundleDelivery.set(false);
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
					if ($checkedOrderDetails.length === 0) {
						return alert(
							'배송을 시작할 주문 상품을 선택해주세요.'
						);
					}
					openStartShippingDialog();
				};
				newButtons.push({ title, action });
				break;
			case '배송중':
				title = '배송완료';
				action = async () => {
					if ($checkedOrderDetails.length === 0) {
						return alert('주문을 선택해주세요.');
					}
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
							$checkedOrderDetails.forEach(
								(o) => {
									mixpanel.track('배송완료', o);
								}
							);
							alert(
								'선택한 주문의 배송이 완료되었습니다.'
							);
							location.reload();
						}
					}
				};
				newButtons.push({ title, action });
				break;
			default:
		}
		buttons = newButtons;
	}
</script>

{#each buttons as button}
	<Button
		onClick={button.action}
		classes="ml-2 p-3"
	>
		{button.title}
	</Button>
{/each}
