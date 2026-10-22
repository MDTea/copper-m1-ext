"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const TOPICS = ["Pricing", "Product information", "Something else"] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  topic: z.enum(TOPICS),
  message: z.string().trim().min(1, "Please tell us how we can help."),
});

type ContactValues = z.infer<typeof schema>;

export const CONTACT_TOAST =
  "Copper State Labs has received your input and will get in touch soon.";

// A front-end prototype: nothing is sent or saved. A valid submit clears the
// form and shows a toast.
export function ContactForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", topic: "Pricing", message: "" },
  });

  const onSubmit = () => {
    toast.success(CONTACT_TOAST);
    reset();
  };

  return (
    <section id="contact" data-testid="contact" className="border-b">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-5 md:py-24">
        <div className="md:col-span-2">
          <p className="text-muted-foreground font-heading text-sm font-bold tracking-wide uppercase">
            Contact us
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Questions about pricing or products?
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Tell us what you&rsquo;d like to know about Copper Home, Copper
            Notes or Copper Plus.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Contact Copper State Labs"
          className="md:col-span-3"
        >
          <FieldGroup>
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="contact-name">Name</FieldLabel>
              <Input
                id="contact-name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="contact-email">Email</FieldLabel>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-topic">Topic</FieldLabel>
              <Controller
                name="topic"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="contact-topic" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field data-invalid={!!errors.message}>
              <FieldLabel htmlFor="contact-message">Message</FieldLabel>
              <Textarea
                id="contact-message"
                rows={5}
                aria-invalid={!!errors.message}
                {...register("message")}
              />
              <FieldError errors={[errors.message]} />
            </Field>
            <Button type="submit" size="lg" className="self-start">
              Send message
            </Button>
          </FieldGroup>
        </form>
      </div>
    </section>
  );
}
