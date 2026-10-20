import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-16 md:py-24">
      <div className="w-full max-w-md px-5 sm:px-2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold tracking-tight">
              {title}
            </CardTitle>
            {description ? (
              <CardDescription className="text-center">{description}</CardDescription>
            ) : null}
          </CardHeader>
          <CardContent>{children}</CardContent>
          {footer ? <CardFooter className="justify-center text-sm">{footer}</CardFooter> : null}
        </Card>
      </div>
    </div>
  );
}
