import Vue from 'vue';
import { TranslateResult } from 'vue-i18n';

export const translate = Vue.extend({
	computed: {
		nodeType (): string {
			return this.$store.getters.activeNode.type;
		},
	},
	methods: {
		translate(
			{ key, fallback }: { key: string, fallback: string },
		): TranslateResult {
			return this.$te(key) ? this.$t(key) : fallback;
		},

		$translateDisplayName(
			{ displayName: parameterName }: { displayName: string }) {
			return this.translate({
				key: `${this.nodeType}.parameters.${parameterName}.displayName`,
				fallback: parameterName,
			});
		},

		$translateDescription(
			{ displayName: parameterName, description }: {
				displayName: string,
				description: string,
			},
		) {
			return this.translate({
				key: `${this.nodeType}.parameters.${parameterName}.description`,
				fallback: description,
			});
		},

		 $translatePlaceholder(
			{ displayName: parameterName, placeholder }: {
				displayName: string,
				placeholder: string,
			},
		) {
			return this.translate({
				key: `${this.nodeType}.parameters.${parameterName}.placeholder`,
				fallback: placeholder,
			});
		},

		$translateMultipleValueButtonText(
			{ displayName: parameterName, typeOptions: { multipleValueButtonText } }: {
				displayName: string,
				typeOptions: { multipleValueButtonText: string }
			},
		) {
			return this.translate({
				key: `${this.nodeType}.parameters.${parameterName}.multipleValueButtonText`,
				fallback: multipleValueButtonText,
			});
		},

		$translateOptionName(parameterName: string, optionName: string) {
			return this.translate({
				key: `${this.nodeType}.parameters.${parameterName}.options.${optionName}.displayName`,
				fallback: optionName,
			});
		},

		$translateOptionDescription(parameterName: string, optionName: string, description: string) {
			return this.translate({
				key: `${this.nodeType}.parameters.${parameterName}.options.${optionName}.description`,
				fallback: description,
			});
		},
	},
});