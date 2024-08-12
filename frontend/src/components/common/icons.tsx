import { Bike, Pizza, Store } from "lucide-react";
import React, {
  ForwardRefExoticComponent,
  PropsWithChildren,
  RefAttributes,
} from "react";

export const PizzaIcon: ForwardRefExoticComponent<
  RefAttributes<SVGSVGElement>
> = React.forwardRef<SVGSVGElement>((props: PropsWithChildren, ref) => (
  <Pizza ref={ref} size={16} {...props} />
));
PizzaIcon.displayName = "PizzaIcon";

export const BikeIcon: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> =
  React.forwardRef<SVGSVGElement>((props: PropsWithChildren, ref) => (
    <Bike ref={ref} size={16} {...props} />
  ));
BikeIcon.displayName = "BikeIcon";

export const StoreIcon: ForwardRefExoticComponent<
  RefAttributes<SVGSVGElement>
> = React.forwardRef<SVGSVGElement>((props: PropsWithChildren, ref) => (
  <Store ref={ref} size={16} {...props} />
));
StoreIcon.displayName = "StoreIcon";
