<<<<<<< HEAD
import * as React from "react";
import { cn } from "@/lib/utils";
=======
import * as React from "react"
import { cn } from "@/lib/utils"
>>>>>>> f38132ecf0585d90f5de3abe3298b3264705f07d

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
<<<<<<< HEAD
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
=======
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
>>>>>>> f38132ecf0585d90f5de3abe3298b3264705f07d
        className
      )}
      ref={ref}
      {...props}
    />
<<<<<<< HEAD
  );
});
Input.displayName = "Input";

export { Input };
=======
  )
})
Input.displayName = "Input"

export { Input }
>>>>>>> f38132ecf0585d90f5de3abe3298b3264705f07d
