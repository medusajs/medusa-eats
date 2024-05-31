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

export const BikeIcon: ForwardRefExoticComponent<RefAttributes<SVGSVGElement>> =
  React.forwardRef<SVGSVGElement>((props: PropsWithChildren, ref) => (
    <Bike ref={ref} size={16} {...props} />
  ));

export const StoreIcon: ForwardRefExoticComponent<
  RefAttributes<SVGSVGElement>
> = React.forwardRef<SVGSVGElement>((props: PropsWithChildren, ref) => (
  <Store ref={ref} size={16} {...props} />
));
