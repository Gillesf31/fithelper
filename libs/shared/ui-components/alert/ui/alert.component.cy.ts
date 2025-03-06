import { TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';
import { signal } from '@angular/core';

describe(AlertComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AlertComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('Success', () => {
    cy.mount(AlertComponent, {
      componentProperties: {
        description: signal('Success description'),
        alertType: signal('success'),
      },
    });
  });

  it('Info', () => {
    cy.mount(AlertComponent, {
      componentProperties: {
        description: signal('Info description'),
        alertType: signal('info'),
      },
    });
  });
});
