import { NoopOdooAdapter } from "@/lib/integrations/odoo/noop-adapter";
import type { OdooAdapter } from "@/lib/integrations/odoo/types";

export function getOdooAdapter(): OdooAdapter {
  return new NoopOdooAdapter();
}
