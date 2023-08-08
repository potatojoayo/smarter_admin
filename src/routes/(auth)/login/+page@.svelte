<script lang="ts">
	import { goto } from '$app/navigation';
	import authClient from '$data/providers/auth_client';
	import { AuthService } from '$data/services/auth';

	let identification: string;
	let password: string;
	let errorMessage: string;

	const onSubmit = async () => {
		try {
			const result = await authClient.request(
				AuthService.getToken,
				{
					identification,
					password
				}
			);
			const { user } = result.tokenAuth;
			if (user.group === '작업실') {
				return await goto('/work');
			} else if (user.group === '배송관리팀') {
				return await goto('/delivery');
			} else if (user.group === '로고시안팀') {
				return await goto('/user/draft');
			} else if (user.group === '관리자') {
				console.log(user.group);
				return await goto('/order');
			} else if (user.group === '체육사') {
				return await goto('/order');
			}

			return await goto('/login');
		} catch (e) {
			alert('아이디 또는 비밀번호가 틀렸습니다.');
		}
	};

	$: {
		if (password && password.length < 4) {
			errorMessage =
				'비밀번호는 4자리 이상의 숫자만 입력해주세요.';
		} else {
			errorMessage = null;
		}
	}
</script>

<main
	class="flex flex-col items-center justify-center h-screen"
>
	<section
		class="flex flex-col items-center mb-20 text-5xl cursor-default"
	>
		스마터 플러스 관리자
	</section>
	<section class="mb-40">
		<form
			class="flex flex-col text-gray-700 items-center"
			on:submit|preventDefault={onSubmit}
		>
			<div class="m-2">
				<label class="mr-2" for="id">
					<i class="fa fa-user text-xl" />
				</label>
				<input
					id="id"
					name="id"
					placeholder="아이디를 입력해주세요"
					type="text"
					class="text-xl p-2"
					bind:value={identification}
					required
				/>
			</div>
			<div class="m-2">
				<label class="mr-2" for="password">
					<i class="fa fa-lock text-xl" />
				</label>
				<input
					id="password"
					name="email"
					placeholder="&#8226&#8226&#8226&#8226"
					type="password"
					class="text-xl p-2"
					bind:value={password}
					required
				/>
			</div>
			<span
				class="text-red-400 ml-12 h-2 self-start text-sm"
			>
				{errorMessage ? errorMessage : ''}
			</span>
			<div class="mt-8">
				<button
					type="submit"
					class="text-primary whitespace-normal text-xl hover:text-primaryLight"
					>로그인</button
				>
			</div>
		</form>
	</section>
</main>
