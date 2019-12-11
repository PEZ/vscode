/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { MarkdownString } from 'vs/base/common/htmlContent';

suite('markdownString', () => {

	test('escape', () => {

		const mds = new MarkdownString();

		mds.appendText('# foo\n*bar*');

		assert.equal(mds.value, '\\# foo\n\n\\*bar\\*');
	});


	test('themeIconsOnText', () => {
		const mds = new MarkdownString(undefined, { supportThemeIcons: true });
		mds.appendText('$(zap)');

		assert.equal(mds.value, '$(zap)');
	});

	test('themeIconsOnMarkdown', () => {
		const mds = new MarkdownString(undefined, { supportThemeIcons: true });
		mds.appendMarkdown('$(zap)');

		assert.equal(mds.value, '$(zap)');
	});

	test('themeIconsOnMarkdownEscaped', () => {
		const mds = new MarkdownString(undefined, { supportThemeIcons: true });
		mds.appendMarkdown('$(zap)', { escapeThemeIcons: true });

		assert.equal(mds.value, '\\\\$\\(zap\\)');
	});

	test('themeIconsOffText', () => {
		const mds = new MarkdownString(undefined, { supportThemeIcons: false });
		mds.appendText('$(zap)');

		assert.equal(mds.value, '$\\(zap\\)');
	});

	test('themeIconsOffMarkdown', () => {
		const mds = new MarkdownString(undefined, { supportThemeIcons: false });
		mds.appendMarkdown('$(zap)');

		assert.equal(mds.value, '$(zap)');
	});

	test('themeIconsOffMarkdownEscaped', () => {
		const mds = new MarkdownString(undefined, { supportThemeIcons: false });
		mds.appendMarkdown('$(zap)', { escapeThemeIcons: true });

		assert.equal(mds.value, '$(zap)');
	});

});
