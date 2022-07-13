import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ToggleDrawerService } from 'src/app/services/toggle-drawer/toggle-drawer.service';
import { PARAMETER_MENU_CONSTANT } from './parameter-menu-constant';
import { ParameterDirective } from './parameter.directive';

@Component({
  selector: 'app-parameter-menu',
  templateUrl: './parameter-menu.component.html',
  styleUrls: ['./parameter-menu.component.scss'],
})
export class ParameterMenuComponent implements OnChanges {
  readonly width = PARAMETER_MENU_CONSTANT;

  @Input()
  selectId: number;

  @ViewChild(MatDrawer, { static: false })
  child: MatDrawer;

  @ViewChild(ParameterDirective, { static: true })
  parameterHost: ParameterDirective;

  constructor(
    private toggleDrawerService: ToggleDrawerService,
  ) {
  }
  /// Fait appel a loadComponent si le id selectionner change
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectId) {
      this.loadComponent();
    }
  }

  /// Charger le component pour l'outil en question
  private loadComponent() {

    const viewContainerRef: ViewContainerRef = this.parameterHost.viewContainerRef;
    viewContainerRef.clear();
  }

  /// Recoit si le service de toggle drawer est ouvert
  get isOpened(): boolean {
    return this.toggleDrawerService.isOpened;
  }
}
