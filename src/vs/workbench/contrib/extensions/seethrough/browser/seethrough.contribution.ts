/* eslint-disable local/code-import-patterns */
/* eslint-disable header/header */

import { Registry } from 'vs/platform/registry/common/platform';
import { Extensions as ViewContainerExtensions, IViewContainersRegistry, ViewContainerLocation, IViewsRegistry } from 'vs/workbench/common/views';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions, IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { LifecyclePhase } from 'vs/workbench/services/lifecycle/common/lifecycle';
import { SeethroughViewPane } from './seethroughView';
import { Codicon } from 'vs/base/common/codicons';
import { registerIcon } from 'vs/platform/theme/common/iconRegistry';
import * as nls from 'vs/nls';

export const VIEWLET_ID = 'workbench.view.transparent';
export const TRANSPARENT_VIEW_ID = 'workbench.view.seethroughView';
const seethroughViewIcon = registerIcon('seethrough-view-icon', Codicon.eyeWatch, nls.localize('seethroughViewIcon', 'View icon of the seethrough view.'));

class SeethroughViewContribution implements IWorkbenchContribution {
    constructor() {
        console.log('BOOM! Registering Transparent View');
        const viewContainerRegistry = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry);
        const viewContainer = viewContainerRegistry.registerViewContainer({
            id: VIEWLET_ID,
            title: 'Transparent View',
            ctorDescriptor: { ctor: SeethroughViewPane, staticArguments: [], supportsDelayedInstantiation: false },
            icon: seethroughViewIcon,
            order: 4,
            hideIfEmpty: true
        }, ViewContainerLocation.Panel);

        const viewsRegistry = Registry.as<IViewsRegistry>(ViewContainerExtensions.ViewsRegistry);
        viewsRegistry.registerViews([{
            id: TRANSPARENT_VIEW_ID,
            name: 'Transparent View',
            containerIcon: seethroughViewIcon,
            ctorDescriptor: { ctor: SeethroughViewPane, staticArguments: [], supportsDelayedInstantiation: false },
            canToggleVisibility: true,
            canMoveView: true,
            order: 4
        }], viewContainer);
    }
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench).registerWorkbenchContribution(SeethroughViewContribution, LifecyclePhase.Starting);
