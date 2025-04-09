import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { processQuizSubmission } from "@/lib/medicaid/medicaid-integration";
import { MedicaidResults } from "./MedicaidResults";

// Define result types for better type safety
type EligibilityResult = {
  isEligible: boolean;
  reasons: string[];
};

type ReportResult = {
  summary: string;
};

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  age: z.string().min(1, "Please enter your age"),
  maritalStatus: z.string({
    required_error: "Please select your marital status",
  }),
  state: z.string({
    required_error: "Please select your state",
  }),
  bankAccounts: z.string().optional(),
  investments: z.string().optional(),
  homeValue: z.string().optional(),
  vehicleValue: z.string().optional(),
  lifeInsurance: z.string().optional(),
  retirement: z.string().optional(),
  socialSecurity: z.string().optional(),
  pension: z.string().optional(),
  otherIncome: z.string().optional(),
  otherAssets: z.string().optional(),
  needsCareSoon: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

export default function QuizForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    eligibilityResult: EligibilityResult;
    reportResult: ReportResult;
  } | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      maritalStatus: "",
      state: "",
      bankAccounts: "0",
      investments: "0",
      homeValue: "0",
      vehicleValue: "0",
      lifeInsurance: "0",
      retirement: "0",
      socialSecurity: "0",
      pension: "0",
      otherIncome: "0",
      otherAssets: "0",
      needsCareSoon: false,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    try {
      const results = await processQuizSubmission({
        fullName: values.name,
        ...values,
      });

      setResults(results);

      toast({
        title: "Eligibility assessment complete",
        description: "Your Medicaid eligibility results are ready.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to process your submission. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (results) {
    return <MedicaidResults 
      eligibilityResult={results.eligibilityResult}
      reportResult={results.reportResult}
    />;
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Medicaid Eligibility Quiz
      </h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="age" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl><Input type="number" placeholder="65" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select marital status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="alabama">Alabama</SelectItem>
                        <SelectItem value="florida">Florida</SelectItem>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="newyork">New York</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["bankAccounts", "Bank Accounts ($)"],
                  ["investments", "Investments ($)"],
                  ["homeValue", "Home Value ($)"],
                  ["vehicleValue", "Vehicle Value ($)"],
                  ["lifeInsurance", "Life Insurance ($)"],
                  ["retirement", "Retirement Accounts ($)"],
                  ["otherAssets", "Other Assets ($)"],
                  ["socialSecurity", "Social Security ($)"],
                  ["pension", "Pension ($)"],
                  ["otherIncome", "Other Income ($)"]
                ].map(([name, label]) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof FormData}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Care Situation */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Care Situation</h2>
              <FormField
                control={form.control}
                name="needsCareSoon"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I need care now or in the near future</FormLabel>
                      <FormDescription>
                        Check this if you or your loved one needs care immediately or within the next 6 months.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Check Eligibility"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
