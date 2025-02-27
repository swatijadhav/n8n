<template>
	<el-drawer
		:direction="direction"
		:visible="visible"
		:size="width"
		:before-close="beforeClose"
		:modal="modal"
		:wrapperClosable="wrapperClosable"
		>
		<template v-slot:title>
			<slot name="header" />
		</template>
		<template>
			<slot name="content"/>
		</template>
	</el-drawer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "ModalDrawer",
	props: {
		name: {
			type: String,
		},
		beforeClose: {
			type: Function,
		},
		eventBus: {
			type: Vue,
		},
		direction: {
			type: String,
		},
		modal: {
			type: Boolean,
			default: true,
		},
		width: {
			type: String,
		},
		wrapperClosable: {
			type: Boolean,
			default: true,
		},
	},
	mounted() {
		window.addEventListener('keydown', this.onWindowKeydown);

		if (this.$props.eventBus) {
			this.$props.eventBus.$on('close', () => {
				this.close();
			});
		}

		const activeElement = document.activeElement as HTMLElement;
		if (activeElement) {
			activeElement.blur();
		}
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.onWindowKeydown);
	},
	methods: {
		onWindowKeydown(event: KeyboardEvent) {
			if (!this.isActive) {
				return;
			}

			if (event && event.keyCode === 13) {
				this.handleEnter();
			}
		},
		handleEnter() {
			if (this.isActive) {
				this.$emit('enter');
			}
		},
		close() {
			this.$store.commit('ui/closeTopModal');
		},
	},
	computed: {
		isActive(): boolean {
			return this.$store.getters['ui/isModalActive'](this.$props.name);
		},
		visible(): boolean {
			return this.$store.getters['ui/isModalOpen'](this.$props.name);
		},
	},
});
</script>

<style lang="scss">
.el-drawer__header {
	margin: 0;
	padding: 30px 30px 0 30px;
}

.el-drawer__body {
	overflow: hidden;
}
</style>
