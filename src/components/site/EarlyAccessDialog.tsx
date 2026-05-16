import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  wearable: z.string().min(1, "Please select your primary wearable"),
});

type FormValues = z.infer<typeof formSchema>;

export function EarlyAccessDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      wearable: "",
    },
  });


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto border-border bg-surface grain p-0 focus:outline-none">
        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <DialogHeader className="mb-8">
                  <div className="mb-4 inline-block h-2 w-2 rounded-full bg-amber shadow-[0_0_12px_var(--amber)]" />
                  <DialogTitle className="font-display text-3xl font-light md:text-4xl">
                    Request <span className="italic text-amber">Access</span>
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                    Join Cohort 01 — Limited beta positions available.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form 
                    action="https://formsubmit.co/hello@activfleet.com" 
                    method="POST" 
                    target="form-target"
                    onSubmit={() => {
                      setSubmitted(true);
                      setTimeout(() => {
                        setOpen(false);
                        setSubmitted(false);
                        form.reset();
                      }, 5000);
                    }}
                    className="space-y-6"
                  >
                    {/* FormSubmit Configuration */}
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_subject" value="PAS AI Early Access Request" />
                    <input type="hidden" name="_template" value="table" />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              name="name"
                              className="h-12 border-border-strong bg-background/50 focus:border-amber focus:ring-0"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              name="email"
                              type="email"
                              className="h-12 border-border-strong bg-background/50 focus:border-amber focus:ring-0"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wearable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Primary Wearable</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            name="wearable"
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-border-strong bg-background/50 focus:border-amber focus:ring-0">
                                <SelectValue placeholder="Select your device" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-border-strong bg-surface">
                              <SelectItem value="apple-watch">Apple Watch</SelectItem>
                              <SelectItem value="fitbit">Fitbit</SelectItem>
                              <SelectItem value="garmin">Garmin</SelectItem>
                              <SelectItem value="oura">Oura</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-full bg-amber py-6 text-[11px] uppercase tracking-[0.3em] font-medium text-amber-foreground hover:bg-amber/90 transition-all"
                    >
                      <span className="flex items-center gap-2">
                        Request Membership
                        <ArrowIcon />
                      </span>
                    </Button>
                  </form>
                </Form>
                <iframe name="form-target" className="hidden" />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-amber/30 bg-amber/10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    className="h-3 w-3 rounded-full bg-amber shadow-[0_0_20px_var(--amber)]"
                  />
                </div>
                <h3 className="font-display text-4xl font-light">Transmission <span className="italic text-amber">Received</span></h3>
                <p className="mt-4 text-pretty font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Your signal has been captured. We will reach out when the next cohort opens.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
