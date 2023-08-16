namespace todolist;
using { managed, cuid, sap.common.CodeList as CodeList } from '@sap/cds/common';

  entity Tasks   : managed, cuid {
    title        : String not null;
    status       : Association to Statuses;
  }

  entity Statuses: CodeList {
    key code     : Integer;
  }
