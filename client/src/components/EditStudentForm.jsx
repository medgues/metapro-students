/* eslint-disable react/prop-types */
import { Input } from "../components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar } from "../components/ui/calendar";
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import store from "../store/store";
import { studentsList } from "../store/slices/globaleStateSlice";
import { useState } from "react";

const items = [
  {
    id: "mathematics",
    label: "Mathematics",
  },
  {
    id: "science",
    label: "Science",
  },
  {
    id: "french",
    label: "French",
  },
  {
    id: "physics",
    label: "Physics",
  },
  {
    id: "chemistry",
    label: "Chemistry",
  },
];

const formSchema = z.object({
  fullName: z.string({ required_error: "Full Name is required" }).min({
    message: "Must be 5 or more characters long",
  }),
  dateOfBirth: z.date({ required_error: "Date of Birth is required" }),
  subjects: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  subscriptionStatus: z.string({
    required_error: "Invalid Subscription Status .",
  }),
});

const EditStudentForm = ({ setStudents, setOpen, student, setDialog }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  console.log(student);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: student,
  });

  function onSubmit(values) {
    values.dateOfBirth = format(values.dateOfBirth, "yyyy-MM-dd");
    const id = student.id;

    fetch(`http://localhost:2000/api/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        store.dispatch(studentsList([...data]));
        form.reset({
          fullName: "",
          dateOfBirth: "",
          subjects: [],
          subscriptionStatus: "",
          id: "",
        });
        setOpen(false);
      });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogDescription>
          Enter the student information below.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-4 items-center gap-4 ">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel className="text-right">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder={student.fullName} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover
                      open={isCalendarOpen}
                      onOpenChange={setIsCalendarOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "MM/dd/yyyy")
                            ) : (
                              <span>{student.dateOfBirth}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(e) => {
                            field.onChange(e);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <FormField
                control={form.control}
                name="subjects"
                render={() => (
                  <FormItem className="col-span-4">
                    <FormLabel>Subjects</FormLabel>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="subjects"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <FormField
                control={form.control}
                name="subscriptionStatus"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Subscription Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={student.subscriptionStatus}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Student</Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default EditStudentForm;
