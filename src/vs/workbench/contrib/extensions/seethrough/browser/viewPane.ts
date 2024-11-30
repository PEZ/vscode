/* eslint-disable local/code-import-patterns */
/* eslint-disable header/header */


import { ViewPane, IViewPaneOptions } from 'vs/workbench/browser/parts/views/viewPane';
import { IViewDescriptorService } from 'vs/workbench/common/views';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IEditorGroupsService } from 'vs/workbench/services/editor/common/editorGroupsService';
import { IEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IOpenerService } from 'vs/platform/opener/common/opener';

export let transparentPane: TransparentViewPane;

export class TransparentViewPane extends ViewPane {
    constructor(
        options: IViewPaneOptions,
        @IKeybindingService keybindingService: IKeybindingService,
        @IContextMenuService contextMenuService: IContextMenuService,
        @IConfigurationService configurationService: IConfigurationService,
        @IContextKeyService contextKeyService: IContextKeyService,
				@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
        @IInstantiationService instantiationService: IInstantiationService,
        @IOpenerService openerService: IOpenerService,
        @IThemeService themeService: IThemeService,
        @ITelemetryService telemetryService: ITelemetryService,
        @IEditorGroupsService editorGroupsService: IEditorGroupsService,
        @IEditorService editorService: IEditorService,
    ) {
            super(
                options,
                keybindingService,
                contextMenuService,
                configurationService,
                contextKeyService,
								viewDescriptorService,
                instantiationService,
								openerService,
                themeService,
                telemetryService,
            );
						transparentPane = this;
    }

    override renderBody(container: HTMLElement): void {
      super.renderBody(container);
      container.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
      // Add visual debug border
      container.style.border = '2px solid red';

      this.sendViewDimensions(container);
      window.addEventListener('resize', () => this.sendViewDimensions(container));
  }

    private sendViewDimensions(container: HTMLElement): void {
			const rect = container.getBoundingClientRect();
			const dimensions = {
					x: rect.x,
					y: rect.y,
					width: rect.width,
					height: rect.height
			};
      console.log('Sending view dimensions', JSON.stringify(dimensions));
      console.log('bounding client rect', JSON.stringify(rect));
      (window as any).electronAPI.sendTransparentViewDimensions(dimensions);
		}
}
