/* eslint-disable local/code-import-patterns */
/* eslint-disable header/header */

import { Registry } from 'vs/platform/registry/common/platform';
import { Extensions as ViewContainerExtensions, IViewContainersRegistry, ViewContainerLocation, IViewsRegistry } from 'vs/workbench/common/views';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions, IWorkbenchContribution } from 'vs/workbench/common/contributions';
import { LifecyclePhase } from 'vs/workbench/services/lifecycle/common/lifecycle';
import { TransparentViewPane } from './viewPane';
import { VIEWLET_ID, TRANSPARENT_VIEW_ID } from './constants';

class TransparentViewContribution implements IWorkbenchContribution {
    constructor() {
        console.log('BOOM! Registering Transparent View');
        // Register Transparent View
        const viewContainerRegistry = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry);
        const viewContainer = viewContainerRegistry.registerViewContainer({
            id: VIEWLET_ID,
            title: 'Transparent View',
            ctorDescriptor: { ctor: TransparentViewPane, staticArguments: [], supportsDelayedInstantiation: false },
            icon: { id: 'codicon-eye' },
            order: 4,
            hideIfEmpty: true
        }, ViewContainerLocation.Panel);

        // Register Transparent View Descriptor
        const viewsRegistry = Registry.as<IViewsRegistry>(ViewContainerExtensions.ViewsRegistry);
        viewsRegistry.registerViews([{
            id: TRANSPARENT_VIEW_ID,
            name: 'Transparent View',
            containerIcon: { id: 'codicon-eye' },
            ctorDescriptor: { ctor: TransparentViewPane, staticArguments: [], supportsDelayedInstantiation: false },
            canToggleVisibility: true,
            canMoveView: true,
            order: 4
        }], viewContainer);
    }
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench).registerWorkbenchContribution(TransparentViewContribution, LifecyclePhase.Starting);
