/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const renderCodiconsRegex = /(\\)?\$\((([a-z0-9\-]+?)(?:~([a-z0-9\-]*?))?)\)/gi;

const escapeCodiconsRegex = /\$\((([a-z0-9\-]+?)(?:~([a-z0-9\-]*?))?)\)/gi;
const unescapeCodiconsRegex = /\$\\\((([a-z0-9\-]+?)(?:~([a-z0-9\-]*?))?)\\\)/gi;

export function escapeCodicons(text: string, markdown: boolean = true): string {
	return text.replace(escapeCodiconsRegex, (match, codicon) => {
		return markdown ? `\\\\$\\(${codicon}\\)` : `\\${match}`;
	});
}

export function renderCodicons(text: string): string {
	return text.replace(renderCodiconsRegex, (_, escape, codicon, name, animation) => {
		return escape
			? `$(${codicon})`
			: `<span class="codicon codicon-${name}${animation ? ` codicon-animation-${animation}` : ''}"></span>`;
	});
}

export function unescapeCodicons(text: string): string {
	return text.replace(unescapeCodiconsRegex, (_, codicon) => {
		return `$(${codicon})`;
	});
}
