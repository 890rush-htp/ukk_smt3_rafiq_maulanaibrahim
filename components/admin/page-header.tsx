import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode; // slot untuk tombol aksi
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}