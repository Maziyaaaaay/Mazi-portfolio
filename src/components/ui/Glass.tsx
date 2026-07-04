import type { ElementType, ReactNode } from "react";

const BLUR_CLASS = {
  light: "glass-light",
  medium: "",
  heavy: "glass-heavy",
} as const;

/**
 * The one glass surface: translucent gradient fill, backdrop blur +
 * saturate, gradient hairline border, top specular highlight, and a
 * light-streak sweep on hover (all via the .glass CSS in globals).
 * Consumers set radius/padding; `blur` picks the variant.
 */
export default function Glass({
  as: Tag = "div",
  blur = "medium",
  sheen = true,
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  blur?: keyof typeof BLUR_CLASS;
  sheen?: boolean;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
}) {
  return (
    <Tag className={`glass ${BLUR_CLASS[blur]} ${className}`} {...rest}>
      {children}
      {sheen && <span className="glass-sheen" aria-hidden />}
    </Tag>
  );
}
