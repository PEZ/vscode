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

export class SeethroughViewPane extends ViewPane {
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
    }

    override layout(size: number): void {
      super.layout(size);
      const bodyElement = this.element.querySelector('.seethrough-view-pane');
      console.log('BOOM! layout', size, bodyElement);
      if (size > 22) {
        this.sendViewDimensions(bodyElement as HTMLElement);
      } else {
        this.sendViewDimensions(null);
      }
    }

    protected override layoutBody(height: number, width: number): void {
      super.layoutBody(height, width);
      const bodyElement = this.element.querySelector('.seethrough-view-pane');
      console.log('BOOM! layoutBody', height, width, bodyElement);
      if (height > 22) {
        this.sendViewDimensions(bodyElement as HTMLElement);
      } else {
        this.sendViewDimensions(null);
      }
    }

    override renderBody(container: HTMLElement): void {
      super.renderBody(container);

      container.classList.add('seethrough-view-pane');

      this.sendViewDimensions(container);
      window.addEventListener('resize', () => this.sendViewDimensions(container));
   }

   private sendViewDimensions(container: HTMLElement | null): void {
    const dimensions = (container !== null) ? (() => {
        const rect = container.getBoundingClientRect();
        const scale = window.devicePixelRatio / 2.0;
        return {
            x: rect.x * scale + 2,
            y: rect.y * scale + 2,
            width: rect.width  * scale - 4,
            height: rect.height * scale - 4
        };
    })() : {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    console.log('BOOM! sending dimensions', JSON.stringify(dimensions));
    (window as any).electronAPI.sendSeethroughViewDimensions(dimensions);
  }
}
