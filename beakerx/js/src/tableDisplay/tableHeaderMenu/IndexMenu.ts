/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import $ from 'jquery';
import createIndexMenuItems from './createIndexMenuItems';
import MenuItem from './MenuItemInterface';
import HeaderMenu from './HeaderMenu';

export default class IndexMenu extends HeaderMenu {
  private menuItems: MenuItem[];
  private scopeElement: any;

  constructor(scope: any, $trigger: any) {
    super(scope);

    this.columnIndex = 0;
    this.scopeElement = scope.element;
    this.menuItems = createIndexMenuItems(scope);
    this.buildMenu($trigger);
  }

  protected buildMenu($trigger: any): void {
    this.menu.addClass('bko-header-menu');
    this.menu.addClass('dropdown');

    const self = this;

    $(this.menu.contentNode).addClass('dropdown-menu');
    $(this.scopeElement).on('click.headermenu', `#${$trigger.attr('id')}`, function(event) {
      event.preventDefault();
      event.stopPropagation();

      self.open($trigger.closest('.cell'), $trigger);
    });

    this.createItems(this.menuItems, this.menu);
  }

  protected destroy(): void {
    $(this.scopeElement).off('click.headermenu');
    $(this.menu.node).off('keyup.keyTable, change');
  }
}
